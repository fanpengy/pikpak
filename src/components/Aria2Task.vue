<template>
  <div class="container">
    <div class="content " :class="{hide: hide}">
      <div class="status-bar" @click="hide = !hide">
        <div class="status-bar-wrapper" v-if="hide">
          {{tasksInfo?.actives||0}}项下载&nbsp;&nbsp;
          {{tasksInfo?.waitings||0}}项等待&nbsp;&nbsp;
          {{tasksInfo?.stoppeds||0}}项停止/完成&nbsp;&nbsp;
          <!-- 速度:{{byteConvert(tasksInfo?.downloadSpeed||0)}} -->
          <!-- <n-spin size="small" v-if="loading"/> -->
        </div>
        <div class="status-bar-wrapper" v-else>
          速度:{{byteConvert(tasksInfo?.downloadSpeed||0)}}
        </div>
      </div>
      <n-card class="task-list" :title="labelMap.get(taskSelect)">
        <template #header-extra>
          <n-space>
            <n-popconfirm
              @positive-click="clearStoppedTasks"
              v-if="taskSelect === 'stopped'"
            >
              <template #trigger>
                <n-button size="small" :text="true" :focusable="false">清空</n-button>
              </template>
              确定清空
            </n-popconfirm>
            <!-- <n-button size="small" :text="true" :focusable="false" @click="clearStoppedTasks" v-if="taskSelect === 'stopped'">清空</n-button> -->
            <n-button size="small" :text="true" :focusable="false" @click="getTasks">刷新</n-button>
          </n-space>
        </template>
        <n-empty description="没有任务" style="margin-top: 20px;margin-bottom: 30px;" v-if="tasksInfo.tasks.length === 0 && !loading"/>
        <n-scrollbar style="max-height: 400px;"  @scroll="scrollHandle">
          <template v-for="(item, key) in tasksInfo.tasks" :key="item.gid" v-if="!loading">
            <div class="task">
              <div class="task-info">
                <div class="task-info-wrapper">
                  <div class="task-file-name">
                    <n-ellipsis>
                      {{item.files[0].path}}
                    </n-ellipsis>
                  </div>
                  <div class="task-desc-wrapper">
                    <div class="task-desc">
                      {{ byteConvert(item.totalLength) }}
                    </div>
                    <div class="task-dot"></div>
                    <div class="task-desc">
                      {{ byteConvert(item.downloadSpeed) }}
                    </div>
                  </div>
                </div>
                <div class="task-progress" style="width: 60px; margin-right: 15px;">
                  <n-progress type="line" 
                    :percentage="Number((item.completedLength / item.totalLength * 100).toFixed(2))" 
                    :processing="item.completedLength < item.totalLength"
                    :status="item.completedLength < item.totalLength ? 'default' : 'success'"
                    indicator-placement="inside">
                  </n-progress>
                </div>
                <n-space>
                  <n-icon color="#306eff" size="20" @click="changeStatus(item, 'pause')" v-if="item.status === 'active'">
                    <player-pause/>
                  </n-icon>
                  <n-icon color="#306eff" size="20" @click="changeStatus(item, 'active')" v-else-if="item.status === 'paused'">
                    <player-play/>
                  </n-icon>
                  <n-icon color="#306eff" size="20" v-else-if="item.status === 'waiting'">
                    <clock/>
                  </n-icon>
                  <n-icon color="#306eff" size="20" @click="changeStatus(item, 'retry')" v-else-if="item.status === 'error' || item.status === 'removed'">
                    <refresh/>
                  </n-icon>
                  <n-icon color="#008000" size="20" v-else>
                    <circle-check/>
                  </n-icon>
                  <n-popconfirm @positive-click="changeStatus(item, 'remove')" placement="right">
                    <template #trigger>
                      <n-icon color="#ff0000" size="20">
                        <circle-x/>
                      </n-icon>
                    </template>
                    确定删除？
                  </n-popconfirm>
                </n-space>
              </div>
            </div>
          </template>
          <div style="text-align: center;margin-top: 34px;margin-bottom: 50px;" v-else>
            <n-spin size="small" style="vertical-align: middle;"/>加载中
          </div>
        </n-scrollbar>
      </n-card>
      <n-space>
        <p class="bottom" v-if="!hide" @click="taskSelect = 'active'" :style="taskSelect === 'active' ? 'color:orange' : 'color:black'" style="left: 0;">
        {{labelMap.get('active')}}({{tasksInfo?.actives||0}})</p>
        <p class="bottom" v-if="!hide" @click="taskSelect = 'waiting'" :style="taskSelect === 'waiting' ? 'color:orange' : 'color:black'" style="left: 25%;">
        {{labelMap.get('waiting')}}({{tasksInfo?.waitings||0}})</p>
        <p class="bottom" v-if="!hide" @click="taskSelect = 'stopped'" :style="taskSelect === 'stopped' ? 'color:orange' : 'color:black'" style="left: 50%;">
        {{labelMap.get('stopped')}}({{tasksInfo?.stoppeds||0}})</p>
        <p class="bottom" style="left: 75%;" v-if="!hide" @click="hide = !hide">收起</p>
      </n-space>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted, onUnmounted, watch } from '@vue/runtime-core'
