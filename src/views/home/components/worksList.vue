<template>
  <div class="works-content-box">
    <!-- form -->
    <div class="form-box">
      <t-input
        v-model="state.formData.name"
        class="form-input"
        :placeholder="$t('common.input.enterKeywordPlaceholder')"
        @change="onKeypressFun"
      >
        <template #prefix-icon>
          <img src="../../../assets/images/home/select.svg" />
        </template>
      </t-input>
    </div>
    <div class="works-content-table">
      <div v-if="home.homeState.videoNum === 0" class="empty">
        <div class="empty-box">
          <img src="../../../assets/images/home/worksList.svg" />
          <div class="empty-text">{{ $t('common.videoList.emptyText') }}</div>
          <div class="empty-text">
            <span @click="linkRoute">{{ $t('common.videoList.emptyLinkRouteText') }}</span>
            {{ $t('common.videoList.emptyRightText') }}
          </div>
        </div>
      </div>
      <div v-else class="table-list">
        <div v-for="(item, index) in state.worksList" :key="index + 'worksList'" class="li">
          <!-- 视频上部分内容 -->
          <div class="img-video comme">
            <div class="img-video-content">
              <div v-if="item.status === 'success'" class="duration">
                {{ item.duration + '' ? millisecondsToTime(item.duration * 1000) : '00:00' }}
              </div>
              <div v-if="item.status === 'success'" class="works-video">
                <video :src="handlePath(item.filePath)"></video>
              </div>
              <!--  <video class="works-video" src="../../../assets/images/home/aa.mp4"></video> -->
              <img
                v-if="item.status === 'failed' || item.status === 'pending' || item.status === 'draft'"
                class="works-img"
                src="../../../assets/images/home/occupationMap.svg"
              />
              <div v-if="item.status === 'failed' || item.status === 'draft'" class="fail">
                <div class="fail-line"></div>
                <span>{{
                  item.status === 'failed'
                    ? $t('common.videoList.makeFailedText')
                    : $t('common.videoList.draftsText')
                }}</span>
              </div>
            </div>
          </div>
          <!-- 下载和预览 -->
          <div
            class="download-preview comme"
            :style="
              item.status === 'failed' || item.status === 'success'
                ? 'background: rgba(0, 0, 0, 0.74);'
                : ''
            "
          >
            <div class="download-preview-content">
              <div
                v-if="item.status === 'success'"
                class="preview-button"
                @click="previewVideo(item.filePath)"
              >
                <img src="../../../assets/images/home/video.svg" />
                <span>{{ $t('common.videoList.previewTitle') }}</span>
              </div>
              <div
                v-if="item.status === 'success'"
                class="download-button"
                @click="downloadVideo(item)"
              >
                <img src="../../../assets/images/home/icon-down.svg" />
                <span>{{ $t('common.videoList.downloadTitle') }}</span>
              </div>
              <div v-if="item.status === 'failed'" class="detection-failed-text">
                {{ $t('common.videoList.makeFailedText') }}
                <img src="../../../assets/images/home/icon-delete.svg" />
              </div>
              <div v-if="item.status === 'draft'" class="detection-failed-text">
                {{ $t('common.videoList.draftsText') }}
                <img src="../../../assets/images/home/icon-delete.svg" />
              </div>
              <div v-if="item.status === 'failed'" class="detection-failed-title">
                {{ item.message }}
              </div>
              <div
                v-if="
                  item.status === 'success' || item.status === 'failed' || item.status === 'draft'
                "
                class="delete-video"
                @click="delVideo(item.id)"
              >
                <DeleteIcon style="color: #fff; font-size: 12px" />
              </div>
            </div>
          </div>
          <!-- 制作中 -->
          <div v-if="item.status === 'pending'" class="production comme">
            <div class="production-content">
              <img src="../../../assets/images/home/loading.svg" />
              <div class="progress-text">{{ item.progress }}%</div>
              <div class="production-text">{{ $t('common.videoList.underProduction') }}</div>
            </div>
            <div class="delete-video" @click.native="delVideo(item.id)">
              <DeleteIcon style="color: #fff; font-size: 12px" />
            </div>
          </div>
          <!-- 排队中 -->
          <div v-if="item.status === 'waiting'" class="production comme">
            <div class="production-content">
              <img src="../../../assets/images/home/loading.svg" />
              <div class="progress-text">{{ item.progress }}</div>
              <div class="production-text">{{ $t('common.videoList.queuing') }}</div>
            </div>
            <div class="delete-video" @click="delVideo(item.id)">
              <DeleteIcon style="color: #fff; font-size: 12px" />
            </div>
          </div>
          <!-- 视频下部分内容 -->
          <div class="bottom-text">
            <div class="h1">{{ item.name }}</div>
            <div class="text">
              {{ item.createdAt ? formatDate(item.createdAt) : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="home.homeState.videoNum > 0" class="pagination-box">
      <div class="pagination-content">
        <t-config-provider :global-config="locale === 'zh' ? globalZh : globalEn">
          <t-pagination
            v-model="state.current"
            v-model:pageSize="state.pageSize"
            :total="state.total"
            show-jumper
            class="pagination"
            @page-size-change="onPageSizeChange"
            @current-change="onCurrentChange"
          />
        </t-config-provider>
      </div>
    </div>
    <VideoDialog
      :showVideoDialog="state.showVideoDialog"
      :videoUrl="state.videoUrl"
      @cancel="cancelFun"
    />
    <DeleteDialog ref="deleteDialogRef" @ok="okDelete" />
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount, ref } from 'vue'
import { DeleteIcon } from 'tdesign-icons-vue-next'
import { videoPage, removeVideo } from '@renderer/api/index'
import { formatDate, handlePath, millisecondsToTime } from '@renderer/utils/index.ts'
import VideoDialog from '@renderer/views/home/components/videoDialog.vue'
import { useHomeStore } from '@renderer/stores/home'
import { useRouter } from 'vue-router'
import DeleteDialog from '@renderer/components/deleteDialog.vue'
import { MessagePlugin } from 'tdesign-vue-next'
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'
import { useI18n } from 'vue-i18n'
import merge from 'lodash/merge'

// 定义视频项接口
interface VideoItem {
  id: string
  name: string
  filePath?: string
  videoPath?: string
  status: 'success' | 'failed' | 'pending' | 'waiting' | 'draft'
  duration?: number
  progress?: number
  message?: string
  createdAt?: string | Date
  [key: string]: any
}

// 定义查询参数接口
interface QueryParams {
  page: number
  pageSize: number
  name: string
}

// 定义API响应接口
interface VideoPageResponse {
  total: number
  list: VideoItem[]
}

// 定义组件状态接口
interface ComponentState {
  interval: ReturnType<typeof setInterval> | null
  current: number
  videoUrl: string
  showVideoDialog: boolean
  pageSize: number
  total: number
  delVideoId: string
  worksList: VideoItem[]
  url: string
  isTime?: boolean
  downloading?: Record<string, boolean>
  downloadInfo?: {
    videoId: string
    visible: boolean
  }
  formData: {
    name: string
  }
}

const { locale, t } = useI18n()

const globalEn = merge(enConfig, {
  pagination: {}
})
const globalZh = merge(zhConfig, {
  pagination: {}
})
const router = useRouter()
const home = useHomeStore()
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)
const state = reactive<ComponentState>({
  interval: null,
  current: 1,
  videoUrl: '',
  showVideoDialog: false,
  pageSize: 10,
  total: 0,
  delVideoId: '',
  worksList: [],
  url: ``,
  formData: {
    name: ''
  }
})

