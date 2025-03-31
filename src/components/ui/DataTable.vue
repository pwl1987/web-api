<template>
  <div :class="[styles.tableWrapper, isDarkMode ? styles.darkMode : '']">
    <table :class="styles.table">
      <thead :class="[styles.tableHeader, isDarkMode ? styles.darkMode : '']">
        <tr>
          <th 
            v-for="(column, index) in columns" 
            :key="index"
            :class="[column.sortable ? styles.sortable : '', isDarkMode ? styles.darkMode : '']"
            @click="column.sortable ? handleSort(column.key) : null"
          >
            {{ column.label }}
            <span v-if="column.sortable && sortKey === column.key">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody :class="styles.tableBody">
        <tr 
          v-for="(row, rowIndex) in paginatedData" 
          :key="rowIndex"
          :class="[isDarkMode ? styles.darkMode : '']"
        >
          <td 
            v-for="(column, colIndex) in columns" 
            :key="colIndex"
            :class="[isDarkMode ? styles.darkMode : '']"
          >
            <slot :name="column.key" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="!paginatedData.length">
          <td :colspan="columns.length" :class="[styles.emptyState, isDarkMode ? styles.darkMode : '']">
            <slot name="empty">
              {{ emptyText }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="pagination && data.length" :class="styles.pagination">
      <div :class="[styles.pageInfo, isDarkMode ? styles.darkMode : '']">
        {{ t('common.table.showing') }} {{ startIndex + 1 }} {{ t('common.table.to') }} {{ Math.min(endIndex, data.length) }} {{ t('common.table.of') }} {{ data.length }} {{ t('common.table.entries') }}
      </div>
      
      <div :class="styles.pageControls">
        <button 
          :class="[styles.pageButton, isDarkMode ? styles.darkMode : '']" 
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
            isDarkMode ? styles.darkMode : ''
          ]"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        
        <button 
          :class="[styles.pageButton, isDarkMode ? styles.darkMode : '']" 
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          &raquo;
        </button>
      </div>
      
      <div :class="[styles.rowsPerPage, isDarkMode ? styles.darkMode : '']">
        {{ t('common.table.rowsPerPage') }}
        <select 
          v-model="pageSize" 
          :class="[styles.rowsSelect, isDarkMode ? styles.darkMode : '']"
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