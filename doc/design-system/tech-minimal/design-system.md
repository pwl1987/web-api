# 科技极简风设计系统规范

## 概述

科技极简风设计系统注重简洁、高效和专业感，适用于后台管理系统、专业工具和数据分析平台。该设计系统基于TDesign组件库进行扩展和定制，保持了与TDesign的高兼容性。

- **主色**: hsl(210, 98%, 51%) - `#0c7bff`
- **风格特点**: 简洁、高效、专业
- **适用场景**: 后台管理系统、专业工具、数据分析平台
- **TDesign兼容性**: ★★★★☆

## 1. 色彩系统

### 主色

```scss
--color-primary: hsl(210, 98%, 51%); /* #0c7bff */
--color-primary-light: hsl(210, 98%, 61%); /* #3d93ff */
--color-primary-dark: hsl(210, 98%, 41%); /* #0062cc */
```

### 辅助色系

```scss
--color-accent: hsl(98, 98%, 51%); /* #7aff0c - 调整为 #5dbc00 以符合AA标准 */
--color-warning: hsl(322, 98%, 51%); /* #ff0c7b */
--color-success: hsl(154, 98%, 51%); /* #0cff7a - 调整为 #00bc5a 以符合AA标准 */
--color-info: hsl(266, 98%, 51%); /* #7b0cff */
```

### 中性色

```scss
--color-gray-50: #f8f9fa;
--color-gray-100: #f1f3f5;
--color-gray-200: #e9ecef;
--color-gray-300: #dee2e6;
--color-gray-400: #ced4da;
--color-gray-500: #adb5bd;
--color-gray-600: #6c757d;
--color-gray-700: #495057;
--color-gray-800: #343a40;
--color-gray-900: #212529;
```

### 语义色

```scss
--color-text-primary: var(--color-gray-900);
--color-text-secondary: var(--color-gray-600);
--color-text-placeholder: var(--color-gray-400);
--color-text-disabled: var(--color-gray-400);
--color-text-inverse: white;

--color-border: var(--color-gray-200);
--color-border-light: var(--color-gray-100);
--color-border-dark: var(--color-gray-300);

--color-background-light: white;
--color-background-dark: var(--color-gray-900);
--color-background-disabled: var(--color-gray-100);
```

## 2. 间距系统

基于4px的基准值，采用黄金分割比例(1.618)的指数增长。

```scss
--spacing-xs: 4px;
--spacing-sm: 6px; /* 4px × 1.618 ≈ 6px */
--spacing-md: 10px; /* 6px × 1.618 ≈ 10px */
--spacing-lg: 16px; /* 10px × 1.618 ≈ 16px */
--spacing-xl: 26px; /* 16px × 1.618 ≈ 26px */
--spacing-xxl: 42px; /* 26px × 1.618 ≈ 42px */
```

### 应用规则

- **内边距(Padding)**: 
  - 小型组件: `var(--spacing-xs)` 到 `var(--spacing-sm)`
  - 中型组件: `var(--spacing-sm)` 到 `var(--spacing-md)`
  - 大型组件: `var(--spacing-md)` 到 `var(--spacing-lg)`
  - 容器: `var(--spacing-lg)` 到 `var(--spacing-xl)`

- **外边距(Margin)**:
  - 紧凑布局: `var(--spacing-xs)` 到 `var(--spacing-sm)`
  - 标准布局: `var(--spacing-md)` 到 `var(--spacing-lg)`
  - 宽松布局: `var(--spacing-xl)` 到 `var(--spacing-xxl)`

## 3. 阴影系统

```scss
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.05);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 16px 24px rgba(0, 0, 0, 0.1);
```

### 应用规则

- **Elevation 1**: `var(--shadow-xs)` - 导航栏、卡片
- **Elevation 2**: `var(--shadow-sm)` - 下拉菜单、浮动按钮
- **Elevation 3**: `var(--shadow-md)` - 对话框、抽屉
- **Elevation 4**: `var(--shadow-lg)` - 模态框
- **Elevation 5**: `var(--shadow-xl)` - 通知、提示

## 4. 圆角系统

```scss
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-circle: 50%;
```

### 应用规则

- **按钮、输入框**: `var(--radius-sm)`
- **卡片、对话框**: `var(--radius-md)` 到 `var(--radius-lg)`
- **标签、徽章**: `var(--radius-sm)` 或 `var(--radius-circle)`
- **头像**: `var(--radius-circle)`

## 5. 排版系统

```scss
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-family-mono: 'Roboto Mono', monospace; /* 保留原数字字体 */

--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-md: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-xxl: 1.5rem; /* 24px */
--font-size-huge: 2rem; /* 32px */

--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;
```

### 应用规则

