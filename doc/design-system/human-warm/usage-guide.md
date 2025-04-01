# 人文温暖风设计系统使用指南

## 简介

本指南将帮助您快速掌握人文温暖风设计系统的使用方法，包括如何集成到您的项目中，以及如何使用各种组件和样式。人文温暖风设计系统以亲和力、温暖感和人文关怀为设计理念，非常适合社交媒体、教育平台和健康应用等场景。

## 目录

1. [安装与配置](#安装与配置)
2. [基础样式使用](#基础样式使用)
3. [组件使用](#组件使用)
4. [布局系统](#布局系统)
5. [暗黑模式](#暗黑模式)
6. [响应式设计](#响应式设计)
7. [最佳实践](#最佳实践)
8. [常见问题](#常见问题)

## 安装与配置

### 1. 安装依赖

```bash
# 使用npm
npm install tdesign-vue-next @design-system/human-warm

# 使用yarn
yarn add tdesign-vue-next @design-system/human-warm

# 使用pnpm
pnpm add tdesign-vue-next @design-system/human-warm
```

### 2. 引入样式

在你的入口文件（如`main.js`或`main.ts`）中引入样式：

```javascript
// main.js / main.ts
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './App.vue';

// 引入TDesign样式
import 'tdesign-vue-next/es/style/index.css';
// 引入人文温暖风设计系统样式
import '@design-system/human-warm/dist/index.css';

const app = createApp(App);
app.use(TDesign);
app.mount('#app');
```

### 3. 配置样式变量（可选）

如果你需要自定义设计系统的一些变量，可以创建一个变量覆盖文件：

```scss
// src/styles/variables-override.scss

:root {
  // 自定义主色
  --color-primary: hsl(45, 92%, 62%); // 调整色相
  
  // 自定义圆角
  --radius-md: 16px; // 增加圆角
  
  // 自定义阴影
  --shadow-md: 0 6px 20px rgba(214, 158, 105, 0.15); // 增强阴影
}
```

然后在入口文件中引入：

```javascript
import './styles/variables-override.scss';
```

## 基础样式使用

### 1. 色彩系统

人文温暖风设计系统提供了一套完整的色彩变量，您可以直接在CSS中使用：

```css
.my-element {
  color: var(--color-primary);
  background-color: var(--color-brown-50);
  border: 1px solid var(--color-border);
}

.my-warning-text {
  color: var(--color-warning);
}
```

### 2. 间距系统

使用预定义的间距变量来保持布局的一致性：

```css
.my-component {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.compact-layout {
  gap: var(--spacing-sm);
}
```

### 3. 排版系统

应用预定义的字体大小、字重和行高：

```css
.heading {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.paragraph {
  font-size: var(--font-size-md);
  line-height: var(--line-height-relaxed);
}

.decorative-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-bold);
}
```

## 组件使用

### 1. 基础组件

人文温暖风设计系统提供了一套基础组件样式类，您可以直接在HTML中使用：

#### 按钮

```vue
<template>
  <button class="btn btn-primary">主要按钮</button>
  <button class="btn btn-secondary">次要按钮</button>
  <button class="btn btn-text">文本按钮</button>
</template>
```

#### 卡片

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h3>欢迎反馈</h3>
    </div>
    <div class="card-content">
      <p>您的意见对我们非常重要，感谢您的支持与反馈！</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary">提交反馈</button>
      <button class="btn btn-secondary">稍后再说</button>
    </div>
  </div>
</template>
```

#### 表单控件

```vue
<template>
  <div class="form-control">
    <label for="fullname">您的姓名</label>
    <input type="text" id="fullname" placeholder="请输入您的姓名">
  </div>
  <div class="form-control">
    <label for="message">留言</label>
    <textarea id="message" placeholder="请输入您的留言"></textarea>
  </div>
</template>
```

### 2. TDesign组件

人文温暖风设计系统与TDesign组件库完全兼容，您可以正常使用TDesign组件，它们会自动应用人文温暖风的样式：

```vue
<template>
  <t-space direction="vertical">
    <t-form>
      <t-form-item label="您的姓名">
        <t-input placeholder="请输入您的姓名" />
      </t-form-item>
      <t-form-item label="联系方式">
        <t-input placeholder="请输入您的电话或邮箱" />
      </t-form-item>
      <t-form-item label="出生日期">
        <t-date-picker placeholder="请选择日期" />
      </t-form-item>
      <t-form-item>
        <t-button theme="primary">注册</t-button>
        <t-button theme="default" style="margin-left: 12px">取消</t-button>
      </t-form-item>
    </t-form>
    
    <t-divider></t-divider>
    
    <t-alert
      theme="warning"
      message="请确保您的个人信息真实有效"
      description="我们会对您的个人信息进行严格保密，不会泄露给任何第三方。"
    />
  </t-space>
</template>
```

## 布局系统

人文温暖风设计系统推荐使用Grid布局和Flex布局：

### Grid布局

```vue
<template>
  <div class="grid-container">
    <div class="grid-item">用户评价</div>
    <div class="grid-item">课程推荐</div>
    <div class="grid-item">健康提示</div>
    <div class="grid-item">社区动态</div>
  </div>
</template>

<style lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
}

.grid-item {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  transition: var(--transition-default);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
}
</style>
```

### Flex布局

```vue
<template>
  <div class="flex-container">
    <div class="flex-item">健康小贴士</div>
    <div class="flex-item">每日锻炼计划</div>
    <div class="flex-item">社区互助</div>
  </div>
</template>

<style lang="scss">
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
}

.flex-item {
  flex: 1 1 320px;
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  transition: var(--transition-default);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
}
</style>
```

## 暗黑模式

### 1. 启用暗黑模式

您可以通过切换HTML根元素的类名来启用暗黑模式：

```javascript
// 切换到暗黑模式
document.documentElement.classList.add('dark-theme');

// 切换回亮色模式
document.documentElement.classList.remove('dark-theme');
```

### 2. 响应系统设置

您可以使用媒体查询来自动响应用户的系统设置：

```javascript
// 检测用户系统是否启用了暗黑模式
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 根据用户偏好设置模式
if (prefersDarkMode) {
  document.documentElement.classList.add('dark-theme');
} else {
  document.documentElement.classList.remove('dark-theme');
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (event.matches) {
    document.documentElement.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
  }
});
```

### 3. 为特定组件指定暗黑模式样式

如果需要为特定组件设置暗黑模式样式，可以使用以下方式：

```scss
.welcome-card {
  background-color: white;
  color: var(--color-text-primary);
  
  .dark-theme & {
    background-color: var(--color-brown-200);
    color: var(--color-text-inverse);
  }
}
```

## 响应式设计

### 1. 使用响应式混合宏

人文温暖风设计系统提供了响应式混合宏，可以方便地编写响应式样式：

```scss
.welcome-section {
  padding: var(--spacing-md);
  
  @include respond-to(xs) {
    padding: var(--spacing-sm);
  }
  
  @include respond-to(md) {
    padding: var(--spacing-lg);
  }
  
  @include respond-to(xl) {
    padding: var(--spacing-xl);
  }
}
```

### 2. 响应式布局示例

```vue
<template>
  <div class="app-layout">
    <header class="app-header">应用标题</header>
    <div class="app-content">
      <aside class="sidebar">侧边导航</aside>
      <main class="main-content">主要内容</main>
    </div>
    <footer class="app-footer">页脚信息</footer>
  </div>
</template>

<style lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  .app-header {
    padding: var(--spacing-md);
    background-color: var(--color-primary);
    color: var(--color-brown-900);
    font-weight: var(--font-weight-bold);
  }
  
  .app-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    
    @include respond-to(md) {
      flex-direction: row;
    }
    
    .sidebar {
      padding: var(--spacing-md);
      background-color: var(--color-brown-50);
      
      @include respond-to(xs) {
        order: 2;
      }
      
      @include respond-to(md) {
        order: 1;
        flex: 0 0 280px;
      }
    }
    
    .main-content {
      padding: var(--spacing-lg);
      flex: 1;
      
      @include respond-to(xs) {
        order: 1;
      }
      
      @include respond-to(md) {
        order: 2;
      }
    }
  }
  
  .app-footer {
    padding: var(--spacing-md);
    background-color: var(--color-brown-100);
    color: var(--color-brown-700);
    text-align: center;
  }
}
</style>
```

## 最佳实践

### 1. 保持温暖友好的视觉风格

- 使用圆润的边角和柔和的阴影创造友好感
- 合理使用装饰性字体增强人文气息
- 适当使用微动效提升交互体验
- 保持色彩协调，以温暖色调为主

### 2. 注重内容的表达

- 使用更宽松的行高提高文本可读性
- 为重要内容提供足够的留白
- 使用有意义的图标和插图增强信息传达
- 注重文案的亲和力和可理解性

### 3. 保持一致性

- 始终使用设计系统提供的变量，而不是硬编码值
- 使用人文温暖风设计系统的排版规则，保持文本样式一致
- 遵循间距系统规则，保持组件间距和内部间距的一致

### 4. 无障碍支持

- 确保颜色对比度符合WCAG 2.1 AA标准
- 为交互元素提供明确的焦点状态
- 使用适当的ARIA属性增强可访问性
- 提供友好的错误提示和帮助信息

## 常见问题

### 1. 如何处理大量数据展示场景？

对于数据密集型的页面，可以：

```scss
// 在数据密集型区域使用更紧凑的间距
.data-dense-area {
  --spacing-override-xs: 2px;
  --spacing-override-sm: 4px;
  --spacing-override-md: 8px;
  
  // 使用覆盖变量
  .table-cell {
    padding: var(--spacing-override-xs) var(--spacing-override-sm);
  }
}

// 同时保持操作区域足够大以确保可用性
.action-buttons {
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
}
```

### 2. 如何在专业系统中使用人文温暖风设计？

对于需要专业感的系统，可以：

- 保留温暖色调，但降低饱和度
- 减少装饰性元素
- 使用更直角的UI元素（如按钮可以从pill形状改为圆角矩形）
- 增加数据可视化的专业性

```scss
// 更专业的按钮变体
.btn-professional {
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
  
  &.btn-primary {
    background-color: var(--color-primary-dark);
  }
}
```

### 3. 如何处理表单验证样式？

```scss
.form-control {
  &.is-valid {
    input {
      border-color: var(--color-success);
      
      &:focus {
        box-shadow: 0 0 0 3px rgba(25, 196, 151, 0.2);
      }
    }
    
    .validation-message {
      color: var(--color-success);
    }
  }
  
  &.is-invalid {
    input {
      border-color: var(--color-accent);
      
      &:focus {
        box-shadow: 0 0 0 3px rgba(227, 78, 84, 0.2);
      }
    }
    
    .validation-message {
      color: var(--color-accent);
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-xs);
    }
  }
}
```

### 4. 如何与其他设计系统混合使用？

推荐使用CSS变量作用域的方式：

```html
<div class="human-warm-scope">
  <!-- 这里的内容使用人文温暖风设计系统样式 -->
</div>

<div class="other-design-system-scope">
  <!-- 这里的内容使用其他设计系统样式 -->
</div>
```

```scss
.human-warm-scope {
  // 人文温暖风设计系统变量
  --color-primary: hsl(38, 92%, 62%);
  // 其他变量...
}

.other-design-system-scope {
  // 其他设计系统变量
  --color-primary: hsl(210, 98%, 51%);
  // 其他变量...
}
```

### 5. 浏览器兼容性如何？

人文温暖风设计系统支持以下浏览器的最新两个主要版本：

- Chrome
- Firefox
- Safari
- Edge

对于使用CSS变量的特性，不支持IE11。如需支持IE11，请考虑使用PostCSS插件或其他CSS变量降级方案。 