<template>
  <div :class="[styles.tableWrapper, isDarkMode ? styles.darkMode : '', 'dd-table-wrapper']">
    <table :class="[styles.table, 'dd-table']">
      <thead :class="[styles.tableHeader, isDarkMode ? styles.darkMode : '', 'dd-table-header']">
        <tr>
          <th 
            v-for="(column, index) in columns" 
            :key="index"
            :class="[
              column.sortable ? styles.sortable : '', 
              isDarkMode ? styles.darkMode : '',
              'dd-table-th'
            ]"
            @click="column.sortable ? handleSort(column.key) : null"
          >
            {{ column.label }}
            <span v-if="column.sortable && sortKey === column.key">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody :class="[styles.tableBody, 'dd-table-body']">
        <tr 
          v-for="(row, rowIndex) in paginatedData" 
          :key="rowIndex"
          :class="[
            isDarkMode ? styles.darkMode : '',
            'dd-table-row',
            rowIndex % 2 === 0 ? 'dd-table-row-even' : 'dd-table-row-odd'
          ]"
        >
          <td 
            v-for="(column, colIndex) in columns" 
            :key="colIndex"
            :class="[isDarkMode ? styles.darkMode : '', 'dd-table-cell']"
          >
            <slot :name="column.key" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="!paginatedData.length">
          <td :colspan="columns.length" :class="[styles.emptyState, isDarkMode ? styles.darkMode : '', 'dd-table-empty']">
            <slot name="empty">
              {{ emptyText }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="pagination && data.length" :class="[styles.pagination, 'dd-table-pagination']">
      <div :class="[styles.pageInfo, isDarkMode ? styles.darkMode : '', 'dd-page-info']">
        {{ t('common.table.showing') }} {{ startIndex + 1 }} {{ t('common.table.to') }} {{ Math.min(endIndex, data.length) }} {{ t('common.table.of') }} {{ data.length }} {{ t('common.table.entries') }}
      </div>
      
      <div :class="[styles.pageControls, 'dd-page-controls']">
        <button 
          :class="[
            styles.pageButton, 
            isDarkMode ? styles.darkMode : '',
            'dd-page-button'
          ]" 
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          &laquo;
        </button>
        
        <button 
          v-for="page in visiblePages" 
          :key="page"
          :class="[
            styles.pageButton, 
            currentPage === page ? styles.active : '',
            isDarkMode ? styles.darkMode : '',
            'dd-page-button',
            currentPage === page ? 'dd-page-button-active' : ''
          ]"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        
        <button 
          :class="[
            styles.pageButton, 
            isDarkMode ? styles.darkMode : '',
            'dd-page-button'
          ]" 
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          &raquo;
        </button>
      </div>
      
      <div :class="[styles.rowsPerPage, isDarkMode ? styles.darkMode : '', 'dd-rows-per-page']">
        {{ t('common.table.rowsPerPage') }}
        <select 
          v-model="pageSize" 
          :class="[styles.rowsSelect, isDarkMode ? styles.darkMode : '', 'dd-rows-select']"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import styles from '@/styles/components/DataTable.module.scss';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface Props {
  columns: TableColumn[];
  data: Record<string, any>[];
  pagination?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  emptyText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  pagination: true,
  defaultPageSize: 10,
  pageSizeOptions: () => [5, 10, 20, 50],
  emptyText: '暂无数据'
});

const { t } = useI18n();
const currentPage = ref(1);
const pageSize = ref(props.defaultPageSize);
const sortKey = ref('');
const sortOrder = ref('asc');

// 是否为暗黑模式
const isDarkMode = computed(() => {
  return document.documentElement.classList.contains('dark-mode');
});

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(props.data.length / pageSize.value);
});

// 计算当前页的数据
const paginatedData = computed(() => {
  let result = [...props.data];
  
  // 排序处理
  if (sortKey.value) {
    result.sort((a, b) => {
      const aValue = a[sortKey.value];
      const bValue = b[sortKey.value];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder.value === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortOrder.value === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    });
  }
  
  // 分页处理
  if (props.pagination) {
    const start = (currentPage.value - 1) * pageSize.value;
    return result.slice(start, start + pageSize.value);
  }
  
  return result;
});

