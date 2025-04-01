/**
 * Home store - 提供全局状态管理
 */
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

// 定义首页状态的类型
interface HomeState {
  language: string
  isAgree: boolean
  agreementVisible: boolean
}

export const useHomeStore = defineStore('home', () => {
  // 状态
  const homeState = reactive<HomeState>({
    language: 'zh',
    isAgree: false,
    agreementVisible: false
  })

  // 语言设置
  function setLanguage(lang: string) {
    homeState.language = lang
  }

  // 协议相关
  function setIsAgree(value: boolean) {
    homeState.isAgree = value
  }

  function setAgreementVisible(value: boolean) {
    homeState.agreementVisible = value
  }

  return {
    homeState,
    setLanguage,
    setIsAgree,
    setAgreementVisible
  }
})
