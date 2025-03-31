<template>
  <header :class="[styles.header, isDarkMode ? styles.darkMode : '']">
    <div :class="styles.container">
      <div :class="styles.headerInner">
        <!-- Logo区域 -->
        <div :class="styles.logoArea">
          <img :class="styles.logo" src="@renderer/assets/images/icons/logo.png" alt="HeyGem.ai" />
        </div>
        
        <!-- 导航区域 - 移动端隐藏 -->
        <nav :class="styles.navigation">
          <router-link 
            v-for="(item, index) in navItems" 
            :key="index"
            :to="item.path"
            :class="[styles.navLink, isActive(item.path) ? styles.active : '', isDarkMode ? styles.darkMode : '']"
          >
            {{ item.label }}
          </router-link>
        </nav>
        
        <!-- 右侧工具栏 -->
        <div :class="styles.toolbar">
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
              :class="[styles.settingsButton, isDarkMode ? styles.darkMode : '']"
              aria-label="设置菜单"
            >
              <svg :class="styles.settingsIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <t-dropdown-menu>
              <t-dropdown-item
                :value="item.value"
                v-for="(item, index) in state.menuList"
                :key="index + 'menuList'"
                :class="styles.dropdownBox"
              >
                <div :class="styles.languageSwitchBox">
                  <span>{{ item.content }}</span>
                  <img
                    v-if="item.value === 'languageSwitch'"
                    src="@renderer/assets/images/icons/switch.svg"
                    alt="switch"
                    :class="styles.languageSwitch"
                  />
                </div>

                <t-dropdown-menu v-if="item.children">
                  <t-dropdown-item
                    v-for="(itemChildren, indexChildren) in item.children"
                    :key="indexChildren + 'itemChildren'"
                    :value="itemChildren.value"
                    :class="itemChildren.value === home.homeState.language ? styles.languageActive : ''"
                    >{{ itemChildren.content }}</t-dropdown-item
                  >
                </t-dropdown-menu>
              </t-dropdown-item>
            </t-dropdown-menu>
          </t-dropdown>
          
          <!-- 移动端菜单按钮 -->
          <button 
            :class="[styles.mobileMenuButton, isDarkMode ? styles.darkMode : '']"
            @click="toggleMobileMenu"
            aria-label="打开导航菜单"
          >
            <svg v-if="!mobileMenuOpen" :class="styles.mobileMenuIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else :class="styles.mobileMenuIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 移动端导航菜单 -->
      <div
        :class="[styles.mobileMenu, mobileMenuOpen ? styles.open : '', isDarkMode ? styles.darkMode : '']"
      >
        <router-link 
          v-for="(item, index) in navItems" 
          :key="index"
          :to="item.path"
          :class="[
            styles.mobileNavLink, 
            isActive(item.path) ? styles.active : '',
            isDarkMode ? styles.darkMode : ''
          ]"
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
import styles from '@/styles/components/AppHeader.module.scss';

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

// 是否为暗黑模式
const isDarkMode = computed(() => {
  return document.documentElement.classList.contains('dark-mode');
});

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

<!-- 保留原有样式作为降级方案 -->
<style scoped>
/* Original: Line 1-10 */
.dropdown-box .t-icon-chevron-right {
  display: none !important;
}

/* Original: Line 11-13 */
.language-active {
  color: var(--color-primary) !important;
}

/* Original: Line 14-18 */
.t-dropdown__item-text .language-switch {
  width: 16px;
  display: block;
  margin-left: 14px;
}
</style>
