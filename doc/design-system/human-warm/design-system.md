# 人文温暖风设计系统规范

## 概述

人文温暖风设计系统注重亲和力、温暖感和人文关怀，适用于社交媒体、教育平台和健康应用。该设计系统基于TDesign组件库进行扩展和定制，保持了与TDesign的良好兼容性。

- **主色**: hsl(38, 92%, 62%) - `#f9b846`
- **风格特点**: 温暖、友好、亲和力
- **适用场景**: 社交媒体、教育平台、健康应用
- **TDesign兼容性**: ★★★★☆

## 1. 色彩系统

### 主色

```scss
--color-primary: hsl(38, 92%, 62%); /* #f9b846 */
--color-primary-light: hsl(38, 92%, 72%); /* #fac978 */
--color-primary-dark: hsl(38, 92%, 52%); /* #e9a01e */
```

### 辅助色系

```scss
--color-accent: hsl(356, 73%, 59%); /* #e34e54 */
--color-warning: hsl(14, 98%, 67%); /* #fe7744 */
--color-success: hsl(162, 72%, 46%); /* #19c497 */
--color-info: hsl(212, 72%, 59%); /* #4887db */
```

### 中性色

```scss
--color-brown-50: #fdf8f3;
--color-brown-100: #faeee4;
--color-brown-200: #f6e0d0;
--color-brown-300: #efceb6;
--color-brown-400: #e5b796;
--color-brown-500: #d49a72;
--color-brown-600: #b6805f;
--color-brown-700: #95604a;
--color-brown-800: #724837;
--color-brown-900: #5a3829;
```

### 语义色

```scss
--color-text-primary: var(--color-brown-900);
--color-text-secondary: var(--color-brown-700);
--color-text-placeholder: var(--color-brown-400);
--color-text-disabled: var(--color-brown-300);
--color-text-inverse: white;

--color-border: var(--color-brown-200);
--color-border-light: var(--color-brown-100);
--color-border-dark: var(--color-brown-300);

--color-background-light: white;
--color-background-warm: var(--color-brown-50);
--color-background-disabled: var(--color-brown-100);
```

## 2. 间距系统

基于8px的基准值，采用线性增长。

```scss
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-xxl: 48px;
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
--shadow-xs: 0 2px 4px rgba(214, 158, 105, 0.08);
--shadow-sm: 0 4px 8px rgba(214, 158, 105, 0.1);
--shadow-md: 0 6px 16px rgba(214, 158, 105, 0.12);
--shadow-lg: 0 8px 24px rgba(214, 158, 105, 0.15);
--shadow-xl: 0 12px 32px rgba(214, 158, 105, 0.18);
```

### 应用规则

- **Elevation 1**: `var(--shadow-xs)` - 导航栏、卡片
- **Elevation 2**: `var(--shadow-sm)` - 下拉菜单、浮动按钮
- **Elevation 3**: `var(--shadow-md)` - 对话框、抽屉
- **Elevation 4**: `var(--shadow-lg)` - 模态框
- **Elevation 5**: `var(--shadow-xl)` - 通知、提示

## 4. 圆角系统

```scss
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-circle: 50%;
--radius-pill: 9999px;
```

### 应用规则

- **按钮**: `var(--radius-pill)` 或 `var(--radius-md)`
- **输入框**: `var(--radius-md)`
- **卡片、对话框**: `var(--radius-lg)` 到 `var(--radius-xl)`
- **标签、徽章**: `var(--radius-pill)` 或 `var(--radius-sm)`
- **头像**: `var(--radius-circle)`

## 5. 排版系统

```scss
--font-family-base: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-family-display: 'Playfair Display', Georgia, serif; /* 用于特殊标题 */

--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-md: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-xxl: 1.5rem; /* 24px */
--font-size-huge: 2rem; /* 32px */
--font-size-display: 2.5rem; /* 40px */

--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 600;
--font-weight-bold: 700;

--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;
```

### 应用规则

- **正文**: `var(--font-size-md)`, `var(--font-weight-regular)`, `var(--line-height-relaxed)`
- **标题**: 
  - H1: `var(--font-size-huge)` 或 `var(--font-size-display)`, `var(--font-weight-bold)`, `var(--line-height-tight)`
  - H2: `var(--font-size-xxl)`, `var(--font-weight-bold)`, `var(--line-height-tight)`
  - H3: `var(--font-size-xl)`, `var(--font-weight-medium)`, `var(--line-height-tight)`
  - H4: `var(--font-size-lg)`, `var(--font-weight-medium)`, `var(--line-height-tight)`
- **辅助文本**: `var(--font-size-sm)`, `var(--font-weight-regular)`, `var(--line-height-normal)`
- **装饰性标题**: `var(--font-family-display)`, `var(--font-size-display)`, `var(--font-weight-bold)`

## 6. 动效系统

