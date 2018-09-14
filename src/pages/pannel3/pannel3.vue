<template>
    <div class="pannel3">
        <div>
            <head-bar :title="'工程完工分析'" :time="nowDate"></head-bar>
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
                            <doublebar-chart :data="qywgData" :count="count"></doublebar-chart>
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
                                            <div class="num" style="color:#3AC868;font-size: 25px;margin-bottom: 20px;">{{wgtjData.dnwgmb}}</div>
                                            <h4>已完成</h4>
                                            <div class="num" style="color:#F9B74C;font-size: 25px;">{{wgtjData.dnwgwcl}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div col="1" flex-column>
                                    <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">当月完工</h4>
                                    <div col="6" flex>
                                        <div id="pieItems2" col="4"></div>
                                        <div col="2" flex-column rowcenter>
                                            <h4>当月目标</h4>
                                            <div class="num" style="color:#3AC868;font-size: 24px;margin-bottom: 25px;">{{wgtjData.bywgjh}}</div>
                                            <h4>已完成</h4>
                                            <div class="num" style="color:#F9B74C;font-size: 25px;">{{wgtjData.bywgwcl}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div col="1" flex>
                               <arrow-bar :done="Number(wgtjData.dnwgwcl)" :total="Number(wgtjData.dnwgmb)" ></arrow-bar>
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
                                            <div class="num" style="color:#E85650;font-size: 25px;margin-bottom: 20px;">{{wgtjData.wnwgmb}}</div>
                                            <h4>已完成</h4>
                                            <div class="num" style="color:#37A2F7;font-size: 25px;">{{wgtjData.wnwgwcl}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div col="1" flex-column>
                                    <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">当月完工</h4>
                                    <div col="6" flex>
                                        <div id="pieItems4" col="4"></div>
                                        <div col="2" flex-column rowcenter>
                                            <h4>当月目标</h4>
                                            <div class="num" style="color:#E85650;font-size: 25px;margin-bottom: 20px;">{{wgtjData.bywnwgjh}}</div>
                                            <h4>已完成</h4>
                                            <div class="num" style="color:#27A6F6;font-size: 25px;">{{wgtjData.bywnwgwcl}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div col="1">
                                <arrow-bar :done="Number(wgtjData.wnwgwcl)" :total="Number(wgtjData.wnwgmb)" ></arrow-bar>
                            </div>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { getMyDate } from '../../utils.js'
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
            pie1Value: [
                { value: 35, name: '未完成' },
                { value: 310, name: '已完成' },
            ],
            pie2Value: [
                { value: 335, name: '未完成' },
                { value: 310, name: '已完成' },
            ],
            pie3Value: [
                { value: 335, name: '未完成' },
                { value: 310, name: '已完成' },
            ],
            pie4Value: [
                { value: 335, name: '未完成' },
                { value: 310, name: '已完成' },
            ],
            count:0,
            qywgData:[],
            nowDate:'',
            wgtjData:{}
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
            this.initMap();
        });
        this.$get(this.API.queryYqWgData,{
                isYs:false
            }).then(res=>{
                if(res.data.state == 'success'){
                this.count = 1;
                let qymcArr = [];  
                let mbArr = [];
                let ywcArr = [];
                res.data.data.forEach(ele=>{
                    qymcArr.push(ele.qymc.split('区域工程')[0]);
                    mbArr.push(ele.mbwcl);
                    ywcArr.push(ele.wcl);
                })
                this.qywgData[0] = qymcArr;
                this.qywgData[1] = mbArr;
                this.qywgData[2] = ywcArr;
            }
        })
        this.queryProjectCompletionPanel();
        this.nowDate = getMyDate(new Date());
    },
    mounted() {},
    methods: {
        queryProjectCompletionPanel(qymc){
             this.$get(this.API.queryProjectCompletionPanel,{
                curPage:1,
                pageSize:999,
                qymc:qymc
            }).then(res=>{
                if(res.data.state == 'success'){
                    this.wgtjData = res.data.data
                    this.pie1Value[0].value = (Number(res.data.data.dnwgmb)-Number(res.data.data.dnwgwcl)) < 0 ? 0 : Number(res.data.data.dnwgmb)-Number(res.data.data.dnwgwcl)
                    this.pie1Value[1].value = res.data.data.dnwgwcl
                    
                    this.pie2Value[0].value = Number(res.data.data.bywgjh)-Number(res.data.data.bywgwcl) < 0 ? 0 : Number(res.data.data.bywgjh)-Number(res.data.data.bywgwcl)
                    this.pie2Value[1].value = res.data.data.bywgwcl

                    this.pie3Value[0].value = Number(res.data.data.wnwgmb)-Number(res.data.data.wnwgwcl) < 0 ? 0 : Number(res.data.data.wnwgmb)-Number(res.data.data.wnwgwcl)
                    this.pie3Value[1].value = res.data.data.wnwgwcl

                    this.pie4Value[0].value = Number(res.data.data.bywnwgjh)-Number(res.data.data.bywnwgwcl) < 0 ? 0 : Number(res.data.data.bywnwgjh)-Number(res.data.data.bywnwgwcl)
                    this.pie4Value[1].value = res.data.data.bywnwgwcl
                    this.initChart('pieItems1', this.pie1Value);
                    this.initChart('pieItems2', this.pie2Value);
                    this.initChart('pieItems3', this.pie3Value, ['#E85650', '#37A2F7']);
                    this.initChart('pieItems4', this.pie4Value, ['#E85650', '#37A2F7']);
                }
            })
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
                    formatter: "{b}: {c} ({d}%)",
                    position:[20,20]
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