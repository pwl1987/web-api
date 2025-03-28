<template>
  <div 
    class="card bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300"
    :class="[
      elevated ? 'shadow-md' : 'shadow-sm hover:shadow-md',
      clickable ? 'cursor-pointer' : '',
      containerClasses
    ]"
    :data-container-type="containerType"
    :tabindex="clickable ? 0 : undefined"
    @click="clickable ? $emit('click') : undefined"
    @keydown.enter="clickable ? $emit('click') : undefined"
  >
    <!-- 卡片头部 -->
    <div 
      v-if="$slots.header" 
      class="card-header px-6 py-4 border-b border-gray-200 dark:border-gray-700"
    >
      <slot name="header"></slot>
    </div>
    
    <!-- 卡片图片 -->
    <div v-if="$slots.image" class="card-image">
      <slot name="image"></slot>
    </div>
    
    <!-- 卡片内容 -->
    <div class="card-body p-6">
      <slot></slot>
    </div>
    
    <!-- 卡片脚注 -->
    <div 
      v-if="$slots.footer" 
      class="card-footer px-6 py-4 border-t border-gray-200 dark:border-gray-700"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  elevated: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  },
  // 用于Container Query样式选择
  containerType: {
    type: String,
    default: 'default'
  },
  // 卡片布局方式
  layout: {
    type: String,
    default: 'vertical',
    validator: (value: string) => ['vertical', 'horizontal'].includes(value)
  }
});

defineEmits(['click']);

// 根据布局类型计算容器类
const containerClasses = computed(() => {
  if (props.layout === 'horizontal') {
    return 'card-horizontal md:flex md:flex-row';
  }
  return '';
});
</script>

<style scoped>
/* 使用Container Query优化卡片布局 */
.card {
  container-type: inline-size;
  container-name: card;
}

/* 卡片焦点状态 */
.card[tabindex="0"]:focus {
  @apply outline-none ring-2 ring-primary-500;
}

/* 水平卡片的响应式布局 */
.card-horizontal .card-image {
  @apply w-full;
}

@container card (min-width: 400px) {
  .card-horizontal {
    @apply flex flex-row;
  }
  
  .card-horizontal .card-image {
    @apply w-1/3 flex-shrink-0;
  }
  
  .card-horizontal .card-body {
    @apply flex-grow;
  }
}

/* 容器查询 - 较小容器时的紧凑布局 */
@container card (max-width: 300px) {
  .card-body {
    @apply p-4;
  }
  
  .card-header, .card-footer {
    @apply px-4 py-3;
  }
}

/* 根据容器类型的特定样式 */
[data-container-type="model"] {
  @apply bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900;
}

[data-container-type="voice"] {
  @apply bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20;
}
</style> 