import http from '../utils/axios'
import { NEllipsis, NScrollbar, NProgress, NIcon, NSpin, NSpace, NEmpty, NCard, NButton, NPopconfirm } from 'naive-ui'
import { byteConvert } from '../utils'
import { PlayerPlay, PlayerPause, CircleX, Refresh, Clock, CircleCheck } from '@vicons/tabler'
import aria2Api from '../api/aria2Api';
import { aria2Store } from '../utils/localstore'
  const aria2Data = ref()
  const tasksInfo = ref({
    actives: 0,
    waitings: 0,
    stoppeds: 0,
    downloadSpeed: 0,
    tasks:<any>[]
  })
  const isSafari = ref(false)
  const loading = ref(false)
  const hasTask = ref(0)
  const timeOut = ref()
  const hide = ref(true)
  const taskSelect = ref('active')
  const pageToken = ref()
  const labelMap = new Map([
    ['active', '下载'],
    ['waiting', '暂停'],
    ['stopped', '停止']
  ])
  
  const changeStatus = (task:any, action:string) => {
    if(action === 'pause') {
      if(task.status === 'active') {
        aria2Api.pause(aria2Data.value, task.gid)
        .then(res => {
          if(res === task.gid) {
            task.status = 'paused'
          }
        })
        .catch(err => {
          window.$message.error('控制失败')
        })
      }
    } else if(action === 'active') {
      if(task.status === 'paused') {
        aria2Api.unpause(aria2Data.value, task.gid)
        .then(res => {
          if(res === task.gid) {
            task.status = 'active'
          }
        })
        .catch(err => {
          window.$message.error('控制失败')
        })
      }
    } else if(action === 'remove') {
      if(task.status === 'active' || task.status === 'paused' || task.status === 'waiting') {
        aria2Api.remove(aria2Data.value, task.gid)
          .then(res => {
            if(res === task.gid) {
              getTasks()
            }
          })
          .catch(err => {
            window.$message.error('控制失败')
          })
      } else if(task.status === 'error' || task.status === 'removed' || task.status === 'complete') {
        aria2Api.removeDownloadResult(aria2Data.value, task.gid)
          .then(res => {
            if(res === 'OK') {
              getTasks()
            }
          })
          .catch(err => {
            window.$message.error('控制失败')
          })
      }
    } else if(action === 'retry') {
      //重试
      if(task.status === 'error' || task.status === 'removed') {
        retryTask(task)
      }
    }
  }
  const scrollHandle = (e:any) =>  {
    if(e.target.offsetHeight - e.target.scrollTop < 30) {
      if(pageToken.value && !loading.value) {
        getTasks()
      }
    }
  }
  const getActiveTasks = () => {
    return aria2Api.tellActive(aria2Data.value)
      .then(res => {
        return res.map((task:any) => {
          let path:string = task.files[0].path
          let index = path.lastIndexOf('/')
          task.files[0].path = path.substring(index + 1)
          return task
        })
      })
      .catch(error => {
        console.error(error)
        return []
      })
  }

  const getWaitingTasks = () => {
    return aria2Api.tellWaiting(aria2Data.value)
      .then(res => {
        return res.map((task:any) => {
          let path:string = task.files[0].path
          let index = path.lastIndexOf('/')
          task.files[0].path = path.substring(index + 1)
          return task
        })
      })
      .catch(error => {
        console.error(error)
        return []
      })
  }
  const getStoppedTasks = () => {
    [].concat
    return aria2Api.tellStopped(aria2Data.value)
      .then(res => {
        let errors = res.filter((task:any) => task.status === 'error')
        let others = res.filter((task:any) => task.status != 'error')
        return errors.concat(others)
          .map((task:any) => {
            let path:string = task.files[0].path
            let index = path.lastIndexOf('/')
            task.files[0].path = path.substring(index + 1)
            return task
          }).reverse()
        // return res
        //   .sort((ta:any,tb:any) => {
        //     if(ta.status === tb.status) {
        //       return 0
        //     } else if(ta.status == 'complete') {
        //       return 1
        //     } else if(tb.status == 'complete') {
        //       return -1
        //     } else {
        //       return ta.status > tb.status ? 1 : -1
        //     }
        //   })
        //   .map((task:any) => {
        //     let path:string = task.files[0].path
        //     let index = path.lastIndexOf('/')
        //     task.files[0].path = path.substring(index + 1)
        //     return task
        //   })
      })
      .catch(error => {
        console.error(error)
        return []
      })
  }
  const getGlobalStat = () => {
    return aria2Api.getGlobalStat(aria2Data.value)
  }
  const getTasks = async () => {
    loading.value = true

    //get status
    const statPromise = getGlobalStat()

    let taskPromise = Promise.resolve([])

    //getTask default actie
    if(taskSelect.value === 'active') {
      taskPromise = getActiveTasks()
    } else if(taskSelect.value === 'waiting') {
      taskPromise = getWaitingTasks()
    } else {
      taskPromise = getStoppedTasks()
    }

    const results = await Promise.all([statPromise, taskPromise])
      .then(res => res)
      .catch(err => [{ downloadSpeed: 0, numActive: 0, numWaiting: 0, numStopped: 0, numStoppedTotal: 0 }, []])
    tasksInfo.value.actives = results[0].numActive
    tasksInfo.value.waitings = results[0].numWaiting
    tasksInfo.value.stoppeds = results[0].numStopped
    tasksInfo.value.downloadSpeed = results[0].downloadSpeed

    tasksInfo.value.tasks = results[1]
    // setTimeout(() => {
    //   loading.value = false
    // }, 1000);
    loading.value = false
  }

  const clearStoppedTasks = () => {
    if(taskSelect.value === 'stopped') {
      aria2Api.purgeDownloadResult(aria2Data.value)
          .then(res => {
            if(res === 'OK') {
              getTasks()
            }
          })
          .catch(err => {
            window.$message.error('清空失败')
          })
    }
  }
  const retryTask = (task:any) => {
    const statusParam = {
      methodName: 'aria2.tellStatus',
      params: [task.gid]
    }
    const optionParam = {
      methodName: 'aria2.getOption',
      params: [task.gid]
    }
    aria2Api.multicall(aria2Data.value, [statusParam, optionParam])
      .then(res => {
        let status = res[0][0]
        let option = res[1][0]
        aria2Api.addUri(aria2Data.value, option.out,status.files[0].uris.map((uri:any) => uri.uri))
          .then(res => {
            if(res) {
              aria2Api.removeDownloadResult(aria2Data.value, task.gid)
                .then(res => {
                  if(res) {
                    getTasks()
                  }
                })
            }
          })
          .catch(err => {
            window.$message.error('重试失败')
          })
          .finally(() => {
            getTasks()
          })
      })
  }
  watch(hide, () => {
    if(hide.value && timeOut.value) {
      clearTimeout(timeOut.value)
    } else {
      getTasks()
    }
  })
  watch(taskSelect, () => {
    getTasks()
  })
  onMounted(() => {
    let aria2 = aria2Store.getAria2Data()
    if(aria2.dir === undefined) {
      aria2.dir = true
    }
    if(aria2.host) {
      aria2Data.value = aria2
    }
    getTasks()
  })
  onUnmounted(() => {
    timeOut.value && clearTimeout(timeOut.value)
  })
  defineExpose({
    getTasks
  })
  
