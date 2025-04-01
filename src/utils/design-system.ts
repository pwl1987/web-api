/**
 * 设计系统工具函数
 * 用于初始化和应用设计系统的配置
 */
import { validateAndReportTokens } from './design-system-validator';

/**
 * 设计系统配置类型
 */
interface DesignSystemConfig {
  theme: string;
  version: string;
  variables: {
    primary: string;
    gridUnit: number;
    [key: string]: any;
  };
}

/**
 * 注入Google Fonts
 */
function injectGoogleFonts(): void {
  // 检查是否已加载
  if (document.getElementById('dd-google-fonts')) return;
  
  // 创建链接元素
  const link = document.createElement('link');
  link.id = 'dd-google-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
  
  // 添加到head
  document.head.appendChild(link);
}

/**
 * 初始化设计系统
 * 从window.DESIGN_SYSTEM中获取配置并应用到文档中
 */
export function initializeDesignSystem(): void {
  // 从window对象中获取设计系统配置
  const designSystem = (window as any).DESIGN_SYSTEM as DesignSystemConfig || {
    theme: 'data-driven',
    version: '1.0',
    variables: {
      primary: 'hsl(332, 85%, 51%)',
      gridUnit: 8 // 8px基准
    }
  };

  // 设置设计系统CSS变量
  const root = document.documentElement;
  
  // 设置网格单位变量
  root.style.setProperty('--grid-unit', `${designSystem.variables.gridUnit}`);
  
  // 根据主题应用适当的类名
  document.body.classList.add(`theme-${designSystem.theme}`);
  
  // 将主题信息添加到数据属性
  document.body.dataset.theme = designSystem.theme;
  document.body.dataset.themeVersion = designSystem.version;

  // 注入Google Fonts
  injectGoogleFonts();
  
  console.log(`[设计系统] 初始化完成: ${designSystem.theme} (v${designSystem.version})`);
  
  // 在开发环境中验证令牌
  if (process.env.NODE_ENV !== 'production') {
    // 等待CSS变量应用完成后验证
    setTimeout(() => {
      validateAndReportTokens();
    }, 500);
  }
}

/**
 * 应用黑暗模式
 * @param {boolean} isDark - 是否启用黑暗模式
 */
export function applyDarkMode(isDark: boolean): void {
  if (isDark) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
}

/**
 * 获取当前设计系统主题
 * @returns {string} 当前主题名称
 */
export function getCurrentTheme(): string {
  return document.body.dataset.theme || 'default';
} 