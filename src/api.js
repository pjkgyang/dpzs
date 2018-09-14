/**
 * WEBPACK_CONIFG_HOST的值，在webpack.config.js中更改
 * 开发环境时 = "http://amptest.wisedu.com/xsfwfw/"
 * 发布环境时 = location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"
 */

export default {
    getDictEnum: WEBPACK_CONFIG_HOST + 'dict/getDictEnum.do',
    queryOverallPanel: WEBPACK_CONFIG_HOST + 'panel/queryOverallPanel.do',             // 获取综合面板数据
    querySchoolQuestionPanel:WEBPACK_CONFIG_HOST + 'panel/querySchoolQuestionPanel.do', // 获取学校问题面板数据
    queryCostAnalysisPanel:WEBPACK_CONFIG_HOST + 'panel/queryCostAnalysisPanel.do', // 获取成本分析数据
    queryProjectAcceptancePanel:WEBPACK_CONFIG_HOST + 'panel/queryProjectAcceptancePanel.do',// 获取验收面板数据
    queryPersonnelPanel:WEBPACK_CONFIG_HOST + 'panel/queryPersonnelPanel.do',// 获取个人数据
    queryProjectCompletionPanel:WEBPACK_CONFIG_HOST + 'panel/queryProjectCompletionPanel.do',// 获取完工面板数据
    queryYqWgData:WEBPACK_CONFIG_HOST + 'panel/queryYqWgData.do',//获取区域完工,验收数据
    queryRegionSubcontractEfficiency:WEBPACK_CONFIG_HOST + 'panel/queryRegionSubcontractEfficiency.do',//获取分包效率
    queryRegionCostStat:WEBPACK_CONFIG_HOST + 'panel/queryRegionCostStat.do'//获取区域成本统计
    
}
