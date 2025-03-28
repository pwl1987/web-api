<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo区域 -->
        <div class="flex items-center">
          <img class="h-8" src="@renderer/assets/images/icons/logo.png" alt="HeyGem.ai" />
        </div>
        
        <!-- 导航区域 - 移动端隐藏 -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link 
            v-for="(item, index) in navItems" 
            :key="index"
            :to="item.path"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
            :class="{ 'text-primary-600 dark:text-primary-400': isActive(item.path) }"
          >
            {{ item.label }}
          </router-link>
        </nav>
        
        <!-- 右侧工具栏 -->
        <div class="flex items-center space-x-4">
          <!-- 主题切换按钮 -->
          <ThemeToggle />
          
          <!-- 设置下拉菜单 -->
          <t-dropdown
            :maxColumnWidth="'auto'"
            :min-column-width="88"
            panel-top-content=""
            placement="bottom-right"
            @click="action.clickHandler"
          >
            <button 
              class="flex items-center p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="设置菜单"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <t-dropdown-menu>
              <t-dropdown-item
                :value="item.value"
                v-for="(item, index) in state.menuList"
                :key="index + 'menuList'"
                class="dropdown-box"
              >
                <div class="language-switch-box">
                  <span>{{ item.content }}</span>
                  <img
                    v-if="item.value === 'languageSwitch'"
                    src="@renderer/assets/images/icons/switch.svg"
                    alt="switch"
                    class="language-switch"
                  />
                </div>

                <t-dropdown-menu v-if="item.children">
                  <t-dropdown-item
                    v-for="(itemChildren, indexChildren) in item.children"
                    :key="indexChildren + 'itemChildren'"
                    :value="itemChildren.value"
                    :class="itemChildren.value === home.homeState.language ? 'language-active' : ''"
                    >{{ itemChildren.content }}</t-dropdown-item
                  >
                </t-dropdown-menu>
              </t-dropdown-item>
            </t-dropdown-menu>
          </t-dropdown>
          
          <!-- 移动端菜单按钮 -->
          <button 
            class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="toggleMobileMenu"
            aria-label="打开导航菜单"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 移动端导航菜单 -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
      >
        <router-link 
          v-for="(item, index) in navItems" 
          :key="index"
          :to="item.path"
          class="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          :class="{ 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': isActive(item.path) }"
          @click="mobileMenuOpen = false"
        >
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import { useHomeStore } from '@renderer/stores/home';
import { useI18n } from 'vue-i18n';
import { agreementKey, lang_ } from '@renderer/utils/const';
import { useRouter, useRoute } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

// 定义菜单项接口
interface MenuItem {
  content: string;
  key: string;
  value: string;
  children?: MenuItem[];
}

// 定义组件状态接口
interface HeaderState {
  menuList: MenuItem[];
}

const { locale, t } = useI18n();
const home = useHomeStore();
const router = useRouter();
const route = useRoute();

// 移动端菜单状态
const mobileMenuOpen = ref(false);

// 导航项
const navItems = computed(() => [
  { 
    path: '/home', 
    label: t('common.menu.text') 
  },
  { 
    path: '/voice-management', 
    label: t('common.menu.voice') 
  }
]);

// 检查路由是否激活
const isActive = (path: string) => {
  return route.path.includes(path);
};

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const state = reactive<HeaderState>({
  menuList: [
    {
      content: '用户协议',
      key: 'common.setting.tab.userAgreementText',
      value: 'agreement'
    },
    {
      content: '语言切换',
      value: 'languageSwitch',
      key: 'common.setting.tab.languageSwitchText',
      children: [
        {
          content: '中文',
          key: 'common.setting.languageSwitch.languageZhText',
          value: 'zh'
        },
        {
          content: '英文',
          key: 'common.setting.languageSwitch.languageEnText',
          value: 'en'
        }
      ]
    }
  ]
});

watch(locale, () => {
  state.menuList.forEach((el) => {
    el.content = t(el.key);
    if (el.children) el.children.forEach((item) => (item.content = t(item.key)));
  });
});

const action = {
  clickHandler({ value }: { value: string }): void {
    if (value === 'agreement') {
      home.setAgreementVisible(true);
    } else {
      if (value === 'languageSwitch') return;
      window.localStorage.setItem('language', value);
      locale.value = value;
      saveContextAjax(value);
      home.setLanguage(value);
    }
  }
};

const saveContextAjax = async (lang: string): Promise<void> => {
  localStorage.setItem(lang_, lang);
};
</script>

<style>
.dropdown-box .t-icon-chevron-right {
  display: none !important;
}

.language-active {
  color: var(--color-primary) !important;
}

.t-dropdown__item-text .language-switch {
  width: 16px;
  display: block;
  margin-left: 14px;
}
</style>
