<template>
  <div class="form-group">
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
    >
      <span v-if="required" class="text-red-500 mr-1">*</span>
      {{ label }}
    </label>
    
    <div class="relative">
      <input 
        :id="id" 
        :type="type" 
        class="w-full px-3 py-2 rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
        :class="[
          error ? 'border-red-500 dark:border-red-500 focus:ring-red-500' : '',
          iconLeft ? 'pl-10' : '',
          iconRight ? 'pr-10' : '',
        ]"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="error || hint ? `${id}-description` : undefined"
      />
      
      <!-- 左侧图标 -->
      <div 
        v-if="iconLeft" 
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400"
      >
        <slot name="icon-left"></slot>
      </div>
      
      <!-- 右侧图标 -->
      <div 
        v-if="iconRight" 
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        :class="{ 'pointer-events-none': !clickableIcon }"
      >
        <slot name="icon-right"></slot>
      </div>
    </div>
    
    <!-- 错误信息或提示文本 -->
    <div 
      v-if="error || hint" 
      :id="`${id}-description`" 
      class="mt-1 text-sm"
      :class="error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'"
    >
      {{ error || hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  iconLeft: {
    type: Boolean,
    default: false
  },
  iconRight: {
    type: Boolean,
    default: false
  },
  clickableIcon: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
/* 使用Container Query可以根据父容器尺寸调整输入框样式 */
@container (max-width: 640px) {
  input {
    @apply text-sm py-1.5;
  }
  
  .form-group {
    @apply mb-3;
  }
}

/* 焦点状态键盘导航增强 */
input:focus-visible {
  @apply ring-2 ring-offset-0 outline-none;
}
</style> 