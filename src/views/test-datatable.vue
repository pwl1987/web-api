<template>
  <div class="test-container">
    <h1 class="test-title">数据表格可视化测试</h1>
    
    <div class="token-validator">
      <h2>设计系统令牌验证</h2>
      <button class="validate-btn" @click="validateTokens">验证设计系统令牌</button>
      
      <div v-if="validationResult" class="validation-results">
        <div class="validation-status" :class="{ success: validationResult.valid, error: !validationResult.valid }">
          总体验证: {{ validationResult.valid ? '✅ 通过' : '❌ 失败' }}
        </div>
        
        <div class="validation-item" :class="{ success: validationResult.colorSystem, error: !validationResult.colorSystem }">
          颜色系统: {{ validationResult.colorSystem ? '✅ 通过' : '❌ 失败' }}
        </div>
        
        <div class="validation-item" :class="{ success: validationResult.spacingSystem, error: !validationResult.spacingSystem }">
          间距系统: {{ validationResult.spacingSystem ? '✅ 通过' : '❌ 失败' }}
        </div>
        
        <div class="validation-item" :class="{ success: validationResult.typographySystem, error: !validationResult.typographySystem }">
          排版系统: {{ validationResult.typographySystem ? '✅ 通过' : '❌ 失败' }}
        </div>
        
        <div v-if="validationResult.missing && validationResult.missing.length > 0" class="missing-tokens">
          <h3>缺失的令牌:</h3>
          <ul>
            <li v-for="(token, index) in validationResult.missing" :key="index">{{ token }}</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="table-section">
      <h2>1. 基础数据表格</h2>
      <DataTable 
        :columns="columns" 
        :data="tableData" 
      />
    </div>
    
    <div class="table-section">
      <h2>2. 可排序数据表格</h2>
      <DataTable 
        :columns="sortableColumns" 
        :data="tableData" 
      />
    </div>
    
    <div class="table-section">
      <h2>3. 自定义数据表格</h2>
      <DataTable 
        :columns="customColumns" 
        :data="tableData"
      >
        <template #status="{ value }">
          <span 
            :class="[
              'status-badge',
              value === '正常' ? 'status-success' : 
              value === '警告' ? 'status-warning' : 
              'status-error'
            ]"
          >
            {{ value }}
          </span>
        </template>
      </DataTable>
    </div>
    
    <div class="table-section">
      <h2>4. 空数据测试</h2>
      <DataTable 
        :columns="columns" 
        :data="[]" 
        empty-text="暂无数据，请添加新数据"
      />
    </div>
    
    <div class="table-section">
      <h2>5. 分页设置测试</h2>
      <DataTable 
        :columns="columns" 
        :data="largeDataSet" 
        :default-page-size="5"
        :page-size-options="[5, 10, 15, 20]"
      />
    </div>
    
    <div class="button-group">
      <button class="toggle-theme" @click="toggleTheme">切换暗黑模式</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataTable from '@renderer/components/ui/DataTable.vue';
import { ref } from 'vue';
import { applyDarkMode } from '@renderer/utils/design-system';
import { validateDataDrivenTokens } from '@renderer/utils/design-system-validator';

interface ValidationResult {
  valid: boolean;
  colorSystem: boolean;
  spacingSystem: boolean;
  typographySystem: boolean;
  missing: string[];
}

// 验证结果状态
const validationResult = ref<ValidationResult | null>(null);

// 验证令牌函数
const validateTokens = () => {
  validationResult.value = validateDataDrivenTokens();
  console.log('验证结果:', validationResult.value);
};

// 基础列定义
const columns = [
  { key: 'id', label: '编号' },
  { key: 'name', label: '名称' },
  { key: 'category', label: '分类' },
  { key: 'value', label: '数值' },
  { key: 'status', label: '状态' }
];

// 可排序列定义
const sortableColumns = [
  { key: 'id', label: '编号', sortable: true },
  { key: 'name', label: '名称', sortable: true },
  { key: 'category', label: '分类' },
  { key: 'value', label: '数值', sortable: true },
  { key: 'status', label: '状态' }
];

// 自定义列定义
const customColumns = [
  { key: 'id', label: '编号' },
  { key: 'name', label: '名称' },
  { key: 'category', label: '分类' },
  { key: 'value', label: '数值' },
  { key: 'status', label: '状态' }
];

// 生成测试数据
const generateData = (count) => {
  const data = [];
  const categories = ['类型A', '类型B', '类型C', '类型D'];
  const statuses = ['正常', '警告', '异常'];
  
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `测试数据 ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.floor(Math.random() * 1000),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return data;
};

const tableData = generateData(8);
const largeDataSet = generateData(100);

// 暗黑模式切换
const isDarkMode = ref(document.documentElement.classList.contains('dark-mode'));

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  applyDarkMode(isDarkMode.value);
};
</script>

<style scoped>
.test-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--td-spacing-4);
}

.test-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: var(--td-spacing-6);
  color: var(--td-text-color-primary);
}

.table-section {
  margin-bottom: var(--td-spacing-7);
}

.table-section h2 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: var(--td-spacing-4);
  color: var(--td-text-color-primary);
  padding-left: var(--td-spacing-2);
  border-left: 4px solid var(--td-primary-color);
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--td-border-radius);
  font-size: 12px;
  font-weight: 500;
}

.status-success {
  background-color: rgba(0, 180, 100, 0.1);
  color: var(--td-success-color);
}

.status-warning {
  background-color: rgba(238, 184, 0, 0.1);
  color: var(--td-warning-color);
}

.status-error {
  background-color: rgba(235, 63, 63, 0.1);
  color: var(--td-error-color);
}

.button-group {
  margin-top: var(--td-spacing-6);
  display: flex;
  justify-content: center;
}

.toggle-theme {
  background-color: var(--td-primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: var(--td-border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.toggle-theme:hover {
  background-color: var(--td-primary-color-hover);
}

/* 验证按钮和结果样式 */
.token-validator {
  margin-bottom: var(--td-spacing-7);
  padding: var(--td-spacing-4);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-border-radius);
  box-shadow: var(--td-shadow-1);
}

.validate-btn {
  background-color: var(--td-primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: var(--td-border-radius);
  cursor: pointer;
  font-weight: 500;
  margin-bottom: var(--td-spacing-4);
  transition: background-color 0.2s;
}

.validate-btn:hover {
  background-color: var(--td-primary-color-hover);
}

.validation-results {
  padding: var(--td-spacing-4);
  border: 1px solid var(--td-border-color);
  border-radius: var(--td-border-radius);
  margin-top: var(--td-spacing-4);
}

.validation-status,
.validation-item {
  margin-bottom: var(--td-spacing-2);
  padding: var(--td-spacing-2);
  border-radius: var(--td-border-radius);
}

.success {
  color: var(--td-success-color);
  background-color: rgba(0, 180, 100, 0.05);
}

.error {
  color: var(--td-error-color);
  background-color: rgba(235, 63, 63, 0.05);
}

.missing-tokens {
  margin-top: var(--td-spacing-4);
  padding: var(--td-spacing-3);
  background-color: rgba(235, 63, 63, 0.05);
  border-radius: var(--td-border-radius);
}

.missing-tokens h3 {
  color: var(--td-error-color);
  margin-bottom: var(--td-spacing-2);
  font-size: 14px;
}

.missing-tokens ul {
  margin: 0;
  padding-left: var(--td-spacing-4);
}

.missing-tokens li {
  color: var(--td-text-color-secondary);
  font-family: monospace;
  margin-bottom: var(--td-spacing-1);
}
</style> 