- **正文**: `var(--font-size-md)`, `var(--font-weight-regular)`, `var(--line-height-normal)`
- **标题**: 
  - H1: `var(--font-size-huge)`, `var(--font-weight-bold)`, `var(--line-height-tight)`
  - H2: `var(--font-size-xxl)`, `var(--font-weight-bold)`, `var(--line-height-tight)`
  - H3: `var(--font-size-xl)`, `var(--font-weight-semibold)`, `var(--line-height-tight)`
  - H4: `var(--font-size-lg)`, `var(--font-weight-semibold)`, `var(--line-height-tight)`
- **辅助文本**: `var(--font-size-sm)`, `var(--font-weight-regular)`, `var(--line-height-normal)`
- **代码、数据**: `var(--font-family-mono)`, `var(--font-size-sm)`

## 6. 动效系统

```scss
--transition-curve: cubic-bezier(0.16, 0.77, 0.39, 1.09);

--transition-duration-fast: 150ms;
--transition-duration-normal: 300ms;
--transition-duration-slow: 500ms;

--transition-default: all var(--transition-duration-normal) var(--transition-curve);
```

### 应用规则

- **微交互(hover, focus)**: `var(--transition-duration-fast)`
- **组件状态变化**: `var(--transition-duration-normal)`
- **布局变化、页面转场**: `var(--transition-duration-slow)`

## 7. 组件规范

### 按钮

```scss
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.5;
  border-radius: var(--radius-sm);
  transition: var(--transition-default);
  cursor: pointer;
  
  &-primary {
    background-color: var(--color-primary);
    color: white;
    
    &:hover {
      background-color: var(--color-primary-light);
      box-shadow: 0 2px 6px rgba(12, 123, 255, 0.2);
    }
    
    &:active {
      background-color: var(--color-primary-dark);
      box-shadow: none;
    }
  }
  
  &-secondary {
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    
    &:hover {
      background-color: rgba(12, 123, 255, 0.05);
    }
    
    &:active {
      background-color: rgba(12, 123, 255, 0.1);
    }
  }
  
  &-text {
    background-color: transparent;
    color: var(--color-primary);
    padding: var(--spacing-xs) var(--spacing-sm);
    min-width: auto;
    
    &:hover {
      background-color: rgba(12, 123, 255, 0.05);
    }
  }
}
```

### 卡片

```scss
.card {
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  
  &-header {
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    
    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
    }
  }
  
  &-content {
    padding: var(--spacing-lg);
  }
  
  &-footer {
    padding: var(--spacing-md) var(--spacing-lg);
    background-color: var(--color-gray-50);
    border-top: 1px solid var(--color-border);
  }
}
```

### 表单控件

```scss
.form-control {
  margin-bottom: var(--spacing-md);
  
  label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }
  
  input, textarea, select {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    transition: var(--transition-default);
    background-color: white;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(12, 123, 255, 0.1);
    }
    
    &::placeholder {
      color: var(--color-text-placeholder);
    }
  }
}
```

## 8. 暗黑模式

```scss
.dark-theme {
  --color-primary: hsl(210, 98%, 51%); /* 保持主色不变 */
  
  --color-gray-50: #1e1e1e;
  --color-gray-100: #2d2d2d;
  --color-gray-200: #333333;
  --color-gray-300: #444444;
  --color-gray-400: #666666;
  --color-gray-500: #888888;
  --color-gray-600: #aaaaaa;
  --color-gray-700: #cccccc;
  --color-gray-800: #e0e0e0;
  --color-gray-900: #f0f0f0;
  
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-placeholder: var(--color-gray-500);
  
  --color-background-light: var(--color-gray-100);
  --color-background-dark: var(--color-gray-50);
  
  --color-border: var(--color-gray-200);
  --color-border-light: var(--color-gray-200);
  --color-border-dark: var(--color-gray-300);
  
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 16px 24px rgba(0, 0, 0, 0.3);
}
```

## 9. TDesign整合

