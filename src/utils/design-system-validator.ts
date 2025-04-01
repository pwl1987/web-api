/**
 * 设计系统令牌验证工具
 * 检查设计系统变量是否符合规范
 */

/**
 * 检查CSS变量是否已定义
 * @param {string} varName - CSS变量名
 * @returns {boolean} - 是否定义
 */
export function checkVarDefined(varName: string): boolean {
  const rootStyles = getComputedStyle(document.documentElement);
  return rootStyles.getPropertyValue(varName).trim() !== '';
}

/**
 * 验证设计系统变量列表
 * @param {string[]} variableNames - 变量名列表
 * @returns {Object} - 验证结果
 */
export function validateDesignTokens(variableNames: string[]): {
  valid: boolean;
  missing: string[];
  results: Record<string, boolean>;
} {
  const results: Record<string, boolean> = {};
  const missing: string[] = [];
  let valid = true;

  variableNames.forEach(varName => {
    const isValid = checkVarDefined(varName);
    results[varName] = isValid;
    
    if (!isValid) {
      valid = false;
      missing.push(varName);
    }
  });

  return { valid, missing, results };
}

/**
 * 验证数据驱动风格的设计系统令牌
 * @returns {Object} - 验证结果
 */
export function validateDataDrivenTokens(): {
  valid: boolean;
  colorSystem: boolean;
  spacingSystem: boolean;
  typographySystem: boolean;
  missing: string[];
} {
  // 数据驱动风格必须的颜色变量
  const colorVars = [
    '--dd-primary',
    '--dd-primary-hover',
    '--dd-primary-active',
    '--dd-success',
    '--dd-warning',
    '--dd-error',
    '--dd-info',
    '--dd-series-1',
    '--dd-series-2',
    '--dd-series-3',
  ];
  
  // 必要的TDesign兼容变量
  const tdVars = [
    '--td-primary-color',
    '--td-brand-color',
    '--td-success-color',
    '--td-warning-color',
    '--td-error-color',
    '--td-text-color-primary',
    '--td-text-color-secondary',
    '--td-bg-color-page',
    '--td-bg-color-container',
    '--td-border-radius',
    '--td-shadow-1',
  ];
  
  // 间距系统变量
  const spacingVars = [
    '--td-spacing-1',
    '--td-spacing-2',
    '--td-spacing-3',
    '--td-spacing-4',
    '--td-spacing-5',
    '--td-spacing-6',
    '--td-spacing-7',
    '--td-spacing-8',
  ];
  
  // 排版系统变量
  const typographyVars = [
    '--td-font-family',
    '--td-font-size-s',
    '--td-font-size-base',
    '--td-font-size-l',
    '--td-font-size-xl',
  ];
  
  // 检查网格单位
  const gridUnitValid = checkVarDefined('--grid-unit');
  
  // 验证所有变量
  const allVars = [...colorVars, ...tdVars, ...spacingVars, ...typographyVars];
  const { valid, missing, results } = validateDesignTokens(allVars);
  
  // 检查每个系统的有效性
  const colorSystem = colorVars.every(v => results[v]) && tdVars.slice(0, 5).every(v => results[v]);
  const spacingSystem = spacingVars.every(v => results[v]) && gridUnitValid;
  const typographySystem = typographyVars.every(v => results[v]);
  
  return {
    valid: valid && gridUnitValid,
    colorSystem,
    spacingSystem,
    typographySystem,
    missing: gridUnitValid ? missing : [...missing, '--grid-unit']
  };
}

/**
 * 检查令牌可用性并输出结果
 */
export function validateAndReportTokens(): void {
  const result = validateDataDrivenTokens();
  
  console.group('数据驱动风格设计系统令牌验证');
  console.log(`总体验证: ${result.valid ? '✅ 通过' : '❌ 失败'}`);
  console.log(`颜色系统: ${result.colorSystem ? '✅ 通过' : '❌ 失败'}`);
  console.log(`间距系统: ${result.spacingSystem ? '✅ 通过' : '❌ 失败'}`);
  console.log(`排版系统: ${result.typographySystem ? '✅ 通过' : '❌ 失败'}`);
  
  if (result.missing.length > 0) {
    console.warn('缺失的令牌:', result.missing);
    console.warn('请检查CSS变量定义，确保所有必要的设计令牌都已定义。');
  }
  
  console.groupEnd();
} 