<template>
  <div class="list">
    <!-- 搜索框 -->
    <t-input class="list-search" v-model="state.search" placeholder="搜索音色" @change="action.searchList">
      <template #prefix-icon>
        <SearchIcon />
      </template>
    </t-input>
    <div class="list-box noscrollbar">
      <div class="list-box__item" v-for="speaker in state.speakerList" :speaker-id="speaker.id" :key="speaker.id"
        @click="action.selectSpeaker(speaker)" :class="{ '--active': select.speaker?.id === speaker.id }">
        <t-avatar class="avatar" :alt="speaker.name">{{ speaker.name.slice(0, 1) }}</t-avatar>
        <div class="name" :title="speaker.name">{{ speaker.name }}</div>
        <t-image class="btn" v-if="state.playingId !== speaker.id" :src="PlayIcon"
          @click="action.handlePlay(speaker)" />
        <t-image class="btn" v-else :src="PauseIcon" @click="action.handlePlay(speaker)" />
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { reactive, onUnmounted, watchEffect } from 'vue'
import { SearchIcon } from 'tdesign-icons-vue-next'
import PlayIcon from '@renderer/assets/images/icons/icon-play.png'
import PauseIcon from '@renderer/assets/images/icons/icon-pause.png'
import { voicePage } from '@renderer/api'
import { MessagePlugin } from 'tdesign-vue-next'
import { handlePath } from '@renderer/utils'

// 定义音色接口
interface SpeakerInfo {
  id?: string
  name?: string
  audioPath?: string
  [key: string]: any
}

// 定义选择状态接口
interface SelectState {
  model?: {
    id?: string
    name?: string
    [key: string]: any
  }
  speaker?: SpeakerInfo
  text?: string
  [key: string]: any
}

// 定义组件状态接口
interface ComponentState {
  search: string
  playingId: string
  status: number
  speakerList: SpeakerInfo[]
}

// 定义响应接口
interface VoicePageResponse {
  list?: SpeakerInfo[]
  total?: number
}

const select = defineModel<SelectState>({})

const AUDIO_STATUS = {
  UNPLAY: 0,
  PLAYING: 1,
  PLAYED: 2,
}

onUnmounted(() => {
  action.stopAudio()
})

const audio = new Audio()

audio.addEventListener('ended', () => {
  action.stopAudio()
})

const props = defineProps({
  popupVisible: {
    type: Boolean,
    default: false
  }
})

const state = reactive<ComponentState>({
  search: '',
  playingId: '',
  status: AUDIO_STATUS.UNPLAY,
  speakerList: []
})

const emit = defineEmits<{
  (e: 'onSelect', speaker: SpeakerInfo): void
}>()

const action = {
  init(): void {
    watchEffect(async () => {
      if (props.popupVisible) {
        await action.searchList()
        setTimeout(action.scrollToSelectSpeaker);
      } else {
        action.stopAudio()
      }
    })
  },
  async searchList(): Promise<void> {
    try {
      const result = await voicePage({
        name: state.search,
        page: 1,
        pageSize: 100
      }) as VoicePageResponse
      state.speakerList = result.list || []
    } catch (err) {
      console.error('查询音色列表失败', err)
      state.speakerList = []
    }
  },
  // 选中的音色滚动到中间
  scrollToSelectSpeaker(): void {
    const speakerId = select.value.speaker?.id
    if (speakerId) {
      const target = document.querySelector(`div[speaker-id="${speakerId}"]`)
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  },
  selectSpeaker(speaker: SpeakerInfo): void {
    select.value.speaker = speaker
    emit('onSelect', speaker)
  },

  stopAudio(): void {
    audio.pause()
    audio.currentTime = 0
    state.playingId = ''
  },
  playAudio(speaker: SpeakerInfo): void {
    audio.src = handlePath(speaker.audioPath)
    state.playingId = speaker.id
    audio.play()
  },

  handlePlay(speaker: SpeakerInfo): void {
    action.selectSpeaker(speaker)
    if (!speaker.audioPath) {
      MessagePlugin.error(`未找到${speaker.name}的音频链接`)
      return
    }
    if (state.playingId === speaker.id) {
      action.stopAudio()
    } else {
      action.playAudio(speaker)
    }
  },
}

action.init()

</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-search {
    flex: none;
    padding: 16px 12px;
    --td-bg-color-specialcomponent: #1d1e20;
    --td-text-color-primary: #ffffff;
    --td-text-color-placeholder: rgba(255, 255, 255, 0.6);

    :deep(.t-input) {
      border-color: rgba(255, 255, 255, 0.6);
    }

    :deep(.t-input--focused) {
      box-shadow: none;
    }
  }

  &-box {
    flex: 1;
    overflow: auto;
    padding: 0 12px;
  }

  &-box__item {
    width: 100%;
    height: 72px;
    background: #27292D;
    margin-bottom: 12px;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid transparent;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    gap: 8px;

    &.--active {
      border: 1px solid var(--td-brand-color);
    }

    &:last-of-type {
      margin-bottom: 21px;
    }

    .avatar {
      flex: none;
      width: 40px;
      height: 40px;
    }

    .name {
      font-weight: 500;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 22px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      /* 限制在两行 */
      overflow: hidden;
      /* 隐藏溢出的内容 */
      text-overflow: ellipsis;
      /* 溢出时显示省略号 */
    }

    .btn {
      flex: none;
      margin-left: auto;
      cursor: pointer;
      width: 28px;
      height: 28px;
      background: transparent;
    }
  }
}
</style>