// 计算显示的页码范围
const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages.value <= maxVisiblePages) {
    // 如果总页数小于最大可见页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // 否则计算显示哪些页码
    let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

// 计算当前页的起始和结束索引
const startIndex = computed(() => {
  return (currentPage.value - 1) * pageSize.value;
});

const endIndex = computed(() => {
  return startIndex.value + pageSize.value;
});

// 分页大小变化时重置当前页为1
watch(pageSize, () => {
  currentPage.value = 1;
});

// 数据变化时重置当前页为1
watch(() => props.data, () => {
  currentPage.value = 1;
}, { deep: true });

// 页码变化
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// 排序处理
const handleSort = (key: string) => {
  if (sortKey.value === key) {
    // 如果点击的是当前排序列，切换排序顺序
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // 如果点击不同的列，设置新的排序列，默认升序
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};
</script>

<style scoped>
/* Original: Line 1-5 */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Original: Line 6-10 */
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/* Original: Line 11-20 */
.table-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f8f9fa;
}

/* Original: Line 21-30 */
.table-header th {
  padding: 8px 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #e9ecef;
}

/* Original: Line 31-40 */
.table-body tr {
  transition: background-color 0.15s ease;
}

/* Original: Line 41-45 */
.table-body tr:hover {
  background-color: #f8f9fa;
}

/* Original: Line 46-50 */
.table-body tr:nth-child(even) {
  background-color: #f8f9fa;
}

/* Original: Line 51-55 */
.table-body td {
  padding: 8px 16px;
  border-bottom: 1px solid #e9ecef;
}

/* Original: Line 56-62 */
.empty-state {
  padding: 32px;
  text-align: center;
  color: #6c757d;
}

/* Original: Line 63-75 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #e9ecef;
}

/* Original: Line 76-85 */
.page-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Original: Line 86-100 */
.page-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: transparent;
  transition: all 0.15s ease;
}

/* Original: Line 101-110 */
.page-button:hover:not(:disabled) {
  background-color: #f1f3f5;
}

/* Original: Line 111-115 */
.page-button.active {
  background-color: #1a73e8;
  color: white;
}

/* 数据驱动风格表格样式增强 */
:deep(.dd-table-wrapper) {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: calc(var(--grid-unit) * 1px);
  background-color: white;
}

:deep(.dd-table) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

:deep(.dd-table-header) {
  background-color: rgba(0, 0, 0, 0.02);
}

:deep(.dd-table-th) {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  padding: calc(var(--grid-unit) * 1.5px) calc(var(--grid-unit) * 2px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

:deep(.dd-table-row) {
  transition: background-color 0.2s;
}

:deep(.dd-table-row:hover) {
  background-color: rgba(0, 0, 0, 0.02);
}

:deep(.dd-table-row-even) {
  background-color: white;
}

:deep(.dd-table-row-odd) {
  background-color: rgba(0, 0, 0, 0.01);
}

:deep(.dd-table-cell) {
  padding: calc(var(--grid-unit) * 1.5px) calc(var(--grid-unit) * 2px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.65);
}

:deep(.dd-table-empty) {
  color: rgba(0, 0, 0, 0.45);
  padding: calc(var(--grid-unit) * 4px);
}

:deep(.dd-table-pagination) {
  padding: calc(var(--grid-unit) * 1.5px) calc(var(--grid-unit) * 2px);
  background-color: rgba(0, 0, 0, 0.01);
}

:deep(.dd-page-button) {
  min-width: calc(var(--grid-unit) * 4px);
  height: calc(var(--grid-unit) * 4px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: calc(var(--grid-unit) * 0.5px);
}

:deep(.dd-page-button-active) {
  background-color: hsl(var(--dd-primary));
  border-color: hsl(var(--dd-primary));
  color: white;
}

:deep(.dd-rows-select) {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: calc(var(--grid-unit) * 0.5px);
  padding: 2px 8px;
  margin-left: 8px;
}

/* 暗黑模式适配 */
:deep(.dark-mode .dd-table-wrapper) {
  background-color: rgba(0, 0, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.dark-mode .dd-table-header) {
  background-color: rgba(255, 255, 255, 0.05);
}

:deep(.dark-mode .dd-table-th) {
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.dark-mode .dd-table-row-even) {
  background-color: transparent;
}

:deep(.dark-mode .dd-table-row-odd) {
  background-color: rgba(255, 255, 255, 0.03);
}

:deep(.dark-mode .dd-table-cell) {
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.65);
}
</style> 