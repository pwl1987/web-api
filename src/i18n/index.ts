import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';

// 定义支持的语言类型
export type SupportedLocale = 'zh' | 'en';

// 国际化消息集合
const messages = {
  en,
  zh
};

// 创建I18n实例
const i18n = createI18n({
  legacy: false,         // 使用Composition API模式
  globalInjection: true, // 全局注入$t方法
  locale: 'zh' as SupportedLocale,  // 默认使用中文
  fallbackLocale: 'en',  // 回退语言
  messages
});

export default i18n;