</script>

<style scoped>
.container {
  position: fixed;
  width: 529px;
  right: 439px;
  bottom: 28px;
}
@media(max-width: 968px) {
  .container {
    width: 49%;
    right: 0;
    bottom: 0px;
  }
}
.container *,
.container *::before,
.container *::after {
  box-sizing: border-box;
}
.container p {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border: 0;
  font-size: 100%;
  font-family: inherit;
  vertical-align: baseline;
}
.content {
  width: 100%;
  max-height: 530px;
  min-height: 54px;
  background: #fff;
  box-shadow: 0 0 1px 1px rgba(28, 28, 32, 0.05),
    0 8px 24px rgba(28, 28, 32, 0.12);
  border-radius: 5px;
  transition: max-height 0.66s cubic-bezier(0.66, 0, 0.01, 1);
  overflow: hidden;
}
.content.hide {
  max-height: 54px;
}
.bottom {
  cursor: pointer;
  position: absolute;
  width: 25%;
  height: 30px;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  bottom: 0;
  border-radius: 0 0 5px 5px;
  background: #fff;
  box-shadow: 0 -8px 8px #fff;
  transition: color 0.3s ease;
}
.bottom:hover {
  color: #306eff;
}
.status-bar {
  height: 54px;
  position: relative;
  z-index: 1;
  background: #fff;
}
.status-bar .status-bar-wrapper:last-child {
  display: flex;
}
.status-bar .status-bar-wrapper {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  padding-left: 22px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #fff;
  font-size: 14px;
}
.status-bar .status-bar-wrapper:hover {
  background-color: #84858d14;
}
.task-list {
  overflow: auto;
  max-height: 464px;
  padding-bottom: 30px;
  font-size: 14px;
  line-height: 1;
  border-radius: 0 0 5px 5px;
  margin: 0;
  background: #fff;
  box-sizing: border-box;
}
.task-list::before {
  display: block;
  position: sticky;
  content: "";
  height: 1px;
  top: 0;
  background: rgba(132, 133, 141, 0.08);
}
.task-list::after {
  display: block;
  position: absolute;
  content: "";
  height: 1px;
  top: 0;
  width: 100%;
  z-index: 2;
  background: #fff;
}
.task {
  width: 100%;
  height: 64px;
  padding: 14px 18px 14px 16px;
  position: relative;
  box-sizing: border-box;
}
.task .task-desc-wrapper {
  display: flex;
  align-items: center;
}
.task .task-file-icon {
  margin-right: 16px;
}
.task .task-file-icon img {
  width: 36px;
  height: 36px;
}
.task .task-info {
  position: relative;
  display: flex;
  align-items: center;
}
.task .task-info-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 0;
  margin-right: 20px;
}
.task .task-file-name {
  font-size: 14px;
  line-height: 1.5;
  display: inline-block;
  color: rgb(37, 38, 43);
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.task .task-desc {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(37, 38, 43, 0.36);
  display: flex;
  align-items: center;
}
.task .task-dot {
  display: inline-block;
  padding: 0 7px;
  align-items: center;
}
.task .task-dot::before {
  content: "";
  display: block;
  width: 2px;
  height: 2px;
  background: rgba(37, 38, 43, 0.36);
}
.task .action-icon {
  visibility: hidden;
}
.task :hover .action-icon {
  visibility: visible;
}
.task-list-end {
  display: flex;
  font-size: 12px;
  line-height: 1.6;
  color: rgba(37, 38, 43, 0.36);
  justify-content: center;
  padding-top: 8px;
}
.n-popover {
  word-break: break-all;
}
</style>