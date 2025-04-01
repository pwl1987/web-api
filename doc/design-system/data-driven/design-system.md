# 数据驱动风设计系统规范

## 概述

数据驱动风设计系统注重清晰、高效和数据可视化，适用于数据分析平台、监控仪表盘和企业级应用。该设计系统基于TDesign组件库进行扩展和定制，保持了与TDesign的高度兼容性。

- **主色**: hsl(332, 85%, 51%) - `#ec1f73`
- **风格特点**: 精确、高效、数据导向
- **适用场景**: 数据分析工具、监控仪表盘、企业级应用
- **TDesign兼容性**: ★★★★★

## 1. 色彩系统

### 主色

```scss
--color-primary: hsl(332, 85%, 51%); /* #ec1f73 */
--color-primary-light: hsl(332, 85%, 61%); /* #ef4b8f */
--color-primary-dark: hsl(332, 85%, 41%); /* #c30c5b */
```

### 辅助色系

```scss
--color-accent: hsl(190, 90%, 48%); /* #14c8f0 */
--color-warning: hsl(32, 95%, 56%); /* #f89822 */
--color-success: hsl(151, 90%, 42%); /* #0dc971 */
--color-info: hsl(215, 90%, 52%); /* #1174fb */
```

### 数据可视化色彩

```scss
--color-chart-1: var(--color-primary); /* #ec1f73 */
--color-chart-2: var(--color-accent); /* #14c8f0 */
--color-chart-3: var(--color-success); /* #0dc971 */
--color-chart-4: var(--color-warning); /* #f89822 */
--color-chart-5: hsl(272, 90%, 52%); /* #8514fb */
--color-chart-6: hsl(220, 95%, 65%); /* #4b87ff */
--color-chart-7: hsl(16, 95%, 56%); /* #f85622 */
--color-chart-8: hsl(175, 90%, 42%); /* #0dc9a8 */
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

基于4px的网格系统，严格按照2的幂次方增长，确保精确对齐。

```scss
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 32px;
--spacing-xl: 64px;
--spacing-xxl: 128px;
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

精简的阴影系统，注重功能性和层次感。

```scss
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.05);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.1);
```

### 应用规则

- **Elevation 1**: `var(--shadow-xs)` - 导航栏、卡片
- **Elevation 2**: `var(--shadow-sm)` - 下拉菜单、浮动按钮
- **Elevation 3**: `var(--shadow-md)` - 对话框、抽屉
- **Elevation 4**: `var(--shadow-lg)` - 模态框
- **Elevation 5**: `var(--shadow-xl)` - 通知、提示

## 4. 圆角系统

保守的圆角设计，强调直线和方正感。

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
- **卡片、对话框**: `var(--radius-md)`
- **标签、徽章**: `var(--radius-sm)` 或 `var(--radius-circle)`
- **头像**: `var(--radius-circle)`

## 5. 排版系统

强调可读性和数据展示的排版系统。

```scss
--font-family-base: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-family-mono: 'IBM Plex Mono', monospace; /* 用于代码和数据展示 */

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
- **数据标签**: `var(--font-size-sm)`, `var(--font-weight-medium)`, `var(--line-height-tight)`
- **代码、数据**: `var(--font-family-mono)`, `var(--font-size-sm)`

## 6. 动效系统

克制的动效系统，注重功能性和高效反馈。

```scss
--transition-curve: cubic-bezier(0.25, 0.1, 0.25, 1);

--transition-duration-fast: 150ms;
--transition-duration-normal: 250ms;
--transition-duration-slow: 350ms;

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
  padding: var(--spacing-sm) var(--spacing-md);
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
    }
    
    &:active {
      background-color: var(--color-primary-dark);
    }
  }
  
  &-secondary {
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    
    &:hover {
      background-color: rgba(236, 31, 115, 0.05);
    }
    
    &:active {
      background-color: rgba(236, 31, 115, 0.1);
    }
  }
  
  &-text {
    background-color: transparent;
    color: var(--color-primary);
    padding: var(--spacing-xs) var(--spacing-sm);
    min-width: auto;
    
    &:hover {
      background-color: rgba(236, 31, 115, 0.05);
    }
  }
}
```

### 数据卡片

```scss
.data-card {
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  
  &-header {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
    
    h3 {
      margin: 0;
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
    }
  }
  
  &-content {
    padding: var(--spacing-md);
  }
  
  &-metric {
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
    margin: var(--spacing-sm) 0;
  }
  
  &-footer {
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--color-gray-50);
    border-top: 1px solid var(--color-border);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}
```

### 数据表格

```scss
.data-table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: var(--spacing-sm) var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }
  
  th {
    font-weight: var(--font-weight-medium);
    background-color: var(--color-gray-50);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
  
  td {
    font-size: var(--font-size-sm);
    
    &.numeric {
      font-family: var(--font-family-mono);
      text-align: right;
    }
  }
  
  tr:hover {
    background-color: var(--color-gray-50);
  }
  
  .status-positive {
    color: var(--color-success);
  }
  
  .status-warning {
    color: var(--color-warning);
  }
  
  .status-negative {
    color: var(--color-primary);
  }
}
```

## 8. 暗黑模式

```scss
.dark-theme {
  --color-primary: hsl(332, 85%, 51%); /* 保持主色不变 */
  
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
  --shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.3);
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
  --td-brand-color-focus: rgba(236, 31, 115, 0.2);
  --td-brand-color-disabled: rgba(236, 31, 115, 0.4);
  
  /* 功能色 */
  --td-error-color: var(--color-primary); /* 使用主色作为错误色 */
  --td-warning-color: var(--color-warning);
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

