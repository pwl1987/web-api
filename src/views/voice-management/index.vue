<template>
  <div class="container mx-auto px-4 py-6 voice-management">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
      <!-- 页面标题 -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">音色管理</h1>
        
        <div class="flex space-x-3">
          <!-- 搜索框 -->
          <div class="relative">
            <FormInput
              id="search-voice"
              v-model="searchKeyword"
              placeholder="搜索音色名称"
              aria-label="搜索音色名称"
              iconLeft
              @input="debouncedSearch"
            >
              <template #icon-left>
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </template>
            </FormInput>
          </div>
          
          <!-- 上传按钮 -->
          <Button 
            variant="primary"
            @click="showUploadDialog = true"
            :aria-label="'上传新音色'"
          >
            <template #icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </template>
            上传新音色
          </Button>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="min-h-[300px]">
        <!-- 加载状态 -->
        <div v-if="voiceStore.loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
        </div>
        
        <!-- 无数据状态 -->
        <div v-else-if="voiceStore.voiceList.length === 0" class="flex flex-col items-center justify-center h-64">
          <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <p class="text-gray-500 dark:text-gray-400 text-lg">{{ searchKeyword ? '未找到匹配的音色' : '暂无音色，请点击上传按钮添加' }}</p>
        </div>
        
        <!-- 音色列表 -->
        <div 
          v-else 
          class="voice-card-container" 
          style="container-type: inline-size; container-name: voice-grid"
        >
          <VoiceCard 
            v-for="voice in voiceStore.voiceList" 
            :key="voice.id" 
            :voice="voice"
            @delete="handleDelete"
            class="voice-item"
          />
        </div>
        
        <!-- 分页控件 -->
        <div v-if="voiceStore.total > voiceStore.pageSize" class="mt-6 flex justify-center">
          <t-pagination
            :total="voiceStore.total"
            :page-size="voiceStore.pageSize"
            :current="voiceStore.currentPage"
            :page-size-options="[10, 20, 50]"
            @page-change="voiceStore.onPageChange"
            @page-size-change="voiceStore.onPageSizeChange"
          />
        </div>
      </div>
    </div>
    
    <!-- 上传音色对话框 -->
    <t-dialog
      v-model:visible="showUploadDialog"
      header="上传新音色"
      :footer="false"
      width="550px"
      @close="resetUploadForm"
    >
      <t-form ref="form" :data="formData" :rules="rules" @submit="handleSubmit">
        <div class="space-y-4">
          <!-- 音色名称 -->
          <FormInput
            id="voice-name"
            v-model="formData.name"
            label="音色名称"
            placeholder="请输入音色名称"
            required
            error=""
            hint="输入一个易于识别的名称"
          />
          
          <!-- 音频文件上传 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <span class="text-red-500 mr-1">*</span>
              音频文件
            </label>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  @click="triggerFileUpload"
                  size="md"
                  :aria-label="'选择音频文件'"
                >
                  <template #icon>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </template>
                  选择音频文件
                </Button>
                
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="hidden" 
                  accept="audio/*" 
                  @change="handleFileChange"
                  aria-label="上传音频文件"
                />
                
                <span v-if="formData.file.length > 0" class="text-sm text-gray-600 dark:text-gray-400">
                  已选择: {{ formData.file[0].name }}
                </span>
              </div>
              
              <div class="flex items-center space-x-2">
                <input 
                  id="autoRecognize" 
                  type="checkbox" 
                  v-model="autoRecognizeText"
                  class="w-4 h-4 text-primary-600 dark:text-primary-500 border-gray-300 dark:border-gray-700 rounded focus:ring-primary-500 dark:focus:ring-primary-600"
                  aria-label="自动识别语音内容"
                />
                <label for="autoRecognize" class="text-sm text-gray-700 dark:text-gray-300">自动识别语音内容</label>
                <span v-if="recognizing" class="ml-2">
                  <svg class="animate-spin h-4 w-4 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </div>
              
              <!-- 音频预览播放器 -->
              <div 
                v-if="audioPreviewUrl" 
                class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
              >
                <div class="flex items-center space-x-3">
                  <button 
                    @click="toggleAudioPlay"
                    class="w-8 h-8 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                    :aria-label="isAudioPlaying ? '暂停' : '播放'"
                  >
                    <svg v-if="!isAudioPlaying" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  
                  <div class="flex-1">
                    <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-primary-600 dark:bg-primary-500" 
                        :style="`width: ${audioProgress}%`"
                      ></div>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>{{ formatTime(currentAudioTime) }}</span>
                      <span>{{ formatTime(totalAudioTime) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p class="text-xs text-gray-500 dark:text-gray-400">
                支持mp3、wav、flac、m4a格式，单个文件不超过30分钟
              </p>
            </div>
          </div>
          
          <!-- 文本内容 -->
          <div class="space-y-2">
            <label for="audio-text" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <span class="text-red-500 mr-1">*</span>
              文本内容
            </label>
            <textarea
              id="audio-text"
              v-model="formData.audioText"
              rows="4"
              class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-white"
              placeholder="请输入此音频的文本内容（用于语音克隆）"
              aria-required="true"
            ></textarea>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              请输入准确的文本内容以提高音色训练效果
            </p>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-3">
            <Button 
              variant="secondary" 
              @click="handleCancelUpload"
            >
              取消
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              :loading="uploading"
            >
              确认上传
            </Button>
          </div>
        </div>
      </t-form>
    </t-dialog>
    
    <!-- 删除确认对话框 -->
    <t-dialog
      v-model:visible="showDeleteDialog"
      header="删除音色"
      :body="'确定要删除音色 「' + (voiceToDelete?.name || '') + '」 吗？'"
      @confirm="confirmDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, h, onMounted, onBeforeUnmount, watch } from 'vue';
import { useVoiceStore } from '@/stores/voice';
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next';
import { Voice } from '@/api/types';
import { saveAudio } from '@/service/voice';
import dayjs from 'dayjs';
import { getAssetUrl } from '@/utils/url';
import { FormInput, Button } from '@/components/ui';
import VoiceCard from './VoiceCard.vue';
import debounce from 'lodash-es/debounce';

// 引入状态管理
const voiceStore = useVoiceStore();

// 搜索关键字
const searchKeyword = ref('');

// 防抖搜索
const debouncedSearch = debounce(() => {
  voiceStore.searchVoice(searchKeyword.value);
}, 300);

// 表单相关状态
const showUploadDialog = ref(false);
const formData = ref({
  name: '',
  file: [] as any[],
  audioText: ''
});

// 文件上传相关
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileUpload = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入音色名称', type: 'error' }],
  file: [{ required: true, message: '请上传音频文件', type: 'error' }],
  audioText: [{ required: true, message: '请输入文本内容', type: 'error' }]
};

// 上传状态
const uploading = ref(false);

// 删除确认
const showDeleteDialog = ref(false);
const voiceToDelete = ref<Voice | null>(null);

// 上传的音频预览
const audioPreviewUrl = ref('');
const isAudioPlaying = ref(false);
const currentAudioTime = ref(0);
const totalAudioTime = ref(0);
const audioProgress = ref(0);
const audioElement = ref<HTMLAudioElement | null>(null);

// 音频识别
const recognizing = ref(false);
const autoRecognizeText = ref(false);

// 初始化
onMounted(() => {
  voiceStore.fetchVoiceList();
  
  // 创建音频元素
  audioElement.value = new Audio();
  audioElement.value.addEventListener('loadedmetadata', handleAudioLoaded);
  audioElement.value.addEventListener('timeupdate', handleTimeUpdate);
  audioElement.value.addEventListener('ended', handleAudioEnded);
});

// 清理监听器
onBeforeUnmount(() => {
  if (audioElement.value) {
    audioElement.value.removeEventListener('loadedmetadata', handleAudioLoaded);
    audioElement.value.removeEventListener('timeupdate', handleTimeUpdate);
    audioElement.value.removeEventListener('ended', handleAudioEnded);
  }
  
  if (audioPreviewUrl.value) {
    URL.revokeObjectURL(audioPreviewUrl.value);
  }
});

// 音频加载完成
const handleAudioLoaded = () => {
  if (audioElement.value) {
    totalAudioTime.value = audioElement.value.duration;
  }
};

// 音频播放进度更新
const handleTimeUpdate = () => {
  if (audioElement.value) {
    currentAudioTime.value = audioElement.value.currentTime;
    audioProgress.value = (currentAudioTime.value / totalAudioTime.value) * 100;
  }
};

// 音频播放结束
const handleAudioEnded = () => {
  isAudioPlaying.value = false;
};

// 切换音频播放状态
const toggleAudioPlay = () => {
  if (!audioElement.value) return;
  
  if (isAudioPlaying.value) {
    audioElement.value.pause();
    isAudioPlaying.value = false;
  } else {
    audioElement.value.play();
    isAudioPlaying.value = true;
  }
};

// 处理文件选择
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    formData.value.file = [{ raw: file, name: file.name }];
    
    // 创建预览URL
    if (audioPreviewUrl.value) {
      URL.revokeObjectURL(audioPreviewUrl.value);
    }
    
    audioPreviewUrl.value = URL.createObjectURL(file);
    
    if (audioElement.value) {
      audioElement.value.src = audioPreviewUrl.value;
    }
    
    // 自动识别文本
    if (autoRecognizeText.value) {
      recognizeAudioText(file);
    }
  }
};

