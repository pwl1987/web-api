<template>
  <Card 
    :clickable="false" 
    containerType="voice" 
    class="voice-card transition-all duration-300 h-full"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate" :title="voice.name">
          {{ voice.name }}
        </h3>
        <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
          {{ formatDate(voice.createdAt) }}
        </span>
      </div>
    </template>
    
    <div class="space-y-4">
      <!-- 音频播放器 -->
      <div class="audio-player-container">
        <div class="relative">
          <audio 
            ref="audioElement"
            :src="getAssetUrl(voice.audioPath)" 
            class="hidden"
            @loadedmetadata="onAudioLoaded" 
            @timeupdate="onTimeUpdate"
            @ended="isPlaying = false"
          ></audio>
          
          <div class="flex items-center space-x-3">
            <button 
              @click="togglePlay"
              class="w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              :aria-label="isPlaying ? '暂停' : '播放'"
              :title="isPlaying ? '暂停' : '播放'"
            >
              <svg v-if="!isPlaying" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <div class="flex-1">
              <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-primary-600 dark:bg-primary-500 transition-all duration-100" 
                  :style="`width: ${progress}%`"
                ></div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{{ formatTime(currentTime) }}</span>
                <span>{{ formatTime(duration) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 文本内容 -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">文本内容:</h4>
        <p 
          class="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md max-h-20 overflow-y-auto"
          :class="{'italic text-gray-400 dark:text-gray-500': !voice.audioText}"
        >
          {{ voice.audioText || '无文本内容' }}
        </p>
      </div>
    </div>
    
    <template #footer>
      <div class="flex justify-end">
        <Button 
          variant="text" 
          size="sm"
          type="button"
          @click="$emit('delete', voice)"
          aria-label="删除音色"
        >
          <template #icon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </template>
          删除
        </Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { getAssetUrl } from '@/utils/url';
import dayjs from 'dayjs';
import { Card, Button } from '@/components/ui';

// 定义音色类型
interface Voice {
  id: string | number;
  name: string;
  audioPath: string;
  audioText?: string;
  createdAt: string | number | Date;
}

const props = defineProps<{
  voice: Voice;
}>();

const emit = defineEmits(['delete']);

// 音频播放逻辑
const audioElement = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const duration = ref(0);
const currentTime = ref(0);
const progress = ref(0);

const onAudioLoaded = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration;
  }
};

const onTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime;
    progress.value = (currentTime.value / duration.value) * 100;
  }
};

const togglePlay = () => {
  if (!audioElement.value) return;
  
  if (isPlaying.value) {
    audioElement.value.pause();
  } else {
    audioElement.value.play();
  }
  
  isPlaying.value = !isPlaying.value;
};

// 格式化时间为分:秒
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// 格式化日期
const formatDate = (date: string | number | Date): string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};

// 清理资源
onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause();
    audioElement.value.src = '';
  }
});
</script>

<style scoped>
/* 自定义音频滑块样式 */
input[type="range"] {
  @apply appearance-none bg-gray-200 dark:bg-gray-700 rounded-full h-2;
}

input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 cursor-pointer;
}

/* 修复滚动条在暗模式下的对比度 */
::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-600;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}
</style> 