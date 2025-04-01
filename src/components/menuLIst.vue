<template>
  <nav 
    class="fixed left-0 top-16 bottom-0 w-20 bg-white dark:bg-gray-900 shadow-sm border-r border-gray-200 dark:border-gray-700 transition-colors duration-300 z-40"
    aria-label="侧边导航"
  >
    <ul class="py-4 flex flex-col items-center space-y-6">
      <li v-for="(item, index) in state.menuList" :key="index">
        <router-link 
          :to="item.path" 
          class="flex flex-col items-center p-3 rounded-xl transition-colors duration-200 group"
          :class="[
            item.active 
              ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
              : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          ]"
          :aria-current="item.active ? 'page' : undefined"
        >
          <component 
            :is="item.icon" 
            class="w-7 h-7 mb-1"
          />
          <span class="text-xs font-medium">{{ item.name }}</span>
          
          <!-- 活动指示器 -->
          <div 
            v-if="item.active" 
            class="absolute left-0 w-1 h-8 bg-primary-600 dark:bg-primary-400 rounded-r-md"
            aria-hidden="true"
          ></div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { reactive, watch, computed } from 'vue'
// 使用TDesign的图标代替SVG文件
import { 
  HomeIcon, 
  AppIcon, 
  SoundIcon, 
  UserIcon 
} from 'tdesign-icons-vue-next'
import { useI18n } from 'vue-i18n'

// 定义菜单项接口
interface MenuItem {
  key: string
  name: string
  icon: any // TDesign图标组件
  active: boolean
  path: string
}

// 定义组件状态接口
interface MenuState {
  menuList: MenuItem[]
}

const { t, locale } = useI18n()
const unRoute = useRoute()
const router = useRouter()

const obj: MenuItem[] = [
  {
    key: 'common.menu.text',
    name: t('common.menu.text'),
    icon: HomeIcon,
    active: true,
    path: '/home'
  },
  {
    key: 'common.menu.voice',
    name: t('common.menu.voice') || '音色管理',
    icon: SoundIcon,
    active: false,
    path: '/voice-management'
  }
  /* {
      name: "账号",
      onIcon,
      offIcon,
      active: true,
      path: "/account",
    }, */
]

const state = reactive<MenuState>({
  menuList: obj
})

watch(locale, () => {
  state.menuList.forEach((el) => {
    el.name = t(el.key)
  })
})

watch(
  () => unRoute.path,
  (newPath: string) => {
    state.menuList.forEach((el) => {
      if (newPath.includes(el.path)) {
        el.active = true
      } else {
        el.active = false
      }
    })
  }
)

const handleClick = (item: MenuItem): void => {
  router.push(item.path)
}
</script>
<style lang="less" scoped>
.menu-list {
  width: 76px;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 60px;
  height: 100%;
  li {
    list-style: none;
    display: flex;
    height: 50px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .content-body {
      position: relative;
      .icon {
        width: 44px;
        height: 44px;
        display: block;
      }
      .active-icon {
        position: absolute;
        display: block;
        top: 8px;
        left: -16px;
      }
      .text {
        text-align: center;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #9097a5;
        line-height: 14px;
        margin-top: 3px;
      }
    }
  }
}
</style>
