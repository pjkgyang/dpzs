<template>
    <div class="pannel3">
        <div>
            <head-bar :title="'工程完工分析'" :time="'2018/08/08 00:00:00'"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <main flex-column col="3">
                    <div class="top" flex col="6">
                        <Card class="secure__map" col="4" title="完工统计" flex>
                            <div ref="chinamap" id="chinamap"></div>
                        </Card>
                    </div>
                    <div class="secure__detail" col="4" flex>
                        <Card col="3" title="区域完工统计">
                            <doublebar-chart></doublebar-chart>
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="secure__rightaside" flex-column col="2">
                    <Card col="2" flex-column :row=false>
                        <div col="2" flex-column>
                            <div flex col="3">
                                <div col="1" flex-column>
                                    <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">当年项目</h4>
                                    <div col="6" flex>
                                        <div id="pieItems1" col="4"></div>
                                        <div col="2" flex-column rowcenter>
                                            <h4>当年目标</h4>
                                            <div class="num" style="color:#3AC868;font-size: 25px;margin-bottom: 20px;">1140000</div>
                                            <h4>已完成</h4>
                                            <div class="num" style="color:#F9B74C;font-size: 25px;">114000</div>
                                        </div>
                                    </div>
                                </div>
                                <div col="1" flex-column>
                                    <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">当月完工</h4>
                                    <div col="6" flex>
                                        <div id="pieItems2" col="4"></div>
                                        <div col="2" flex-column rowcenter>
                                            <h4>当月目标</h4>
                                            <div class="num" style="color:#3AC868;font-size: 24px;margin-bottom: 25px;">1140000</div>
                                            <h4>已完成</h4>
                                            <div class="num" style="color:#F9B74C;font-size: 25px;">114000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div col="1" flex>
                               <arrow-bar></arrow-bar>
                            </div>
                        </div>
                        <div col="2" flex-column>
                            <div flex col="3">
                                <div col="1" flex-column>
                                    <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">往年项目</h4>
                                    <div col="6" flex>
                                        <div id="pieItems3" col="4"></div>
                                        <div col="2" flex-column rowcenter>
                                            <h4>往年目标</h4>
                                            <div class="num" style="color:#E85650;font-size: 25px;margin-bottom: 20px;">1140000</div>
                                            <h4>已完成</h4>
                                            <div class="num" style="color:#37A2F7;font-size: 25px;">114000</div>
                                        </div>
                                    </div>
                                </div>
                                <div col="1" flex-column>
                                    <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">当月完工</h4>
                                    <div col="6" flex>
                                        <div id="pieItems4" col="4"></div>
                                        <div col="2" flex-column rowcenter>
                                            <h4>当月目标</h4>
                                            <div class="num" style="color:#E85650;font-size: 25px;margin-bottom: 20px;">1140000</div>
                                            <h4>已完成</h4>
                                            <div class="num" style="color:#27A6F6;font-size: 25px;">114000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div col="1">
                                <arrow-bar :done=50 :total=100 color="#27A6F6"></arrow-bar>
                            </div>
                        </div>
                    </Card>
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

import echarts from 'echarts'
var json = require('echarts/map/json/china.json')
import provinceArr from '../../../static/mapjson/province.js'
export default {
    data() {
        return {
            summary: {
                totalNum: 864
            },
            currentProvince:provinceArr,
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
            pie1Value: [
                { value: 35, name: '终止' },
                { value: 310, name: '在建' },
            ],
            pie2Value: [
                { value: 335, name: '合同' },
                { value: 310, name: '在读' },
            ],
            pie3Value: [
                { value: 335, name: '合同' },
                { value: 310, name: '在读' },
            ],
            pie4Value: [
                { value: 335, name: '合同' },
                { value: 310, name: '在读' },
            ],
        }
    },
    watch: {
        currentProvince(){
            this.$nextTick(() => {
                this.initMap();
            });
        }
    },
    created() {
        this.$nextTick(() => {
            this.initChart('pieItems1', this.pie1Value);
            this.initChart('pieItems2', this.pie2Value);
            this.initChart('pieItems3', this.pie3Value, ['#E85650', '#37A2F7']);
            this.initChart('pieItems4', this.pie4Value, ['#E85650', '#37A2F7']);
            this.initMap();
        });
    },
    mounted() {},
    methods: {
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
<style lang="scss" scope>
@import '../../../static/css/sass/resources/tools.scss';
@import '../../../static/css/sass/resources/settings.scss';
.pannel3{
    height: 100%;
    display: flex;
    min-height: 670px;
    flex-direction: column;
    font-size: 14px;
    .totalStatics {
        h3 {
            font-size: 14px;
        }
        .totalStatics-item {
            width: 50%;
            h3 {
                font-size: 14px;
            }
            .num.overDate {
                @include gradient(#FFAF91, #F71C1C);
            }
            .num.partner {
                @include gradient(#B4EC51, #429321);
            }
        }
    }
    table {
        table-layout: fixed;
        width: 100%;
        height: 100%;
        th {
            text-align: left;
        }
        td {
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
}
</style>