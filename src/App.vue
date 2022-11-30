<script setup lang="ts">
  import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
  import { GlobalThemeOverrides, NConfigProvider, NMessageProvider, zhCN, dateZhCN, NDialogProvider, NNotificationProvider } from 'naive-ui'
  import MessageContent from './components/MessageContent.vue';
  import { version, proxy, accounts } from './config'
  import aes from './utils/aes'
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