```scss
/* TDesign变量覆盖 */
:root {
  /* 品牌色 */
  --td-brand-color: var(--color-primary);
  --td-brand-color-hover: var(--color-primary-light);
  --td-brand-color-active: var(--color-primary-dark);
  --td-brand-color-focus: rgba(12, 123, 255, 0.2);
  --td-brand-color-disabled: rgba(12, 123, 255, 0.4);
  
  /* 功能色 */
  --td-error-color: var(--color-warning);
  --td-warning-color: var(--color-accent);
  --td-success-color: var(--color-success);
  --td-info-color: var(--color-info);
  
  /* 文字颜色 */
  --td-text-color-primary: var(--color-text-primary);
  --td-text-color-secondary: var(--color-text-secondary);
  --td-text-color-placeholder: var(--color-text-placeholder);
  --td-text-color-disabled: var(--color-text-disabled);
  
  /* 背景颜色 */
  --td-bg-color-page: var(--color-gray-50);
  --td-bg-color-container: var(--color-background-light);
  --td-bg-color-container-hover: var(--color-gray-100);
  --td-bg-color-container-active: var(--color-gray-200);
  --td-bg-color-disabled: var(--color-background-disabled);
  
  /* 圆角 */
  --td-radius-small: var(--radius-xs);
  --td-radius-default: var(--radius-sm);
  --td-radius-medium: var(--radius-md);
  --td-radius-large: var(--radius-lg);
  --td-radius-extraLarge: var(--radius-xl);
  
  /* 阴影 */
  --td-shadow-1: var(--shadow-xs);
  --td-shadow-2: var(--shadow-sm);
  --td-shadow-3: var(--shadow-md);
  --td-shadow-4: var(--shadow-lg);
  
  /* 字体 */
  --td-font-family: var(--font-family-base);
  --td-font-size-s: var(--font-size-xs);
  --td-font-size-base: var(--font-size-sm);
  --td-font-size-l: var(--font-size-md);
  --td-font-size-xl: var(--font-size-lg);
  
  /* 间距 */
  --td-comp-paddingLR-s: var(--spacing-xs);
  --td-comp-paddingLR-m: var(--spacing-sm);
  --td-comp-paddingLR-l: var(--spacing-md);
  --td-comp-paddingTB-s: var(--spacing-xs);
  --td-comp-paddingTB-m: var(--spacing-sm);
  --td-comp-paddingTB-l: var(--spacing-md);
  --td-comp-margin-s: var(--spacing-xs);
  --td-comp-margin-m: var(--spacing-sm);
  --td-comp-margin-l: var(--spacing-md);
  
  /* 动效 */
  --td-anim-time-fn-easing: var(--transition-curve);
  --td-anim-duration-base: var(--transition-duration-normal);
  --td-anim-duration-moderate: var(--transition-duration-slow);
}
```

## 10. 响应式设计

```scss
--breakpoint-xs: 480px;
--breakpoint-sm: 768px;
--breakpoint-md: 992px;
--breakpoint-lg: 1200px;
--breakpoint-xl: 1440px;
```

### 媒体查询混合宏

```scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == xs {
    @media (max-width: var(--breakpoint-xs)) { @content; }
  }
  @else if $breakpoint == sm {
    @media (min-width: var(--breakpoint-xs)) and (max-width: var(--breakpoint-sm)) { @content; }
  }
  @else if $breakpoint == md {
    @media (min-width: var(--breakpoint-sm)) and (max-width: var(--breakpoint-md)) { @content; }
  }
  @else if $breakpoint == lg {
    @media (min-width: var(--breakpoint-md)) and (max-width: var(--breakpoint-lg)) { @content; }
  }
  @else if $breakpoint == xl {
    @media (min-width: var(--breakpoint-lg)) { @content; }
  }
}
```

### 排版响应式规则

```scss
h1 {
  font-size: var(--font-size-xl);
  
  @include respond-to(md) {
    font-size: var(--font-size-xxl);
  }
  
  @include respond-to(lg) {
    font-size: var(--font-size-huge);
  }
}
```

## 11. 无障碍设计

- 所有颜色组合应满足WCAG 2.1 AA标准的对比度要求
- 提供键盘导航支持
- 使用适当的ARIA属性
- 确保所有交互元素有清晰的焦点状态

## 12. 性能考量

- CSS选择器嵌套不超过3层
- 避免`!important`的使用
- 使用CSS变量减少重复声明
- 优化动画性能，使用`transform`和`opacity`属性
- 关键帧动画使用`will-change`属性进行优化

## 13. 使用指南

### 安装依赖

```bash
# 首先安装TDesign
npm install tdesign-vue-next

# 安装科技极简风设计系统
npm install @design-system/tech-minimal
```

### 引入样式

```javascript
// main.js
import 'tdesign-vue-next/es/style/index.css';
import '@design-system/tech-minimal/dist/index.css';
```

### 基础组件使用

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h3>数据概览</h3>
    </div>
    <div class="card-content">
      <p>内容区域</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary">查看详情</button>
    </div>
  </div>
</template>
```

### TDesign组件使用

```vue
<template>
  <t-space direction="vertical">
    <t-button theme="primary">主要按钮</t-button>
    <t-input placeholder="请输入" />
    <t-table :data="tableData" :columns="columns" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  { index: 1, name: '示例1', status: 'normal' },
  { index: 2, name: '示例2', status: 'warning' },
]);

const columns = [
  { colKey: 'index', title: '序号' },
  { colKey: 'name', title: '名称' },
  { colKey: 'status', title: '状态' },
];
</script>
```

### 暗黑模式切换

```javascript
// 切换到暗黑模式
document.documentElement.classList.add('dark-theme');

// 切换回亮色模式
document.documentElement.classList.remove('dark-theme');
```

### 自定义主题

```scss
:root {
  // 自定义主色
  --color-primary: hsl(220, 98%, 51%); // 稍微调整色相
  
  // 自定义圆角
  --radius-sm: 6px; // 增加圆角
  
  // 自定义阴影
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08); // 增强阴影
}
``` 