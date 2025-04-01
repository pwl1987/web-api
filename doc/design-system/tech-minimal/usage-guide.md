# 科技极简风设计系统使用指南

## 简介

本指南将帮助您快速掌握科技极简风设计系统的使用方法，包括如何集成到您的项目中，以及如何使用各种组件和样式。

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
npm install tdesign-vue-next @design-system/tech-minimal

# 使用yarn
yarn add tdesign-vue-next @design-system/tech-minimal

# 使用pnpm
pnpm add tdesign-vue-next @design-system/tech-minimal
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
// 引入科技极简风设计系统样式
import '@design-system/tech-minimal/dist/index.css';

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
  --color-primary: hsl(220, 98%, 51%); // 稍微调整色相
  
  // 自定义圆角
  --radius-sm: 6px; // 增加圆角
  
  // 自定义阴影
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08); // 增强阴影
}
```

然后在入口文件中引入：

```javascript
import './styles/variables-override.scss';
```

## 基础样式使用

### 1. 颜色系统

科技极简风设计系统提供了一套完整的色彩变量，您可以直接在CSS中使用：

```css
.my-element {
  color: var(--color-primary);
  background-color: var(--color-gray-100);
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
  line-height: var(--line-height-normal);
}

.code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
}
```

## 组件使用

### 1. 基础组件

科技极简风设计系统提供了一套基础组件样式类，您可以直接在HTML中使用：

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
      <h3>标题</h3>
    </div>
    <div class="card-content">
      <p>这是卡片内容</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary">确认</button>
      <button class="btn btn-secondary">取消</button>
    </div>
  </div>
</template>
```

#### 表单控件

```vue
<template>
  <div class="form-control">
    <label for="username">用户名</label>
    <input type="text" id="username" placeholder="请输入用户名">
  </div>
  <div class="form-control">
    <label for="password">密码</label>
    <input type="password" id="password" placeholder="请输入密码">
  </div>
</template>
```

### 2. TDesign组件

科技极简风设计系统与TDesign组件库完全兼容，您可以正常使用TDesign组件，它们会自动应用科技极简风的样式：

```vue
<template>
  <t-space direction="vertical">
    <t-form>
      <t-form-item label="用户名">
        <t-input placeholder="请输入用户名" />
      </t-form-item>
      <t-form-item label="密码">
        <t-input type="password" placeholder="请输入密码" />
      </t-form-item>
      <t-form-item>
        <t-button theme="primary">登录</t-button>
        <t-button theme="default" style="margin-left: 12px">取消</t-button>
      </t-form-item>
    </t-form>
    
    <t-divider></t-divider>
    
    <t-table :data="tableData" :columns="columns" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  { id: 1, name: '示例1', status: 'normal' },
  { id: 2, name: '示例2', status: 'warning' },
]);

const columns = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'name', title: '名称' },
  { colKey: 'status', title: '状态' },
];
</script>
```

## 布局系统

科技极简风设计系统推荐使用Grid布局和Flex布局：

### Grid布局

```vue
<template>
  <div class="grid-container">
    <div class="grid-item">项目1</div>
    <div class="grid-item">项目2</div>
    <div class="grid-item">项目3</div>
    <div class="grid-item">项目4</div>
  </div>
</template>

<style lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.grid-item {
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
}
</style>
```

### Flex布局

```vue
<template>
  <div class="flex-container">
    <div class="flex-item">项目1</div>
    <div class="flex-item">项目2</div>
    <div class="flex-item">项目3</div>
  </div>
</template>

<style lang="scss">
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.flex-item {
  flex: 1 1 300px;
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
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
.my-component {
  background-color: white;
  color: var(--color-text-primary);
  
  .dark-theme & {
    background-color: var(--color-gray-800);
    color: white;
  }
}
```

## 响应式设计

### 1. 使用响应式混合宏

科技极简风设计系统提供了响应式混合宏，可以方便地编写响应式样式：

```scss
.my-component {
  padding: var(--spacing-md);
  
  @include respond-to(xs) {
    padding: var(--spacing-xs);
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
  <div class="responsive-layout">
    <div class="sidebar">侧边栏</div>
    <div class="content">主内容区域</div>
  </div>
</template>

<style lang="scss">
.responsive-layout {
  display: flex;
  flex-direction: column;
  
  @include respond-to(md) {
    flex-direction: row;
  }
  
  .sidebar {
    padding: var(--spacing-md);
    background-color: var(--color-gray-50);
    
    @include respond-to(xs) {
      flex: 0 0 100%;
    }
    
    @include respond-to(md) {
      flex: 0 0 250px;
    }
  }
  
  .content {
    padding: var(--spacing-lg);
    flex: 1;
  }
}
</style>
```

## 最佳实践

### 1. 保持样式一致性

- 始终使用设计系统提供的变量，而不是硬编码值
- 使用科技极简风设计系统的排版规则，保持文本样式一致
- 遵循间距系统规则，保持组件间距和内部间距的一致

### 2. 保持语义化

- 使用合适的HTML元素，如`<button>`用于按钮，`<input>`用于输入框等
- 使用语义化的类名，如`.btn-primary`、`.card-header`等

### 3. 性能优化

- 避免过度嵌套CSS选择器
- 避免使用`!important`
- 使用CSS变量减少冗余
- 关键动画使用`will-change`属性进行优化

### 4. 无障碍支持

- 确保颜色对比度符合WCAG 2.1 AA标准
- 为交互元素提供明确的焦点状态
- 使用适当的ARIA属性增强可访问性

## 常见问题

### 1. 如何覆盖TDesign组件的特定样式？

可以使用以下方式覆盖TDesign组件的样式：

```scss
// 全局覆盖
.t-button.t-button--primary {
  background-color: var(--color-accent);
}

// 局部覆盖
.my-custom-form {
  .t-input {
    border-radius: var(--radius-lg);
  }
}
```

### 2. 如何在项目中混合使用多种设计系统？

推荐使用CSS变量作用域的方式：

```html
<div class="tech-minimal-scope">
  <!-- 这里的内容使用科技极简风设计系统样式 -->
</div>

<div class="other-design-system-scope">
  <!-- 这里的内容使用其他设计系统样式 -->
</div>
```

```scss
.tech-minimal-scope {
  // 科技极简风设计系统变量
  --color-primary: hsl(210, 98%, 51%);
  // 其他变量...
}

.other-design-system-scope {
  // 其他设计系统变量
  --color-primary: hsl(180, 50%, 50%);
  // 其他变量...
}
```

### 3. 如何处理响应式图片？

```css
.responsive-image {
  max-width: 100%;
  height: auto;
}
```

### 4. 设计系统的浏览器兼容性如何？

科技极简风设计系统支持以下浏览器的最新两个主要版本：

- Chrome
- Firefox
- Safari
- Edge

对于使用CSS变量的特性，不支持IE11。如需支持IE11，请考虑使用PostCSS插件或其他CSS变量降级方案。 