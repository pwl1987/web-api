<template>
  <button
    :class="[
      'dd-button',
      type,
      { 
        'disabled': disabled,
        'block': block,
        'loading': loading
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-icon">
      <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
/**
 * 数据驱动风格按钮组件
 * @prop {string} type - 按钮类型，可选值：primary, secondary, text
 * @prop {boolean} disabled - 是否禁用
 * @prop {boolean} loading - 是否显示加载状态
 * @prop {boolean} block - 是否为块级按钮
 * @emits {click} - 点击事件
 */
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value: string) => {
      return ['primary', 'secondary', 'text'].includes(value)
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style scoped>
.dd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--td-border-radius);
  font-weight: 500;
  font-size: 14px;
  padding: 0 var(--td-spacing-4);
  height: var(--td-comp-size-m);
  transition: all var(--td-anim-duration-base) var(--td-anim-time-fn-easing);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.dd-button.block {
  display: flex;
  width: 100%;
}

/* 主要按钮 */
.dd-button.primary {
  background-color: var(--td-primary-color);
  color: white;
}

.dd-button.primary:hover:not(.disabled, .loading) {
  background-color: var(--td-primary-color-hover);
}

.dd-button.primary:active:not(.disabled, .loading) {
  background-color: var(--td-primary-color-active);
}

/* 次要按钮 */
.dd-button.secondary {
  background-color: var(--td-bg-color-container-hover);
  color: var(--td-text-color-primary);
}

.dd-button.secondary:hover:not(.disabled, .loading) {
  background-color: var(--td-bg-color-container-active);
}

/* 文本按钮 */
.dd-button.text {
  background-color: transparent;
  color: var(--td-text-color-primary);
  padding: 0 var(--td-spacing-2);
}

.dd-button.text:hover:not(.disabled, .loading) {
  color: var(--td-primary-color);
  background-color: var(--td-bg-color-container-hover);
}

/* 禁用状态 */
.dd-button.disabled {
  background-color: var(--td-bg-color-container-hover);
  color: var(--td-text-color-disabled);
  cursor: not-allowed;
}

.dd-button.primary.disabled {
  background-color: var(--td-primary-color-disabled);
  color: white;
}

/* 加载状态 */
.dd-button.loading {
  cursor: default;
}

.loading-icon {
  display: inline-flex;
  align-items: center;
}

/* 暗黑模式适配 */
:global(.dark-mode) .dd-button.secondary {
  background-color: rgba(255, 255, 255, 0.08);
}

:global(.dark-mode) .dd-button.secondary:hover:not(.disabled, .loading) {
  background-color: rgba(255, 255, 255, 0.12);
}

:global(.dark-mode) .dd-button.text:hover:not(.disabled, .loading) {
  background-color: rgba(255, 255, 255, 0.08);
}
</style> 