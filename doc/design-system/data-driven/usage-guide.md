# 数据驱动风设计系统使用指南

## 简介

本指南将帮助您快速掌握数据驱动风设计系统的使用方法，包括如何集成到您的项目中，以及如何使用各种组件和样式。数据驱动风设计系统专为数据分析平台、监控仪表盘和企业级应用设计，注重清晰、高效和数据可视化。

## 目录

1. [安装与配置](#安装与配置)
2. [基础样式使用](#基础样式使用)
3. [组件使用](#组件使用)
4. [数据可视化](#数据可视化)
5. [暗黑模式](#暗黑模式)
6. [响应式设计](#响应式设计)
7. [最佳实践](#最佳实践)
8. [常见问题](#常见问题)

## 安装与配置

### 1. 安装依赖

```bash
# 使用npm
npm install tdesign-vue-next @design-system/data-driven

# 使用yarn
yarn add tdesign-vue-next @design-system/data-driven

# 使用pnpm
pnpm add tdesign-vue-next @design-system/data-driven
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
// 引入数据驱动风设计系统样式
import '@design-system/data-driven/dist/index.css';

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
  --color-primary: hsl(340, 85%, 51%); // 调整色相
  
  // 自定义图表颜色
  --color-chart-1: hsl(340, 85%, 51%);
  --color-chart-2: hsl(190, 90%, 48%);
  // 其他图表颜色...
}
```

然后在入口文件中引入：

```javascript
import './styles/variables-override.scss';
```

## 基础样式使用

### 1. 色彩系统

数据驱动风设计系统提供了一套完整的色彩变量，您可以直接在CSS中使用：

```css
.my-element {
  color: var(--color-primary);
  background-color: var(--color-gray-100);
  border: 1px solid var(--color-border);
}

.positive-trend {
  color: var(--color-success);
}

.negative-trend {
  color: var(--color-primary);
}
```

### 2. 间距系统

使用预定义的间距变量来保持布局的一致性：

```css
.dashboard-item {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.data-grid {
  gap: var(--spacing-sm);
}
```

### 3. 排版系统

应用预定义的字体大小、字重和行高：

```css
.metric-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  color: var(--color-text-secondary);
}

.metric-value {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  font-family: var(--font-family-mono);
}

.metric-change {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-mono);
}
```

## 组件使用

### 1. 基础组件

数据驱动风设计系统提供了一套基础组件样式类，您可以直接在HTML中使用：

#### 数据卡片

```vue
<template>
  <div class="data-card">
    <div class="data-card-header">
      <h3>系统响应时间</h3>
    </div>
    <div class="data-card-content">
      <div class="data-card-metric">124ms</div>
      <div class="data-badge data-badge-positive">-12ms</div>
    </div>
    <div class="data-card-footer">
      最后更新: 2分钟前
    </div>
  </div>
</template>
```

#### 数据表格

```vue
<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>服务名称</th>
        <th>状态</th>
        <th>负载</th>
        <th>响应时间</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>API服务</td>
        <td><span class="status-positive">正常</span></td>
        <td class="numeric">42%</td>
        <td class="numeric">85ms</td>
      </tr>
      <tr>
        <td>数据库服务</td>
        <td><span class="status-warning">注意</span></td>
        <td class="numeric">78%</td>
        <td class="numeric">120ms</td>
      </tr>
      <tr>
        <td>缓存服务</td>
        <td><span class="status-negative">异常</span></td>
        <td class="numeric">92%</td>
        <td class="numeric">230ms</td>
      </tr>
    </tbody>
  </table>
</template>
```

#### 数据标记

```vue
<template>
  <div class="data-badge data-badge-positive">+2.3%</div>
  <div class="data-badge data-badge-warning">-1.5%</div>
  <div class="data-badge data-badge-negative">-8.7%</div>
  <div class="data-badge data-badge-info">42.3K</div>
</template>
```

### 2. TDesign组件

数据驱动风设计系统与TDesign组件库完全兼容，您可以正常使用TDesign组件，它们会自动应用数据驱动风的样式：

```vue
<template>
  <t-space direction="vertical">
    <t-row :gutter="[16, 16]">
      <t-col :xs="24" :md="12" :xl="6" v-for="(metric, index) in metrics" :key="index">
        <t-card :title="metric.title" hover>
          <div class="metric-value">{{ metric.value }}</div>
          <div class="data-badge" :class="`data-badge-${metric.trend}`">{{ metric.change }}</div>
        </t-card>
      </t-col>
    </t-row>
    
    <t-card title="系统负载趋势">
      <div ref="chartContainer" class="chart-container"></div>
    </t-card>
    
    <t-table
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      stripe
    />
  </t-space>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const metrics = ref([
  { title: 'CPU 使用率', value: '72.4%', change: '+5.2%', trend: 'warning' },
  { title: '内存使用率', value: '68.1%', change: '+2.8%', trend: 'info' },
  { title: '磁盘 I/O', value: '42MB/s', change: '-8%', trend: 'positive' },
  { title: '网络流量', value: '1.2GB/s', change: '+12%', trend: 'negative' },
]);

const chartContainer = ref(null);
const myChart = ref(null);

onMounted(() => {
  if (chartContainer.value) {
    myChart.value = echarts.init(chartContainer.value);
    const option = {
      color: [
        'var(--color-chart-1)',
        'var(--color-chart-2)',
        'var(--color-chart-3)',
      ],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['CPU', '内存', '网络']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'CPU',
          type: 'line',
          data: [42, 45, 65, 78, 65, 58, 60, 72]
        },
        {
          name: '内存',
          type: 'line',
          data: [50, 52, 55, 58, 60, 62, 65, 68]
        },
        {
          name: '网络',
          type: 'line',
          data: [30, 25, 40, 85, 70, 60, 55, 75]
        }
      ]
    };
    myChart.value.setOption(option);
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
      myChart.value.resize();
    });
  }
});

const tableData = ref([
  { id: 1, service: 'API服务', status: 'normal', load: 42, responseTime: 85 },
  { id: 2, service: '数据库服务', status: 'warning', load: 78, responseTime: 120 },
  { id: 3, service: '缓存服务', status: 'error', load: 92, responseTime: 230 },
  { id: 4, service: '认证服务', status: 'normal', load: 35, responseTime: 65 },
  { id: 5, service: '存储服务', status: 'warning', load: 80, responseTime: 150 },
]);

const columns = [
  { colKey: 'service', title: '服务名称' },
  { 
    colKey: 'status', 
    title: '状态',
    cell: ({ row }) => {
      const statusMap = {
        normal: { text: '正常', class: 'status-positive' },
        warning: { text: '注意', class: 'status-warning' },
        error: { text: '异常', class: 'status-negative' },
      };
      const { text, class: className } = statusMap[row.status] || {};
      return <span class={className}>{text}</span>;
    }
  },
  { 
    colKey: 'load', 
    title: '负载 (%)',
    align: 'right',
    cell: ({ row }) => `${row.load}%`
  },
  { 
    colKey: 'responseTime', 
    title: '响应时间 (ms)',
    align: 'right',
    cell: ({ row }) => `${row.responseTime}ms`
  },
];

const pagination = {
  total: tableData.value.length,
  pageSize: 10,
  current: 1,
};

const loading = ref(false);
</script>
```

## 数据可视化

### 1. 使用ECharts

数据驱动风设计系统提供了一套与设计系统协调的ECharts主题配置：

```javascript
// 引入ECharts
import * as echarts from 'echarts';

// 将数据驱动风的变量应用到ECharts
function initChart(container) {
  const chart = echarts.init(container);
  const option = {
    color: [
      'var(--color-chart-1)',
      'var(--color-chart-2)',
      'var(--color-chart-3)',
      'var(--color-chart-4)',
      'var(--color-chart-5)',
      'var(--color-chart-6)',
      'var(--color-chart-7)',
      'var(--color-chart-8)',
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    // 其他配置...
  };
  
  chart.setOption(option);
  return chart;
}
```

### 2. 仪表盘样式

```vue
<template>
  <div class="dashboard-grid">
    <div class="data-card">
      <div class="data-card-header">
        <h3>CPU使用率</h3>
      </div>
      <div class="data-card-content">
        <div class="gauge-container" ref="cpuGauge"></div>
      </div>
    </div>
    <!-- 其他仪表盘卡片 -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const cpuGauge = ref(null);

onMounted(() => {
  if (cpuGauge.value) {
    const chart = echarts.init(cpuGauge.value);
    const option = {
      series: [{
        type: 'gauge',
        progress: {
          show: true,
          color: [
            {
              offset: 0,
              color: 'var(--color-success)'
            },
            {
              offset: 0.7,
              color: 'var(--color-warning)'
            },
            {
              offset: 1,
              color: 'var(--color-primary)'
            }
          ]
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 10,
          lineStyle: {
            width: 2,
            color: 'var(--color-text-placeholder)'
          }
        },
        axisLabel: {
          color: 'var(--color-text-secondary)',
          fontSize: 12,
          fontFamily: 'var(--font-family-mono)'
        },
        pointer: {
          length: '60%',
          width: 4
        },
        anchor: {
          show: true,
          size: 12,
          itemStyle: {
            borderWidth: 2
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-family-mono)',
          fontSize: 24,
          fontWeight: 'bold',
          offsetCenter: [0, '50%']
        },
        data: [{
          value: 72.5
        }]
      }]
    };
    chart.setOption(option);
    
    window.addEventListener('resize', () => {
      chart.resize();
    });
  }
});
</script>

<style lang="scss">
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.gauge-container {
  height: 200px;
  width: 100%;
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

### 3. 图表暗黑模式适配

```javascript
// 监听暗黑模式变化，更新图表主题
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      const isDarkMode = document.documentElement.classList.contains('dark-theme');
      if (chart) {
        // 更新图表配色
        const newOption = {
          backgroundColor: isDarkMode ? 'transparent' : 'transparent',
          textStyle: {
            color: isDarkMode ? 'var(--color-text-primary)' : 'var(--color-text-primary)'
          },
          // 其他配置...
        };
        chart.setOption(newOption);
      }
    }
  });
});

observer.observe(document.documentElement, { attributes: true });
```

## 响应式设计

### 1. 使用响应式混合宏

数据驱动风设计系统提供了响应式混合宏，可以方便地编写响应式样式：

```scss
.chart-container {
  height: 300px;
  
  @include respond-to(xs) {
    height: 200px;
  }
  
  @include respond-to(md) {
    height: 350px;
  }
  
  @include respond-to(xl) {
    height: 400px;
  }
}
```

### 2. 数据卡片响应式设计

```vue
<template>
  <div class="metrics-grid">
    <div class="metric-card" v-for="(metric, index) in metrics" :key="index">
      <div class="metric-title">{{ metric.title }}</div>
      <div class="metric-value">{{ metric.value }}</div>
      <div class="metric-change" :class="metric.changeClass">{{ metric.change }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.metrics-grid {
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

.metric-card {
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  
  .metric-title {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
  }
  
  .metric-value {
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
    font-family: var(--font-family-mono);
    margin-bottom: var(--spacing-xs);
  }
  
  .metric-change {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    font-family: var(--font-family-mono);
    
    &.positive {
      color: var(--color-success);
    }
    
    &.negative {
      color: var(--color-primary);
    }
    
    &.warning {
      color: var(--color-warning);
    }
  }
}
</style>
```

## 最佳实践

### 1. 数据可视化原则

- 确保数据的准确性和清晰度是首要目标
- 使用适当的图表类型展示不同类型的数据
- 保持一致的配色方案，使用数据驱动风的图表颜色
- 避免过度装饰，注重数据本身
- 提供适当的上下文和比较信息

### 2. 性能优化

- 对于大型数据表格，使用虚拟滚动技术
- 图表避免过多数据点，考虑数据聚合
- 使用防抖和节流技术处理实时更新
- 懒加载非关键数据和组件
- 对于复杂仪表盘，考虑组件级别的代码分割

### 3. 数据密集型界面设计

- 使用层次和分组整理信息
- 提供过滤和排序功能
- 使用卡片和标签分隔不同的数据区域
- 对重要信息使用视觉强调
- 提供适当的空白和间距，避免界面拥挤

### 4. 无障碍支持

- 确保所有图表都有文本替代说明
- 使用足够的对比度便于阅读数据
- 避免仅使用颜色来传达信息，添加标签和图案
- 提供键盘导航支持
- 数据表格使用适当的HTML语义标记

## 常见问题

### 1. 如何自定义图表颜色？

您可以覆盖默认的图表颜色变量：

```scss
:root {
  --color-chart-1: hsl(340, 85%, 51%);
  --color-chart-2: hsl(190, 90%, 48%);
  --color-chart-3: hsl(151, 90%, 42%);
  --color-chart-4: hsl(32, 95%, 56%);
  --color-chart-5: hsl(272, 90%, 52%);
  --color-chart-6: hsl(220, 95%, 65%);
  --color-chart-7: hsl(16, 95%, 56%);
  --color-chart-8: hsl(175, 90%, 42%);
}
```

### 2. 如何处理大量数据的表格？

对于大型数据表格，建议：

1. 使用虚拟滚动技术，只渲染可见区域
2. 实现服务端分页
3. 添加过滤和搜索功能
4. 考虑数据聚合或汇总视图

```javascript
// 使用TDesign的表格组件实现大数据量表格
const pagination = reactive({
  current: 1,
  pageSize: 50,
  total: 10000, // 假设有10000条数据
  showJumper: true,
  showPageSize: true,
  pageSizeOptions: [20, 50, 100, 200],
  onChange: (pageInfo) => {
    // 根据页码加载数据
    loadTableData(pageInfo.current, pageInfo.pageSize);
  },
});

async function loadTableData(page, pageSize) {
  loading.value = true;
  try {
    // 从API获取分页数据
    const response = await fetch(`/api/data?page=${page}&pageSize=${pageSize}`);
    const data = await response.json();
    tableData.value = data.items;
    pagination.total = data.total;
  } catch (error) {
    console.error('加载数据失败', error);
  } finally {
    loading.value = false;
  }
}
```

### 3. 如何实现实时数据更新？

对于需要实时更新的仪表盘，可以使用WebSocket或轮询：

```javascript
// 使用WebSocket实时更新
const ws = new WebSocket('wss://api.example.com/metrics');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // 更新指标
  metrics.value = data.metrics;
  
  // 更新图表
  if (myChart.value) {
    myChart.value.setOption({
      series: [{
        data: data.chartData
      }]
    });
  }
};

// 处理断开连接
ws.onclose = () => {
  setTimeout(() => {
    // 尝试重新连接
    initWebSocket();
  }, 5000);
};
```

### 4. 如何适配不同尺寸的屏幕？

除了使用响应式设计外，还可以提供不同的视图模式：

```vue
<template>
  <div class="dashboard-controls">
    <t-radio-group v-model="viewMode">
      <t-radio-button value="compact">紧凑视图</t-radio-button>
      <t-radio-button value="standard">标准视图</t-radio-button>
      <t-radio-button value="detailed">详细视图</t-radio-button>
    </t-radio-group>
  </div>
  
  <div class="dashboard-container" :class="`view-${viewMode}`">
    <!-- 仪表盘内容 -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
const viewMode = ref('standard');
</script>

<style lang="scss">
.dashboard-container {
  &.view-compact {
    .data-card {
      .data-card-header h3 {
        font-size: var(--font-size-sm);
      }
      
      .data-card-metric {
        font-size: var(--font-size-xl);
      }
    }
    
    .chart-container {
      height: 200px;
    }
  }
  
  &.view-detailed {
    .data-card {
      .data-card-metric {
        font-size: var(--font-size-huge);
      }
    }
    
    .chart-container {
      height: 400px;
    }
  }
}
</style>
```

### 5. 浏览器兼容性如何？

数据驱动风设计系统支持以下浏览器的最新两个主要版本：

- Chrome
- Firefox
- Safari
- Edge

对于使用CSS变量的特性，不支持IE11。如需支持IE11，请考虑使用PostCSS插件或其他CSS变量降级方案。 