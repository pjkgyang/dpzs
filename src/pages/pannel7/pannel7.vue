<template>
    <div class="app pannel7">
        <div>
            <head-bar :title="'工程综合概况'" :time="'2018/08/08 00:00:00'"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <!-- 左侧 -->
                <aside class="left-statics" flex-column col="2">
                    <div col="2" flex-column :row='false'>
                        <div class="top" flex col="3">
                            <Card class="" col="4" title="验收统计" flex>
                                <div class="statics bottom-split" flex-column col="1">
                                    <h3 col="1" flex rowcenter colcenter style="background-image: linear-gradient(-180deg, rgba(0, 134, 227,0.6) 0%, rgba(0,113,221,0.5) 21%, rgba(0,89,214,0.4) 46%, rgba(0,70,209,0.00) 97%);">全年计划</h3>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">全年目标</div>
                                        <div class="num">1034000</div>
                                    </div> 
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">已完成</div>
                                        <div class="num">200000</div>
                                    </div>
                                </div>
                                <div class="statics" flex-column col="1">
                                    <h3 col="1" flex rowcenter colcenter style="background-image: linear-gradient(-180deg, rgb(227, 144, 0,0.5) 0%, rgba(221,206,0,0.3) 20%, rgba(214,213,0,0.1) 48%, rgba(209,202,0,0.00) 100%);">本月计划</h3>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">本月计划</div>
                                        <div class="num">1000000</div>
                                    </div>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">已完成</div>
                                        <div class="num">13000</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div class="" col="3" flex>
                            <Card class="" col="4" title="完工统计" flex>
                                <div class="statics bottom-split" flex-column col="1">
                                    <h3 col="1" flex rowcenter colcenter style="background-image: linear-gradient(-180deg, rgba(227, 0, 0,0.5) 0%, rgba(255,42,42,0.4) 22%, rgba(240,33,33,0.2) 48%, rgba(209,0,0,0.00) 100%);">全年计划</h3>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">全年目标</div>
                                        <div class="num">1034000</div>
                                    </div>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">已完成</div>
                                        <div class="num">200000</div>
                                    </div>
                                </div>
                                <div class="statics" flex-column col="1">
                                    <h3 col="1" flex rowcenter colcenter style="background-image: linear-gradient(-180deg, rgb(227, 144, 0,0.5) 0%, rgba(221,206,0,0.3) 20%, rgba(214,213,0,0.1) 48%, rgba(209,202,0,0.00) 100%);">本月计划</h3>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">本月计划</div>
                                        <div class="num">1000000</div>
                                    </div>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">已完成</div>
                                        <div class="num">13000</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </aside>
                <main flex-column col="4">
                    <div class="" flex col="6">
                        <Card class="" col="4" title="" flex>
                            <div col="5" flex style="position:relative;">
                                <div col="1">
                                    <div class="circle circle1" flex-column center>
                                        <span class="num">564</span>
                                        <span>客户数</span>
                                    </div>
                                    <div class="circle circle2" flex-column center>
                                        <span class="num">864</span>
                                        <span>总项目数</span>
                                    </div>
                                </div>
                                <div ref="chinamap" col="4" id="chinamap"></div>
                            </div>
                            <div col="1" flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">2</div>
                                    <h3>在建</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">23</div>
                                    <h3>售后</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">40</div>
                                    <h3>过保</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">2</div>
                                    <h3>在谈</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">2</div>
                                    <h3>终止</h3>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="人员统计">
                            <div flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num fontsize60">114</div>
                                    <h3>人员总数</h3>
                                </div>
                            </div>
                            <div flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num2 fontsize60">114</div>
                                    <h3>实习</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num1 fontsize60">24</div>
                                    <h3>正式</h3>
                                </div>
                            </div>
                        </Card>
                        <Card col="3" title="分包统计">
                            <div flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num fontsize60">114</div>
                                    <h3>完工量</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num fontsize60">90%</div>
                                    <h3>效率</h3>
                                </div>
                            </div>
                            <div flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num1 fontsize60">114</div>
                                    <h3>人力</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num2 fontsize60">24</div>
                                    <h3>二开</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">24</div>
                                    <h3>可变</h3>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="" flex-column col="2">
                    <div class="" flex-column col="6">
                        <Card class="projects" col="1" title="问题统计" :gradient='["rgba(214,0,0,0.5)","rgba(214,0,0,0.1)"]'>
                            <div style="flex-wrap: wrap;" flex spacebetween>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">未回复</span>
                                    <span class="num">14</span>
                                </div>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">逾期未响应</span>
                                    <span class="num">10</span>
                                </div>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">逾期未完成</span>
                                    <span class="num">10</span>
                                </div>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">投诉</span>
                                    <span class="num">10</span>
                                </div>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">不满意</span>
                                    <span class="num">10</span>
                                </div>
                            </div>
                        </Card>
                        <Card class="projects" col="1" title="使用率" flex style="position:relative;" :gradient='["rgba(221,206,0,0.5)","rgba(209,202,0,0.1)"]'>
                            <div style="flex-wrap: wrap;" flex spacebetween>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">应用总量</span>
                                    <span class="num">20</span>
                                </div>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">访问总量</span>
                                    <span class="num">10</span>
                                </div>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">用户总量</span>
                                    <span class="num">10</span>
                                </div>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">本月访问量</span>
                                    <span class="num">10</span>
                                </div>
                                <div flex colcenter spacearound class="projects-box">
                                    <span class="text">本来用户量</span>
                                    <span class="num">10</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="项目动态">
                            <table class="table" v-if="ranks.length > 0">
                                <tr v-for="(e,index) in ranks" :key="index">
                                    <td>{{e.companyName}}</td>
                                    <td>{{e.signTime}}</td>
                                    <td style="color:#F2A51B">已验收</td>
                                </tr>
                            </table>
                            <no-data col="1" v-else />
                        </Card>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import headBar from '../../components/header.vue'
