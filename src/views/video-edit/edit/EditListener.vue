<template>
  <div class="player">
    <div class="player-box" v-if="state.show">
      <div class="player-close" @click="action.close">
        <CloseIcon />
      </div>
      <div class="player-body">
        <t-image class="image" v-if="state.status === AUDIO_STATUS.PLAYING" :src="PauseIcon"
          @click="action.togglePlay()" />
        <t-image class="image" v-else :src="PlayIcon" @click="action.togglePlay()" />
        <div class="main">
          <div class="info">
            <div class="name" :title="state.name">{{ state.name }}</div>
            <div class="duration">{{ getter.currentTime.value }}/{{ state.duration }}</div>
          </div>
          <t-slider class="slider" :tooltipProps="{ visible: false }" :max="state.slider.max" :min="state.slider.min"
            :value="state.slider.value" @change-end="action.updateSider" @change="action.updateTimeShow" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onBeforeUnmount, computed, ComputedRef } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { CloseIcon } from 'tdesign-icons-vue-next'
import PlayIcon from '@renderer/assets/images/icons/icon-play.png'
import PauseIcon from '@renderer/assets/images/icons/icon-pause.png'
import { cloneDeep } from 'lodash-es';
import { handlePath, millisecondsToTime } from '@renderer/utils/index.js'

// 定义音频数据接口
interface AudioData {
  name: string
  audioUrl: string
  [key: string]: any
}

// 定义组件状态接口
interface ComponentState {
  show: boolean
  name: string
  duration: string
  audioUrl: string
  status: number
  slider: {
    max: number
    min: number
    value: number | string
  }
}

// 定义计算属性接口
interface Getters {
  currentTime: ComputedRef<string>
}

// 定义动作接口
interface Actions {
  current: () => ComponentState
  close: () => void
  stop: () => void
  updateSider: (value: number) => void
  updateTimeShow: (value: number) => void
  play: (audioUrl?: string) => void
  togglePlay: () => void
  listen: (data: AudioData) => void
  pause: () => void
}

const AUDIO_STATUS = {
  UNPLAY: 0,
  PLAYING: 1,
  PLAYED: 2,
  PAUSED: 3,
}

const audio = new Audio()

audio.addEventListener('timeupdate', () => {
  state.slider.value = audio.currentTime
});

audio.addEventListener('canplay', () => {
  state.slider.max = audio.duration
  state.duration = millisecondsToTime(audio.duration * 1000)
})

audio.addEventListener('ended', () => {
  action.stop()
})

onBeforeUnmount(() => {
  action.close()
})

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const state = reactive<ComponentState>({
  show: false,
  name: '',
  duration: '',
  audioUrl: '',
  status: AUDIO_STATUS.UNPLAY,
  slider: {
    max: 0,
    min: 0,
    value: ''
  }
})

const getter: Getters = {
  currentTime: computed(() => {
    return millisecondsToTime((state.slider.value as number) * 1000)
  })
}

const action: Actions = {
  current() {
    return cloneDeep(state)
  },

  close() {
    state.show = false
    state.name = ''
    state.duration = ''
    state.audioUrl = ''

    action.stop()
  },
  stop() {
    audio.pause()
    audio.currentTime = 0
    state.slider.value = 0
    state.status = AUDIO_STATUS.UNPLAY
  },
  updateSider(value: number) {
    action.pause()
    audio.currentTime = value
    action.play()
  },

  updateTimeShow(value: number) {
    state.slider.value = value
  },

  play(audioUrl?: string) {
    if (audioUrl && audioUrl !== state.audioUrl) {
      audio.src = handlePath(audioUrl)
      state.audioUrl = audioUrl
    }
    audio.play()
    state.status = AUDIO_STATUS.PLAYING
  },

  togglePlay() {
    if (audio.paused) {
      action.play()
    } else {
      action.pause()
    }
  },

  listen({ name, audioUrl }: AudioData) {
    if (!audioUrl) {
      MessagePlugin.error('未找到音频链接')
      return
    }
    state.show = true
    state.name = name || "未命名"
    action.stop()
    action.play(audioUrl)
  },
  pause() {
    audio.pause()
    state.status = AUDIO_STATUS.PAUSED
  }
}

defineExpose({
  pause: action.pause,
  current: action.current,
  close: action.close,
  listen: action.listen
})
</script>
<style lang="less" scoped>
.player {
  width: 100%;
  height: 88px;

  &-box {
    position: relative;
    padding: 26px 38px 26px 20px;
    height: 100%;
    color: #fff;
    box-shadow: inset 0px 1px 0px 0px #000000;
  }

  &-close {
    width: 20px;
    height: 20px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    position: absolute;
    right: 8px;
    top: 8px;
  }

  &-body {
    display: flex;
    align-items: center;
    gap: 16px;

    .image {
      width: 35px;
      height: 35px;
      background: transparent;
    }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .name {
        width: 70%;
        font-weight: 400;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 16px;
        white-space: nowrap;
        /* 保持文本在一行显示 */
        overflow: hidden;
        /* 超出部分隐藏 */
        text-overflow: ellipsis;
        /* 超出部分显示省略号 */
      }

      .duration {
        font-weight: 400;
        font-size: 12px;
        color: #DDDDE9;
        line-height: 14px;
      }
    }

    .slider {
      :deep(.t-slider__button) {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>
