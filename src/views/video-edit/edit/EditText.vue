<template>
  <div class="text">
    <t-textarea class="text-content" v-model="select.text"
      :placeholder="$t('common.input.videoContentTextPlaceholder')" />
    <div class="text-listen">
      <!-- 选择音色 -->
      <div class="speaker">
        <div class="speaker-content">
          <span class="label">音色</span>
          <t-popup trigger="click" overlayClassName="speaker-popup" placement="top-left"
            v-model:visible="state.popupVisible">
            <t-select class="selector" :value="select.speaker?.name"
              :popupProps="{ overlayClassName: 'speaker-options' }" placeholder="选择">
            </t-select>
            <template #content>
              <div class="popup-scoped">
                <div class="side">我的</div>
                <EditTextSpeaker class="wrap" v-model="select" @onSelect="action.onSelectSpeaker"
                  :popupVisible="state.popupVisible" />
              </div>
            </template>
          </t-popup>
        </div>
      </div>
      <!-- 试听 -->
      <t-button class="start" size="small" @click="action.textToAudio" :loading="state.textToAudioLoading">试听</t-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, PropType } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import EditTextSpeaker from './EditTextSpeaker.vue';
import { useI18n } from 'vue-i18n'
import { audition } from '@renderer/api'

// 定义音色接口
interface SpeakerInfo {
  id?: string | number
  name?: string
  audioPath?: string
  [key: string]: any
}

// 定义选择状态接口
interface SelectState {
  model?: {
    id?: string | number
    name?: string
    [key: string]: any
  }
  speaker?: SpeakerInfo
  text?: string
  [key: string]: any
}

// 定义音频数据接口
interface AudioData {
  name: string
  audioUrl: string
  [key: string]: any
}

// 定义组件状态接口
interface ComponentState {
  popupVisible: boolean
  textToAudioLoading: boolean
}

// 定义监听器接口
interface Listener {
  listen: (data: AudioData) => void
  pause: () => void
  [key: string]: any
}

const { t } = useI18n()

const select = defineModel<SelectState>({})

const props = defineProps({
  listener: {
    type: Object as PropType<Listener>,
    default: () => ({})
  }
})

const state = reactive<ComponentState>({
  popupVisible: false,
  textToAudioLoading: false,
})

const action = {
  async textToAudio(): Promise<boolean | void> {
    const { speaker, text } = select.value || {}
    if (!speaker?.id) {
      await MessagePlugin.error('请选择音色')
      return false
    }
    if (!text) {
      await MessagePlugin.error(t('common.message.videoContentText'))
      return false
    }
    state.textToAudioLoading = true
    try {
      const auditionUrl = await audition(speaker.id, text)

      const name = (speaker.name || '') + ' - ' + text.slice(0, 10)

      props.listener.listen({
        name,
        audioUrl: auditionUrl
      })
    } catch (err) {
      console.error('文本转音频失败', err)
      MessagePlugin.error((err as Error).toString() || '试听失败')
    } finally {
      state.textToAudioLoading = false
    }
  },
  onSelectSpeaker(speaker: SpeakerInfo): void {
    props.listener.pause()
  }
}
</script>
<style lang="less">
.speaker {
  &-options {
    visibility: hidden;
  }

  &-popup {
    width: 412px;
    height: 400px;
    background: #1D1E20;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.5);
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #393A3B;
    margin-bottom: 12px !important;

    .t-popup__content {
      background-color: transparent;
      border: none;
      box-shadow: none;
      height: 100%;
      color: #ffffff;
      padding: 0;
    }
  }
}
</style>
<style lang="less" scoped>
.text {
  height: 100%;
  position: relative;

  &-content {
    height: 100%;
    --td-text-color-placeholder: rgba(255, 255, 255, 0.6);
    padding-bottom: 52px;

    :deep(textarea) {
      height: 100% !important;
      border: none;
      font-size: 12px;
      min-height: unset;
      padding: 12px;
      color: rgba(255, 255, 255, 0.9);
      line-height: 20px;
      resize: none;
    }
  }

  &-listen {
    padding: 0 12px;
    position: absolute;
    align-items: center;
    bottom: 12px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .start {
      min-width: 48px;
      height: 24px;
      border-radius: 2px;
      font-size: 12px;
    }

    .speaker {
      --td-text-color-primary: #fff;

      &-content {
        display: flex;
        align-items: center;
        gap: 12px;

        .label {
          font-weight: 500;
          font-size: 12px;
          color: #FFFFFF;
          line-height: 18px;
          white-space: nowrap;
        }

        .selector {
          width: 88px;
          height: 30px;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #2E3033;
          --td-brand-color-focus: transparent;
          --td-text-color-placeholder: rgba(255, 255, 255, 0.6);

          :deep(.t-input) {
            background-color: transparent;
            color: #fff;
            font-weight: 400;
            font-size: 12px;
            height: 30px;
            border: none;
            transition: none;

            &:hover {
              border: none;
            }

            svg {
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}

.popup-scoped {
  display: flex;
  height: 100%;
  align-items: stretch;

  .side {
    width: 68px;
    flex: none;
    padding: 20px 0 0 0;
    background: #27292D;
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.3);
    line-height: 22px;
  }

  .wrap {
    flex: 1;
  }
}
</style>
