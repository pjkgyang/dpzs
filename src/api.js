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
    queryRegionCostStat:WEBPACK_CONFIG_HOST + 'panel/queryRegionCostStat.do',//获取区域成本统计
    queryContractData:WEBPACK_CONFIG_HOST+'panel/queryContractData.do',//获取合同数据
    

    // 报表
    panelPersonnel:WEBPACK_CONFIG_HOST+'panelReport/panelPersonnel.do',//人员
    panelCompletion:WEBPACK_CONFIG_HOST+'panelReport/panelCompletion.do',//验收完工
    queryProjectHumanCost:WEBPACK_CONFIG_HOST+'panelReport/queryProjectHumanCost.do',//工程人力
    querySecondaryDevelopment:WEBPACK_CONFIG_HOST+'panelReport/querySecondaryDevelopment.do',//二次开发
    queryExpenseAccount:WEBPACK_CONFIG_HOST+'panelReport/queryExpenseAccount.do',//报销（可变）
    queryPanelCompletionData:WEBPACK_CONFIG_HOST+'panelReport/queryPanelCompletionData.do',//完工
    queryPanelAcceptanceData:WEBPACK_CONFIG_HOST+'panelReport/queryPanelAcceptanceData.do',//验收

    // 获取当前登录人
    getLoginUser:WEBPACK_CONFIG_HOST+'sys/getLoginUser.do?',
    getResponsibleTaskList:WEBPACK_CONFIG_HOST+'dict/getResponsibleTaskList.do',//枚举
    getDwByUser:WEBPACK_CONFIG_HOST+'sys/getDwByUser.do',//获取单位

    // 服务台
    getPanelData:WEBPACK_CONFIG_HOST+'servicedesk/getPanelData.do', // 获取大屏数据
    pageAppStat:WEBPACK_CONFIG_HOST+'servicedesk/pageAppStat.do', // 获取应用统计分页数据
    pageRecentRequest:WEBPACK_CONFIG_HOST+'servicedesk/pageRecentRequest.do', // 最近请求分页列表
    pageDeptServiceDesk:WEBPACK_CONFIG_HOST+'servicedesk/pageDeptServiceDesk.do', // 部门统计分页列表
    increasedStat:WEBPACK_CONFIG_HOST+'servicedesk/increasedStat.do', // 折线统计
}