onMounted(() => {
  videoPageAJax()
  state.interval = setInterval(() => {
    videoPageAJax()
  }, 3000)
})

onBeforeUnmount(() => {
  if (state.interval) {
    clearInterval(state.interval)
  }
})

const cancelFun = (): void => {
  state.showVideoDialog = false
}

const linkRoute = (): void => {
  router.push('/video/edit')
}

const previewVideo = (url: string): void => {
  state.showVideoDialog = true
  state.videoUrl = url
}

const videoPageAJax = async (): Promise<void> => {
  try {
    const params: QueryParams = {
      page: state.current,
      pageSize: state.pageSize,
      name: state.formData.name
    }

    const res = await videoPage(params)
    if (res) {
      const { total, list } = res as VideoPageResponse
      if (list) {
        state.total = total
        state.worksList = list
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const onKeypressFun = (): void => {
  if (!state.isTime) {
    state.isTime = true
    const timeout = setTimeout(() => {
      videoPageAJax()
      state.isTime = false
      clearTimeout(timeout)
    }, 800)
  }
}

const onPageSizeChange = (size: number): void => {
  state.pageSize = size
  videoPageAJax()
}

const onCurrentChange = (index: number): void => {
  state.current = index
  videoPageAJax()
}

const delVideo = (id: string): void => {
  if (deleteDialogRef.value && deleteDialogRef.value.showDialogFun) {
    deleteDialogRef.value.showDialogFun()
    state.delVideoId = id
  }
}

const okDelete = (): void => {
  removeVideo(state.delVideoId)
    .then(() => {
      videoPageAJax()
      MessagePlugin.success(t('common.message.deleteSuccessText'))
      home.setVideoNum(home.homeState.videoNum > 0 ? home.homeState.videoNum - 1 : 0)
    })
    .catch((error) => {
      MessagePlugin.error(t('common.message.deleteErrorText'))
      console.error('Error:', error)
    })
}

const downloadVideo = async (video: VideoItem): Promise<void> => {
  try {
    // 检查视频路径是否有效
    if (!video.filePath) {
      throw new Error('视频文件路径无效')
    }

    // 获取文件扩展名，如果无法获取则默认为mp4
    const fileExtension = video.filePath?.split('.')?.pop() || 'mp4'
    const fileName = `${video.name || '视频'}.${fileExtension}`

    // 显示下载准备提示
    MessagePlugin.success(t('common.message.downloadStartText'))

    try {
      // 方式一：使用a标签的download属性强制下载
      const a = document.createElement('a')
      a.href = handlePath(video.filePath)
      a.download = fileName
      a.style.display = 'none'

      document.body.appendChild(a)
      a.click()

      setTimeout(() => {
        document.body.removeChild(a)
      }, 100)
    } catch (err) {
      console.warn('下载失败', err)
    }

    // 清除任何可能存在的下载状态
    if (state.downloadInfo && state.downloadInfo.videoId === video.id) {
      state.downloadInfo.visible = false
    }
    if (state.downloading && state.downloading[video.id]) {
      delete state.downloading[video.id]
    }
  } catch (error) {
    MessagePlugin.error((error as Error).message || t('common.message.downloadErrorText'))
  }
}
</script>
<style lang="less" scoped>
.works-content-box {
  .form-box {
    display: flex;
    margin-bottom: 24px;
    position: absolute;
    top: -50px;
    right: 0;

    .form-input {
      width: 216px;
      margin-left: auto;
    }
  }
  .works-content-table {
    min-height: calc(100vh - 384px);
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 414px);
      .empty-box {
        img {
          width: 160px;
          display: block;
          margin: 0 auto;
        }
        .empty-text {
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 12px;
          text-align: center;
          color: #999999;
          line-height: 16px;
          span {
            color: #434af9;
            border-bottom: 1xp solid #434af9;
            cursor: pointer;
          }
        }
      }
    }
    .table-list {
      display: grid;
      padding-bottom: 40px;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
      color: #ccc;

      .li:hover {
        transform: scale(1.01);
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

        .download-preview {
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          .download-preview-content {
            .download-button {
              width: 90px;
              height: 30px;
              cursor: pointer;
              background: #434af9;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #434af9;
              font-family: PingFang SC, PingFang SC;
              font-weight: 500;
              font-size: 12px;
              color: #ffffff;

              line-height: 18px;

              img {
                margin-right: 4px;
              }
            }

            .detection-failed-text {
              font-family: PingFang SC, PingFang SC;
              font-weight: 500;
              font-size: 12px;
              padding: 0 6px;
              display: flex;
              justify-content: center;
              color: #ffffff;
              line-height: 18px;
              margin-bottom: 12px;
            }

            .detection-failed-title {
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              width: 80px;
              text-align: center;
              font-size: 12px;
              display: flex;
              justify-content: center;
              color: #ffffff;
              line-height: 18px;
            }

            .preview-button {
              width: 90px;
              height: 30px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 8px;
              border-radius: 4px;
              font-family: PingFang SC, PingFang SC;
              font-weight: 500;
              font-size: 12px;
              color: #ffffff;
              line-height: 18px;
              border: 1px solid rgba(255, 255, 255, 0.6);

              img {
                margin-right: 4px;
              }
            }
          }
        }
      }

      .delete-video {
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          position: absolute;
          left: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          top: 10px;
        }

      .li {
        transition: all 0.3s ease;
        aspect-ratio: 1 / 1.6;
        border-radius: 8px;
        position: relative;
        .download-preview {
          display: none;
        }

        .comme {
          position: absolute;
          top: 0;
          width: 100%;
          left: 0;
          border-radius: 8px 8px 0 0;
          height: calc(100% - 64px);
        }

        .img-video {
          z-index: 1;

          .img-video-content {
            position: relative;
            height: 100%;
            background-color: #ebeef5;
            border-radius: 10px 10px 0 0;
            overflow: hidden;

            .works-img {
              width: 100%;
              border-radius: 8px 8px 0 0;
              background-color: #fff;
            }

            .works-video {
              width: 100%;
              height: 100%;
              overflow: hidden;
              position: absolute;
              border-radius: 8px 8px 0 0;
              left: 0;
              display: flex;
              align-items: center;
              top: 0;
              video {
                width: 100%;
              }
            }

            .fail {
              padding: 0 6px;
              height: 22px;
              background: rgba(255, 255, 255, 0.9);
              border-radius: 0px 8px 0px 8px;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              top: 0;
              right: 0;

              .fail-line {
                width: 4px;
                height: 4px;
                background: #ff2f2f;
                border-radius: 8px;
                margin-right: 5px;
              }

              span {
                font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #253858;
                line-height: 14px;
              }
            }

            .duration {
              padding: 0 5px;
              position: absolute;
              bottom: 8px;
              right: 8px;
              height: 18px;
              background: rgba(0, 0, 0, 0.63);
              border-radius: 4px;
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 10px;
              color: #ffffff;
              line-height: 12px;
              font-style: normal;
            }
          }
        }

        .bottom-text {
          height: 64px;
          position: absolute;
          bottom: 0;
          padding: 4px 8px 8px 8px;
          left: 0;
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #f2f2f4;
          border-left: 1px solid #f2f2f4;
          border-right: 1px solid #f2f2f4;
          border-radius: 0 0 8px 8px;
          .h1 {
            font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
            font-weight: 600;
            font-size: 14px;
            color: #252525;
            line-height: 28px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .text {
            font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
            font-weight: 400;
            margin-top: 5px;
            font-size: 10px;
            color: rgba(37, 37, 37, 0.5);
            line-height: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .production {
          z-index: 2;
          background: rgba(0, 0, 0, 0.74);
          display: flex;
          justify-content: center;
          align-items: center;

          .production-content {
            img {
              display: block;
              width: 20px;
              height: 20px;
              margin: 0 auto;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .production-text {
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              font-size: 12px;
              margin-top: 10px;
              color: #ffffff;
              line-height: 14px;
              text-align: center;
            }
            .progress-text {
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              font-size: 12px;
              margin-top: 10px;
              color: #ffffff;
              line-height: 14px;
              text-align: center;
            }
          }
        }
      }
    }
  }

  .pagination-box {
    position: sticky;
    z-index: 99;
    height: 46px;
    width: 100%;
    bottom: -20px;
    left: 0;
    background-color: #fff;
    .pagination-content {
      justify-content: center;
      display: flex;
      height: 46px;
    }
  }
}
</style>
