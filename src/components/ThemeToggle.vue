<template>
  <button 
    @click="toggleDarkMode" 
    class="theme-toggle"
    aria-label="切换深色模式"
    :aria-pressed="isDarkMode"
  >
    <span class="sr-only">{{ isDarkMode ? '切换到浅色模式' : '切换到深色模式' }}</span>
    <!-- 月亮图标 (深色模式) -->
    <svg 
      v-if="!isDarkMode" 
      class="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
      />
    </svg>
    <!-- 太阳图标 (浅色模式) -->
    <svg 
      v-else 
      class="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';

const isDarkMode = ref(false);

// 初始化主题
onMounted(() => {
  // 检查本地存储中的主题设置
  const savedTheme = localStorage.getItem('theme');
  
  // 检查系统偏好
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // 设置初始主题
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});

// 切换深色模式
const toggleDarkMode = () => {
  // 添加过渡类
  document.documentElement.classList.add('mode-transition');
  
  // 切换主题
  isDarkMode.value = !isDarkMode.value;
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('animate-theme-transition');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.add('animate-theme-transition');
  }
  
  // 动画完成后移除过渡类
  setTimeout(() => {
    document.documentElement.classList.remove('mode-transition');
    document.documentElement.classList.remove('animate-theme-transition');
  }, 300);
};

// 监听系统主题变化
onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    // 仅当用户未明确设置主题时，跟随系统设置
    if (!localStorage.getItem('theme')) {
      isDarkMode.value = e.matches;
      
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
});
</script>

<style scoped>
.theme-toggle {
  @apply p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300;
  color: var(--color-text);
  background-color: var(--color-background-alt);
}

.theme-toggle:hover {
  @apply bg-gray-200 dark:bg-gray-700;
}

.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style> 