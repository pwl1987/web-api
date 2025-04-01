// import './assets/main.css'  // 注释掉旧版样式
// 导入我们的新样式
import './styles/main.scss'
// 初始化设计系统变量
import { initializeDesignSystem } from './utils/design-system'

import TDesign from 'tdesign-vue-next'
import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import i18n, { type SupportedLocale } from "./i18n/index";
import webClient from './client';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css'

const app: VueApp = createApp(App);
const pinia = createPinia();

// 提供客户端API给全局
app.provide('client', webClient);

// 为兼容性考虑，将client挂载到window对象
// 添加扩展声明，使TypeScript识别客户端属性
declare global {
  interface Window {
    client: typeof webClient;
  }
}
window.client = webClient;

// 初始化设计系统
initializeDesignSystem();

// 先挂载pinia，这样i18n可以正确访问store
app.use(pinia);

// 从localStorage获取存储的语言设置
const storedLanguage = localStorage.getItem('HG_LANGUAGE');
if (storedLanguage && (storedLanguage === 'zh' || storedLanguage === 'en')) {
  i18n.global.locale.value = storedLanguage as SupportedLocale;
}

// 挂载其他插件和路由
app.use(router).use(TDesign).use(i18n).mount('#app');
