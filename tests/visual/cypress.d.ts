/// <reference types="cypress" />

// 扩展全局命名空间，使测试文件中的cy、describe等符号被识别
declare global {
  // 继承Cypress命名空间中的所有属性和方法
}

// 保持这个空导出，让TypeScript将此文件视为模块
export {}; 