```scss
--transition-curve: cubic-bezier(0.25, 0.1, 0.25, 1);

--transition-duration-fast: 200ms;
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
  min-width: 100px;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  line-height: 1.5;
  border-radius: var(--radius-pill);
  transition: var(--transition-default);
  cursor: pointer;
  
  &-primary {
    background-color: var(--color-primary);
    color: var(--color-brown-900);
    
    &:hover {
      background-color: var(--color-primary-light);
      box-shadow: var(--shadow-sm);
      transform: translateY(-1px);
    }
    
    &:active {
      background-color: var(--color-primary-dark);
      box-shadow: none;
      transform: translateY(0);
    }
  }
  
  &-secondary {
    background-color: transparent;
    color: var(--color-brown-700);
    border: 2px solid var(--color-primary);
    
    &:hover {
      background-color: rgba(249, 184, 70, 0.1);
      color: var(--color-brown-900);
    }
    
    &:active {
      background-color: rgba(249, 184, 70, 0.2);
    }
  }
  
  &-text {
    background-color: transparent;
    color: var(--color-brown-700);
    padding: var(--spacing-xs) var(--spacing-sm);
    min-width: auto;
    
    &:hover {
      color: var(--color-primary-dark);
      text-decoration: underline;
    }
  }
}
```

### 卡片

```scss
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition-default);
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  &-header {
    padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-sm);
    
    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-medium);
      color: var(--color-brown-900);
    }
  }
  
  &-content {
    padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-lg);
    color: var(--color-brown-700);
  }
  
  &-footer {
    padding: var(--spacing-md) var(--spacing-lg);
    background-color: var(--color-brown-50);
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
    color: var(--color-brown-700);
  }
  
  input, textarea, select {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-md);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    transition: var(--transition-default);
    background-color: white;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(249, 184, 70, 0.2);
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
  --color-primary: hsl(38, 92%, 62%); /* 保持主色不变 */
  
  --color-brown-50: #2d2825;
  --color-brown-100: #3a342f;
  --color-brown-200: #4a423c;
  --color-brown-300: #5d5349;
  --color-brown-400: #6e6359;
  --color-brown-500: #857a6e;
  --color-brown-600: #9e9187;
  --color-brown-700: #b8aca1;
  --color-brown-800: #d2c8be;
  --color-brown-900: #ede7e0;
  
  --color-text-primary: var(--color-brown-900);
  --color-text-secondary: var(--color-brown-700);
  --color-text-placeholder: var(--color-brown-500);
  
  --color-background-light: var(--color-brown-100);
  --color-background-warm: var(--color-brown-50);
  
  --color-border: var(--color-brown-300);
  --color-border-light: var(--color-brown-200);
  --color-border-dark: var(--color-brown-400);
  
  --shadow-xs: 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-sm: 0 4px 8px rgba(0, 0, 0, 0.25);
  --shadow-md: 0 6px 16px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.35);
  --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.4);
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
  --td-brand-color-focus: rgba(249, 184, 70, 0.2);
  --td-brand-color-disabled: rgba(249, 184, 70, 0.4);
  
  /* 功能色 */
  --td-error-color: var(--color-accent);
  --td-warning-color: var(--color-warning);
  --td-success-color: var(--color-success);
  --td-info-color: var(--color-info);
  
  /* 文字颜色 */
  --td-text-color-primary: var(--color-text-primary);
  --td-text-color-secondary: var(--color-text-secondary);
  --td-text-color-placeholder: var(--color-text-placeholder);
  --td-text-color-disabled: var(--color-text-disabled);
  
  /* 背景颜色 */
  --td-bg-color-page: var(--color-background-warm);
  --td-bg-color-container: var(--color-background-light);
  --td-bg-color-container-hover: var(--color-brown-100);
  --td-bg-color-container-active: var(--color-brown-200);
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
  font-size: var(--font-size-xxl);
  
  @include respond-to(md) {
    font-size: var(--font-size-huge);
  }
  
  @include respond-to(lg) {
    font-size: var(--font-size-display);
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

# 安装人文温暖风设计系统
npm install @design-system/human-warm
```

### 引入样式

```javascript
// main.js
import 'tdesign-vue-next/es/style/index.css';
import '@design-system/human-warm/dist/index.css';
```

### 基础组件使用

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h3>用户反馈</h3>
    </div>
    <div class="card-content">
      <p>非常感谢您的使用和支持！</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary">提交反馈</button>
    </div>
  </div>
</template>
```

### TDesign组件使用

```vue
<template>
  <t-space direction="vertical">
    <t-button theme="primary">注册账号</t-button>
    <t-input placeholder="请输入您的名字" />
    <t-date-picker placeholder="请选择日期" />
  </t-space>
</template>
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
  --color-primary: hsl(45, 92%, 62%); // 调整色相
  
  // 自定义圆角
  --radius-md: 16px; // 增加圆角
  
  // 自定义阴影
  --shadow-md: 0 6px 20px rgba(214, 158, 105, 0.15); // 增强阴影
}
``` 