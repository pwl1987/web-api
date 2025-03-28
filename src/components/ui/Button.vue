<template>
  <button
    :type="type"
    :class="[
      'transition-all duration-200 inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClasses,
      sizeClasses,
      loading ? 'relative' : '',
      fullWidth ? 'w-full' : '',
      disabled || loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-sm',
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="$emit('click', $event)"
  >
    <!-- 加载指示器 -->
    <div 
      v-if="loading" 
      class="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <svg 
        class="animate-spin h-5 w-5"
        :class="[
          variant === 'primary' ? 'text-white' : 'text-primary-600 dark:text-primary-400'
        ]" 
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle 
          class="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="4"
        ></circle>
        <path 
          class="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    
    <!-- 左侧图标 -->
    <span v-if="$slots.icon && !loading" class="mr-2">
      <slot name="icon"></slot>
    </span>
    
    <!-- 按钮内容 -->
    <span :class="{ 'opacity-0': loading }">
      <slot></slot>
    </span>
    
    <!-- 右侧图标 -->
    <span v-if="$slots.iconRight && !loading" class="ml-2">
      <slot name="iconRight"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600';
    case 'secondary':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600';
    case 'outline':
      return 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20';
    case 'text':
      return 'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/20';
    default:
      return '';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm';
    case 'md':
      return 'px-4 py-2 text-base';
    case 'lg':
      return 'px-5 py-2.5 text-lg';
    default:
      return '';
  }
});
</script> 