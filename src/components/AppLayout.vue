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
  background-color: rgb(240, 242, 245);
}

.dd-header {
  height: 64px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
}

.logo {
  font-size: 18px;
  font-weight: 600;
  color: hsl(var(--dd-primary));
}

.dd-container {
  display: flex;
  flex: 1;
  height: calc(100vh - 64px);
}

.dd-sidebar {
  width: 220px;
  background-color: white;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  height: 100%;
  overflow-y: auto;
}

.dd-content {
  flex: 1;
  padding: calc(var(--grid-unit) * 3px);
  overflow-y: auto;
}

.dd-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: calc(var(--grid-unit) * 2px);
  width: 100%;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .dd-sidebar {
    width: 0;
    position: fixed;
    left: 0;
    top: 64px;
    z-index: 5;
    transition: width 0.3s;
  }
  
  .dd-sidebar.expanded {
    width: 220px;
  }
}
</style> 