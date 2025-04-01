/**
 * 数据表格组件视觉测试
 * 测试数据驱动风格的数据表格是否正确呈现
 */

describe('数据表格组件视觉测试', () => {
  beforeEach(() => {
    cy.visit('/#/test/datatable')
    // 等待页面加载完成
    cy.get('.test-container').should('be.visible')
  })

  it('应正确渲染表格基础结构', () => {
    cy.get('.dd-table-wrapper').should('be.visible')
    cy.get('.dd-table-header').should('be.visible')
    cy.get('.dd-table-body').should('be.visible')
  })

  it('应正确实现交替行颜色', () => {
    // 获取奇数行和偶数行，检查它们的样式是否不同
    cy.get('.dd-table-row-even').first().should('have.css', 'background-color')
    cy.get('.dd-table-row-odd').first().should('have.css', 'background-color')
    
    // 对比奇偶行的背景色
    cy.get('.dd-table-row-even').first().invoke('css', 'background-color').then((evenColor) => {
      cy.get('.dd-table-row-odd').first().invoke('css', 'background-color').then((oddColor) => {
        expect(evenColor).not.to.equal(oddColor)
      })
    })
  })

  it('应正确处理排序功能', () => {
    // 测试可排序表格
    cy.get('.table-section').eq(1).find('.dd-table-th').eq(0).click()
    
    // 检查排序图标是否显示
    cy.get('.table-section').eq(1).find('.dd-table-th').eq(0).contains('↑')
    
    // 再次点击，应切换排序顺序
    cy.get('.table-section').eq(1).find('.dd-table-th').eq(0).click()
    cy.get('.table-section').eq(1).find('.dd-table-th').eq(0).contains('↓')
  })

  it('应正确处理自定义单元格内容', () => {
    // 检查状态标签是否正确渲染
    cy.get('.table-section').eq(2).find('.status-badge').should('exist')
    cy.get('.status-success').should('be.visible')
    cy.get('.status-warning').should('be.visible')
    cy.get('.status-error').should('be.visible')
  })

  it('应正确处理空数据状态', () => {
    // 检查空数据提示是否显示
    cy.get('.table-section').eq(3).find('.dd-table-empty').should('be.visible')
    cy.get('.table-section').eq(3).find('.dd-table-empty').contains('暂无数据，请添加新数据')
  })

  it('应正确处理分页功能', () => {
    // 检查分页控件是否正确渲染
    cy.get('.table-section').eq(4).find('.dd-table-pagination').should('be.visible')
    cy.get('.table-section').eq(4).find('.dd-page-button').should('have.length.at.least', 3)
    
    // 测试分页切换
    cy.get('.table-section').eq(4).find('.dd-page-button').eq(2).click()
    cy.get('.table-section').eq(4).find('.dd-page-button-active').contains('2')
    
    // 测试每页显示条数
    cy.get('.table-section').eq(4).find('.dd-rows-select').select('10')
    cy.get('.table-section').eq(4).find('.dd-table-row').should('have.length', 10)
  })

  it('应正确响应暗黑模式切换', () => {
    // 保存当前表头背景色
    cy.get('.dd-table-header').first().invoke('css', 'background-color').as('lightModeHeaderColor')
    
    // 切换暗黑模式
    cy.get('.toggle-theme').click()
    
    // 检查暗黑模式下表头背景是否变化
    cy.get('.dd-table-header').first().invoke('css', 'background-color').then(function(darkModeColor) {
      expect(darkModeColor).not.to.equal(this.lightModeHeaderColor)
    })
    
    // 检查暗黑模式类是否被添加到文档
    cy.get('html').should('have.class', 'dark-mode')
  })
}) 