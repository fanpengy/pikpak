<script setup lang="ts">
  import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
  import { GlobalThemeOverrides, NConfigProvider, NMessageProvider, zhCN, dateZhCN, NDialogProvider, NNotificationProvider } from 'naive-ui'
  import MessageContent from './components/MessageContent.vue';
  import { version, proxy } from './config'
  import aes from './utils/aes'
  const accounts = [
  {
    id: 1,
    email: 'BwMWmaxhbYFsYZTkZ+QabWmXZa2GGlN7/OhvSt7cAjU=',
    password: 'BwJ7mf9sAINmMqjqacVBPhDrEMvzZG0Ig5V5XMjKFCM=',
    used: false
  },
  {
    id: 2,
    email: 'BwMWmqlibYdrC/zvHsYSf3SPZbaTGRxx/6sKI7XZBzA=',
    password: 'VFovy6lhU9NmYa+/aJUWOBDrEMvzZG0Ig5V5XMjKFCM=',
    used: false
  },
  {
    id: 3,
    email: 'BwIWnakLAIRmC/rlauQUZGGLZb+KFVN34eJvSt7cAjU=',
    password: 'AF5/y6hiVoJnbKrpbpQWPBDrEMvzZG0Ig5V5XMjKFCM=',
    used: false
  },
  {
    id: 4,
    email: 'BAoWmaxtbYJqYZTsbpc3YGmVc7OKDRJt6+wIIr/0alajAsJq+n83UXIYp9xVdHq1',
    password: 'BgN+zv01VNZoYa/lZ5xOOhDrEMvzZG0Ig5V5XMjKFCM=',
    used: false
  }
]
  const themeOverrides = ref<GlobalThemeOverrides>({
    common: {
      primaryColor: '#306eff',
      hoverColor: '#306eff',
      primaryColorHover: '#306eff',
      heightMedium: '42px',
    },
    Layout: {
      siderColor: '#f5f5f6'
    },
    Breadcrumb: {
      fontSize: '16px'
    },
    Dropdown: {
      optionTextColorHover: '#fff',
    },
    InternalSelectMenu: {
      optionTextColorActive: '#fff',
    },
    Upload: {
      itemColorHover: '#F3F3F5FF',
      itemTextColorSuccess: '#18A058FF',
    }
  })
  onMounted(() => {
    const isSettingProxy = localStorage.getItem('isSettingProxy')
    if(!isSettingProxy) {
      localStorage.setItem('proxy', JSON.stringify(proxy))
    }

    const optimise = JSON.parse(localStorage.getItem('pikpakOptimize') || '{}')
    if(optimise.autoChangeAccount && accounts.length > 0 && !localStorage.getItem('accounts')) {
      for (let index = 0; index < accounts.length; index++) {
        const account = accounts[index]
        account.email = aes.decrypt(account.email, optimise.key)
        account.password = aes.decrypt(account.password, optimise.key)
      }
      localStorage.setItem('accounts', JSON.stringify(accounts))
    }
  })
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <MessageContent></MessageContent>
          <router-view></router-view>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
</style>
