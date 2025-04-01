/**
 * 通用工具函数
 */

/**
 * 判断是否显示菜单
 * 对于特定路径不显示菜单
 * @param {string} path - 当前路径
 * @returns {boolean} - 是否显示菜单
 */
export function handleShowMenu(path) {
  const hideMenuPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ];
  
  return !hideMenuPaths.some(item => path.startsWith(item));
}

/**
 * 处理路径，统一处理文件路径
 * @param {string} path - 原始路径
 * @returns {string} - 处理后的路径
 */
export function handlePath(path) {
  // 如果路径为空，返回空字符串
  if (!path) return '';
  
  // 将Windows路径分隔符转换为Unix风格
  const formattedPath = path.replace(/\\/g, '/');
  
  // 处理可能的绝对路径
  if (formattedPath.startsWith('/')) {
    return formattedPath;
  }
  
  return formattedPath;
}

/**
 * 将毫秒转换为时间格式（分:秒）
 * @param {number} ms - 毫秒数
 * @returns {string} - 格式化后的时间字符串
 */
export function millisecondsToTime(ms) {
  if (!ms || isNaN(ms)) return '00:00';
  
  // 转换为秒
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  // 格式化为两位数
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
}

/**
 * API本地URL地址
 * 用于开发环境中设置本地API地址
 */
export const localUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : window.location.origin; 