import numCardGroup from '../../components/numCardGroup.vue'
import progressBarGroup from '../../components/progressBarGroup.vue'
import Card from '../../components/Card.vue'
import doublebarChart from '../../components/doublebarChart.vue'
import arrowBar from '../../components/arrowBar.vue'
import mapChina from '../../components/mapChina.vue'
import noData from '../../components/noData.vue'
import provinceArr from '../../../static/mapjson/province.js'
import echarts from 'echarts'
var json = require('echarts/map/json/china.json')

export default {
    data() {
        return {
            currentProvince:provinceArr,
            summary: {
                totalNum: 864
            },
            areaStatisc: [],
            waitDealEvent: [],
            intervalIndex: {},
            jobDistributes: [{
                name: "未响应",
                value: 34
            }, {
                name: "未解决",
                value: 10
            }, {
                name: "正常",
                value: 50
            }],
            ranks: [{
                "signTime": "2018-04-13",
                "companyName": "1合肥职业技术学院",
                "position": "主任/处长/部长",
                "department": "信息（网络）中心",
                "userName": "10",
                current: "校长",
                overdate: 20
            }, {
                "signTime": "2018-04-13",
                "companyName": "2合肥职业技术学院",
                "position": "主任/处长/部长",
                "department": "信息（网络）中心",
                "userName": "9",
                current: "校长",
                overdate: 20
            }, {
                "signTime": "2018-04-13",
                "companyName": "3浙江机电职业手术室",
                "department": "",
                "userName": "8",
                current: "校长",
                overdate: 20
            }, {
                "signTime": "2018-04-13",
                "companyName": "4浙江机电职业技术学院",
                "position": "老师",
                "department": "学工处",
                "userName": "7",
                current: "校长",
                overdate: 20
            }, {
                "signTime": "2018-04-13",
                "companyName": "4浙江机电职业技术学院",
                "position": "老师",
                "department": "学工处",
                "userName": "7",
                current: "校长",
                overdate: 20
            }],
            pie1Value: [
                { value: 35, name: '人力' },
                { value: 310, name: '二开' },
                { value: 230, name: '可变' }
            ],
        }
    },
    created() {
        this.$nextTick(() => {
            this.initMap();
        });
    },
    mounted() {},
    watch: {
        currentProvince(){
            this.$nextTick(() => {
                this.initMap();
            });
        }
    },
    methods: {
        //卡片右上角按钮
        chooseBtn() {
            alert('')
        },
        initMap() {
            var _this = this
            // 绘图方法
            echarts.registerMap('china', json);
            this.chart = echarts.init(this.$refs.chinamap);
            // 皮肤添加同一般使用方式
            this.chart.showLoading()
            this.chart.setOption({

                geo: {
                    map: 'china',
                },
                series: [{
                    type: 'map',
                    mapType: 'china', // 自定义扩展图表类型
                    itemStyle: {
                        normal: { //未选中状态
                            areaColor: '#a2bbc5', //背景颜色
                        },
                    },
                    data: _this.currentProvince
                }]
            });
            this.chart.hideLoading();
            this.chart.on('click', function(params) {
                console.log(params)
                //联动区域
                let tempArr = JSON.parse(JSON.stringify(provinceArr))
                if(params.name=='黑龙江'||params.name=='吉林'||params.name=='辽宁'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='黑龙江'||item.name=='吉林'||item.name=='辽宁'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='湖北'||params.name=='湖南'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='湖北'||item.name=='湖南'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='安徽'||params.name=='上海'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='安徽'||item.name=='上海'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='陕西'||params.name=='甘肃'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='陕西'||item.name=='甘肃'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='河北'||params.name=='天津'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='河北'||item.name=='天津'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='四川'||params.name=='重庆'||params.name=='云南'||params.name=='贵州'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='四川'||item.name=='重庆'||item.name=='云南'||item.name=='贵州'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else{
                    tempArr.forEach((item,index)=>{
                        if(item.name==params.name){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }
                _this.currentProvince = tempArr
            });
        },
        initChart(id, value, color = ['#3AC868', '#F9B74C', '#E85650', '#37A2F7']) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },

                series: [{
                    type: 'pie',
                    radius: ['40%', '70%'],
                    // avoidLabelOverlap: false,
                    color: color,
                    label: {
                        show: false,
                        fontSize: 14,
                        fontFamily: "DINCondensed",
                        fontWeight: "bolder",
                        position: "inside",
                        textBorderWidth: 0,
                        align: "right",
                        formatter: "{b}:{d}%"
                    },
                    data: value
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
    },

    components: {
        doublebarChart,
        numCardGroup,
        progressBarGroup,
        Card,
        mapChina,
        noData,
        arrowBar,
        headBar
    },
}
</script>
<style lang="scss" scoped>
@import '../../../static/css/sass/resources/tools.scss';
@import '../../../static/css/sass/resources/settings.scss';
.pannel7 {
    height: 100%;
    display: flex;
    min-height: 670px;
    flex-direction: column;
    .left-statics {
        h3 {
            font-size: 16px;
        }
        .text {
            font-size: 14px;
        }
        .num {
            font-size: 30px;
        }
        .bottom-split {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1)
        }
    }
    .projects {
        .projects-box {
            width: 130px;
            height: 50px;
            float: left;
        }
        .text {
            display: inline-block;
            width: 80px;
            font-size: 16px;
        }
        .num {
            display: inline-block;
            width: 20px;
            font-size: 30px;
        }
    }
    .circle {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        .num {
            font-size: 50px;
        }
    }
    .circle1 {
        left: 5px;
        bottom: 200px;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#FAD961), to(#F76B1C));
    }
    .circle2 {
        left: 5px;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#61A5FA), to(#1C5AF7));
        bottom: 50px;
    }
    .totalStatics-item {
        .num.num1 {
            @include gradient(#B4EC51, #429321);
        }
        .num.num2 {
            @include gradient(#FFAF91, #F71C1C);
        }
        .num.num3 {
            @include gradient(#FFD891, #F7791C);
        }
    }

    table {
        table-layout: fixed;
        width: 100%;
        height: 100%;
        th {
            text-align: center;
            color: #999;
        }
        td {
            text-align: center;
            @include truncate(70%);
        }
        .title {
            border-left: 5px solid #F9B74C;
            padding-left: 10px;
        }
        td.date {
            text-align: right;
        }
        .current {
            color: #419EF8;
        }
        .overdate {
            color: #F9B74C;
        }
    }
    span.titlebutton {
        font-size: 12px;
        display: inline-block;
        padding: 4px 12px;
        border: 1px solid rgba(255, 255, 255, 0.50);
        border-radius: 3px;
        cursor: pointer;
    }
    span.titlebtnactive {
        background: #27A6F6;
        border: 1px solid #27A6F6;
    }
}
</style>