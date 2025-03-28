<script setup lang="ts">
import MenuLIst from '@renderer/components/menuLIst.vue'
import { handleShowMenu } from '@renderer/utils/index.js'
import AppHeader from '@renderer/components/AppHeader.vue'
import Agreement from '@renderer/components/agreement.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHomeStore } from '@renderer/stores/home'
import { useI18n } from 'vue-i18n'
import { agreementKey, lang_ } from '@/utils/const'

const { locale } = useI18n()
const unRoute = useRoute()
const home = useHomeStore()
const isShowMenu = ref(false)
const isLoading = ref(true)

watch(
  () => unRoute.path,
  (newPath) => {
    isShowMenu.value = handleShowMenu(newPath)
  }
)

onMounted(() => {
  // 初始化语言设置
  const language = localStorage.getItem('language')
  if (language && language !== 'null') {
    locale.value = language
    home.setLanguage(language)
  } else {
    locale.value = 'zh'
    home.setLanguage('zh')
  }
  saveContextAjax(home.homeState.language)
  getContextAjax()
  
  // 添加加载延迟以避免页面闪烁
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

const saveContextAjax = async (lang) => {
  localStorage.setItem(lang_, lang)
}

const getContextAjax = async () => {
  try {
    const res = localStorage.getItem(agreementKey)
    if (res && res === 'true') {
      home.setIsAgree(true)
      home.setAgreementVisible(false)
    } else {
      home.setIsAgree(false)
      home.setAgreementVisible(true)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <!-- 加载画面 -->
  <div v-if="isLoading" class="loading-screen">
    <div class="loader"></div>
  </div>
  
  <!-- 主应用容器 -->
  <div class="app-container bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <AppHeader v-if="!isShowMenu" />
    <MenuLIst v-if="!isShowMenu" />
    
    <main 
      class="pt-16 transition-all duration-300"
      :class="!isShowMenu ? 'pl-20 md:pl-20' : ''"
    >
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    
    <Agreement v-model="home.homeState.agreementVisible" />
  </div>
</template>

<style>
/* 全局样式优化 */
html {
  @apply antialiased;
}

body {
  @apply text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* 页面过渡效果 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: .5;
  transform: translateY(-10px);
}

/* 加载动画 */
.loading-screen {
  @apply fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50;
}

.loader {
  @apply w-10 h-10 border-4 border-primary-200 dark:border-primary-800 rounded-full border-t-primary-600 dark:border-t-primary-400;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded-full;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500;
}
</style>