// 识别音频文本
const recognizeAudioText = async (file: File) => {
  try {
    recognizing.value = true;

    // 使用store中的识别方法
    const recognizedText = await voiceStore.recognizeVoiceText(file);

    // 处理识别结果
    if (recognizedText) {
      // 防止覆盖用户已输入的内容
      if (!formData.value.audioText) {
        formData.value.audioText = recognizedText;
        MessagePlugin.success('语音内容识别成功');
      } else {
        // 如果已有内容，使用对话框询问是否替换
        DialogPlugin.confirm({
          header: '替换文本确认',
          body: '检测到您已输入文本内容，是否替换为识别结果？',
          confirmBtn: {
            content: '替换',
            theme: 'primary',
          },
          cancelBtn: '保留现有内容',
          onConfirm: () => {
            formData.value.audioText = recognizedText;
          }
        });
      }
    }
  } catch (error) {
    console.error('语音识别处理失败:', error);
    MessagePlugin.error('语音识别失败，请手动输入文本');
  } finally {
    recognizing.value = false;
  }
};

// 重置上传表单
const resetUploadForm = () => {
  formData.value = {
    name: '',
    file: [],
    audioText: ''
  };
  
  autoRecognizeText.value = false;
  recognizing.value = false;
  
  // 停止音频播放
  if (audioElement.value) {
    audioElement.value.pause();
    audioElement.value.currentTime = 0;
  }
  
  isAudioPlaying.value = false;
  
  // 清理临时URL
  if (audioPreviewUrl.value) {
    URL.revokeObjectURL(audioPreviewUrl.value);
    audioPreviewUrl.value = '';
  }
};