### 数据可视化响应式调整

```scss
.chart-container {
  height: 320px;
  
  @include respond-to(xs) {
    height: 240px;
  }
  
  @include respond-to(md) {
    height: 360px;
  }
  
  @include respond-to(xl) {
    height: 420px;
  }
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  
  @include respond-to(xs) {
    grid-template-columns: 1fr;
  }
  
  @include respond-to(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to(lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 11. 数据可视化规范

### 图表配色

```scss
:root {
  /* 添加到全局变量中 */
  --chart-colors: var(--color-chart-1), var(--color-chart-2), var(--color-chart-3), 
    var(--color-chart-4), var(--color-chart-5), var(--color-chart-6), 
    var(--color-chart-7), var(--color-chart-8);
  
  --chart-axis-color: var(--color-gray-400);
  --chart-grid-color: var(--color-gray-200);
  --chart-label-color: var(--color-text-secondary);
  --chart-title-color: var(--color-text-primary);
}

/* 图表混合宏示例 */
@mixin chart-base-styles {
  .axis {
    stroke: var(--chart-axis-color);
    
    text {
      fill: var(--chart-label-color);
      font-size: var(--font-size-xs);
      font-family: var(--font-family-mono);
    }
  }
  
  .grid line {
    stroke: var(--chart-grid-color);
    stroke-opacity: 0.5;
    stroke-dasharray: 4 2;
  }
  
  .chart-title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    fill: var(--chart-title-color);
  }
}
```

### 数据标记样式

```scss
.data-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-mono);
  border-radius: var(--radius-sm);
  
  &-positive {
    background-color: rgba(13, 201, 113, 0.1);
    color: var(--color-success);
  }
  
  &-warning {
    background-color: rgba(248, 152, 34, 0.1);
    color: var(--color-warning);
  }
  
  &-negative {
    background-color: rgba(236, 31, 115, 0.1);
    color: var(--color-primary);
  }
  
  &-info {
    background-color: rgba(17, 116, 251, 0.1);
    color: var(--color-info);
  }
}
```

## 12. 无障碍设计

- 所有颜色组合应满足WCAG 2.1 AA标准的对比度要求
- 提供键盘导航支持
- 使用适当的ARIA属性增强数据可视化的可访问性
- 确保所有交互元素有清晰的焦点状态

## 13. 性能考量

- 减少渲染成本，优化数据密集型视图
- CSS选择器嵌套不超过3层
- 避免`!important`的使用
- 使用CSS变量减少重复声明
- 优化动画性能，使用`transform`和`opacity`属性
- 对于大型数据表格，考虑虚拟滚动实现

## 14. 使用指南

### 安装依赖

```bash
# 首先安装TDesign
npm install tdesign-vue-next

# 安装数据驱动风设计系统
npm install @design-system/data-driven
```

### 引入样式

```javascript
// main.js
import 'tdesign-vue-next/es/style/index.css';
import '@design-system/data-driven/dist/index.css';
```

### 基础组件使用

```vue
<template>
  <div class="data-card">
    <div class="data-card-header">
      <h3>系统性能</h3>
    </div>
    <div class="data-card-content">
      <div class="data-card-metric">98.5%</div>
      <div class="data-badge data-badge-positive">+2.3%</div>
    </div>
    <div class="data-card-footer">
      最后更新: 2分钟前
    </div>
  </div>
</template>
```

### 数据表格使用

```vue
<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>指标</th>
        <th>当前值</th>
        <th>变化</th>
        <th>状态</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>服务器响应时间</td>
        <td class="numeric">124ms</td>
        <td class="numeric">-12%</td>
        <td><span class="status-positive">正常</span></td>
      </tr>
      <tr>
        <td>内存使用率</td>
        <td class="numeric">72.4%</td>
        <td class="numeric">+5%</td>
        <td><span class="status-warning">注意</span></td>
      </tr>
      <tr>
        <td>错误率</td>
        <td class="numeric">2.3%</td>
        <td class="numeric">+1.2%</td>
        <td><span class="status-negative">异常</span></td>
      </tr>
    </tbody>
  </table>
</template>
```

### TDesign组件使用

```vue
<template>
  <t-space direction="vertical">
    <t-card title="API请求统计" hover>
      <template #actions>
        <t-button theme="primary" variant="text" suffix="chevron-right">
          查看详情
        </t-button>
      </template>
      <div ref="chartContainer" class="chart-container"></div>
    </t-card>
    
    <t-alert
      theme="warning"
      message="系统负载较高"
      description="当前CPU使用率超过80%，建议扩展服务器资源。"
    />
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
  --color-primary: hsl(340, 85%, 51%); // 调整色相
  
  // 自定义图表颜色
  --color-chart-1: hsl(340, 85%, 51%);
  --color-chart-2: hsl(190, 90%, 48%);
  // 其他图表颜色...
}
``` 