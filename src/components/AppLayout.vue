<template>
  <div class="data-driven-layout">
    <header class="dd-header">
      <slot name="header">
        <div class="header-content">
          <div class="logo">数据驱动平台</div>
          <div class="actions">
            <slot name="header-actions"></slot>
          </div>
        </div>
      </slot>
    </header>
    
    <div class="dd-container">
      <aside class="dd-sidebar">
        <slot name="sidebar"></slot>
      </aside>
      
      <main class="dd-content">
        <!-- 数据驱动特有的网格布局系统 -->
        <div class="dd-grid">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  gridColumns: {
    type: Number,
    default: 12
  }
})
</script>

<style scoped>
.data-driven-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--td-bg-color-page);
}

.dd-header {
  height: calc(var(--td-comp-size-l) + var(--td-spacing-2));
  background-color: var(--td-bg-color-container);
  box-shadow: var(--td-shadow-1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 var(--td-spacing-5);
}

.logo {
  font-size: 18px;
  font-weight: 600;
  color: var(--td-primary-color);
}

.dd-container {
  display: flex;
  flex: 1;
  height: calc(100vh - calc(var(--td-comp-size-l) + var(--td-spacing-2)));
}

.dd-sidebar {
  width: 220px;
  background-color: var(--td-bg-color-container);
  border-right: 1px solid var(--td-border-color);
  height: 100%;
  overflow-y: auto;
}

.dd-content {
  flex: 1;
  padding: var(--td-spacing-5);
  overflow-y: auto;
}

.dd-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--td-spacing-4);
  width: 100%;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .dd-sidebar {
    width: 0;
    position: fixed;
    left: 0;
    top: calc(var(--td-comp-size-l) + var(--td-spacing-2));
    z-index: 5;
    transition: width 0.3s;
  }
  
  .dd-sidebar.expanded {
    width: 220px;
  }
}
</style> 