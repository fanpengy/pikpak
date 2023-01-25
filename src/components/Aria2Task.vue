<template>
  <div class="container">
    <div class="content " :class="{hide: hide}">
      <div class="status-bar" @click="hide = !hide">
        <div class="status-bar-wrapper">
          {{tasksInfo?.actives || 0}}项下载中 &nbsp;{{tasksInfo?.waitings || 0}}项暂停中 &nbsp; <n-spin size="small" v-if="loading"/>
        </div>
      </div>
      <div class="task-list">
        <n-scrollbar style="max-height: 400px;"  @scroll="scrollHandle">
          <template v-for="(item, key) in tasksInfo.tasks" :key="item.gid">
            <div class="task">
              <div class="task-info">
                <div class="task-info-wrapper">
                  <div class="task-file-name">
                    <n-ellipsis :tooltip="{width: 'trigger'}">
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
                  <n-progress type="line" :percentage="Number((item.completedLength / item.totalLength * 100).toFixed(2))" processing indicator-placement="inside"></n-progress>
                </div>
                <n-space>
                  <n-icon color="#306eff" @click="changeStatus(item)" v-if="item.status === 'active'">
                    <player-pause/>
                  </n-icon>
                  <n-icon color="#306eff" @click="changeStatus(item)" v-else>
                    <player-play/>
                  </n-icon>
                </n-space>
              </div>
            </div>
          </template>
        </n-scrollbar>
      </div>
      <n-space>
        <p class="bottom2" v-if="!hide" @click="hide = true">收起</p>
        <p class="bottom3" v-if="!hide" @click="getTasks">刷新</p>
      </n-space>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted, onUnmounted, watch } from '@vue/runtime-core'
import http from '../utils/axios'
import { NEllipsis, NScrollbar, NProgress, NIcon, NSpin, NSpace } from 'naive-ui'
import { byteConvert } from '../utils'
import { PlayerPlay, PlayerPause } from '@vicons/tabler'
import aria2Api from '../api/aria2Api';
  const aria2Data = ref()
  const tasksList = ref()
  const tasksInfo = ref({
    actives: 0,
    waitings: 0,
    tasks:<any>[]
  })
  const isSafari = ref(false)
  const loading = ref(false)
  const hasTask = ref(0)
  const timeOut = ref()
  const hide = ref(true)
  const pageToken = ref()
  
  const changeStatus = (task:any) => {
    console.debug('changeStatus')
    if(task.status === 'active') {
      if(isSafari.value) {
        aria2Api.pauseIndirect(aria2Data.value.host, task.gid)
          .then(res => {
            if(res === task.gid) {
              task.status = 'paused'
            }
          })
          .catch(err => {
            window.$message.error('控制失败')
          })
      } else {
        aria2Api.pause(aria2Data.value.host, task.gid)
          .then(res => {
            if(res === task.gid) {
              task.status = 'paused'
            }
          })
          .catch(err => {
            console.error('yuhuhu')
            window.$message.error('控制失败')
          })
      }
    } else if(task.status === 'paused') {
      if(isSafari.value) {
        aria2Api.unpauseIndirect(aria2Data.value.host, task.gid)
          .then(res => {
            if(res === task.gid) {
              task.status = 'active'
            }
          })
          .catch(err => {
            window.$message.error('控制失败')
          })
      } else {
        aria2Api.unpause(aria2Data.value.host, task.gid)
          .then(res => {
            if(res === task.gid) {
              task.status = 'active'
            }
          })
          .catch(err => {
            window.$message.error('控制失败')
          })
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
  const getTasks = async () => {
    loading.value = true
    let tasks: any[] = []
    console.log(isSafari.value)
    if(isSafari.value) {
      let activeTasks = await aria2Api.tellActiveIndirect(aria2Data.value.host)
      console.log(activeTasks)
      let waitingTasks = await aria2Api.tellWaitingIndirect(aria2Data.value.host)
      if(activeTasks instanceof Array) {
        tasks = tasks.concat(activeTasks.map(task => {
          let path:string = task.files[0].path
          let index = path.lastIndexOf('/')
          task.files[0].path = path.substring(index + 1)
          return task
        }))
        tasksInfo.value.actives = activeTasks.length
      }
      if(waitingTasks instanceof Array) {
        tasks = tasks.concat(waitingTasks.map(task => {
          let path:string = task.files[0].path
          let index = path.lastIndexOf('/')
          task.files[0].path = path.substring(index + 1)
          return task
        }))
        tasksInfo.value.waitings = waitingTasks.length
      }
      tasksInfo.value.tasks = tasks
    } else {
      let activeTasks = await aria2Api.tellActive(aria2Data.value.host)
      let waitingTasks = await aria2Api.tellWaiting(aria2Data.value.host)
      if(activeTasks && waitingTasks) {
        tasks = tasks.concat(activeTasks.map((task:any) => {
            let path:string = task.files[0].path
            let index = path.lastIndexOf('/')
            task.files[0].path = path.substring(index + 1)
            return task
          }), 
          waitingTasks.map((task:any) => {
            let path:string = task.files[0].path
            let index = path.lastIndexOf('/')
            task.files[0].path = path.substring(index + 1)
            return task
          }))
        tasksInfo.value.tasks = tasks
        tasksInfo.value.actives = activeTasks.length
        tasksInfo.value.waitings = waitingTasks.length
      }
    }
    loading.value = false
  }
  watch(hide, () => {
    if(hide.value && timeOut.value) {
      clearTimeout(timeOut.value)
    } else {
      getTasks()
    }
  })
  onMounted(() => {
    // var userAgent = navigator.userAgent
    // if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Macintosh") > -1 && userAgent.indexOf("Edg") === -1 && userAgent.indexOf("Chromme") === -1) {
    //   isSafari.value = true
    // }
    isSafari.value = false
    let aria2 = JSON.parse(window.localStorage.getItem('pikpakAria2') || '{}')
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
  width: 375px;
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
  width: 100%;
  height: 30px;
  left: 0;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  bottom: 0;
  border-radius: 0 0 5px 5px;
  background: #fff;
  box-shadow: 0 -8px 8px #fff;
  transition: color 0.3s ease;
}

.bottom2 {
  cursor: pointer;
  position: absolute;
  width: 50%;
  height: 30px;
  left: 0;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  bottom: 0;
  border-radius: 0 0 5px 5px;
  background: #fff;
  box-shadow: 0 -8px 8px #fff;
  transition: color 0.3s ease;
}

.bottom3 {
  cursor: pointer;
  position: absolute;
  width: 50%;
  height: 30px;
  right: 0;
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