// 取消上传
const handleCancelUpload = () => {
  showUploadDialog.value = false;
  resetUploadForm();
};

// 处理提交
const handleSubmit = async ({ validateResult }: { validateResult: any }) => {
  if (validateResult === true) {
    uploading.value = true;
    
    try {
      // 获取表单数据
      const file = formData.value.file[0].raw as File;
      const name = formData.value.name;
      const audioText = formData.value.audioText;

      // 创建Blob URL以便传给saveAudio
      const blobUrl = URL.createObjectURL(file);

      // 保存音色
      await saveAudio(blobUrl, name, "true", audioText);

      // 刷新音色列表
      await voiceStore.fetchVoiceList();

      // 关闭对话框并重置表单
      showUploadDialog.value = false;
      resetUploadForm();

      // 提示上传成功
      MessagePlugin.success('音色上传成功');
    } catch (error) {
      console.error('上传失败:', error);
      MessagePlugin.error('上传失败，请重试');
    } finally {
      uploading.value = false;
    }
  }
};

// 格式化时间
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// 处理删除音色
const handleDelete = (voice: Voice) => {
  voiceToDelete.value = voice;
  showDeleteDialog.value = true;
};

// 确认删除
const confirmDelete = async () => {
  if (voiceToDelete.value) {
    try {
      await voiceStore.deleteVoice(voiceToDelete.value.id);
      MessagePlugin.success('删除成功');
    } catch (error) {
      console.error('删除失败:', error);
      MessagePlugin.error('删除失败，请重试');
    } finally {
      showDeleteDialog.value = false;
      voiceToDelete.value = null;
    }
  }
};
</script>

<style scoped>
.voice-card-container {
  display: grid;
  gap: 1rem;
}

/* Container Query应用 */
@container voice-grid (max-width: 640px) {
  .voice-card-container {
    grid-template-columns: 1fr;
  }
}

@container voice-grid (min-width: 641px) and (max-width: 1024px) {
  .voice-card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container voice-grid (min-width: 1025px) {
  .voice-card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .voice-management {
    padding: 1rem;
  }
}
</style>
