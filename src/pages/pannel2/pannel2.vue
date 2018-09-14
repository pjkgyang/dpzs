<template>
    <div class="pannel2">
        <div>
            <head-bar :title="'工程验收分析'" :time="nowDate"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <main flex-column col="3">
                    <div class="top" flex col="6">
                        <Card class="secure__map" col="4" title="" flex>
                            <div ref="chinamap" id="chinamap"></div>
                        </Card>
                    </div>
                    <div class="secure__detail" col="4" flex>
                        <Card col="3" title="区域验收统计">
                            <doublebar-chart :data="qyysData" :count="count"></doublebar-chart>
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="secure__rightaside" flex-column col="2">
                    <Card col="6" title="验收动态">
                        <div style="padding:20px 30px;" @mouseover="handleCloseTimer" @mouseout="handleStartTimer">
                             <div style="overflow:hidden"  v-if="ysdtData.length > 0"> 
                                <table class="table"  :class="{animys:animate==true}">
                                    <tr v-for="(item,index) in ysdtData" :key="index" >
                                        <td :title="item.xmmc">{{item.xmmc}}</td>
                                        <td class="date">{{item.yssj}}</td>
                                        <td class="date" style="color:#F2A51B">{{item.xmzt}}</td>
                                    </tr>
                                </table>
                            </div>
                            <no-data col="1" v-else />
                        </div>
                    </Card>
                    <Card col="4" flex :row=true>
                        <div col="1" flex-column>
                            <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">全年目标</h4>
                            <div col="6" flex>
                                <div id="pieItems1" col="4"></div>
                                <div col="2" flex-column rowcenter>
                                    <h4>全年目标</h4>
                                    <div class="num" style="color:#F9B74C;font-size: 25px;margin-bottom: 20px;">{{pannelData.dnysmb}}</div>
                                    <h4>已完成</h4>
                                    <div class="num" style="color:#3AC868;font-size: 25px;">{{pannelData.dnyswcl}}</div>
                                </div>
                            </div>
                        </div>
                        <div col="1" flex-column>
                            <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">本月目标</h4>
                            <div col="6" flex>
                                <div id="pieItems2" col="4"></div>
                                <div col="2" flex-column rowcenter>
                                    <h4>本月目标</h4>
                                    <div class="num" style="color:#E85650;font-size: 25px;margin-bottom: 20px;">{{pannelData.byysjh}}</div>
                                    <h4>已完成</h4>
                                    <div class="num" style="color:#27A6F6;font-size: 25px;">{{pannelData.byyswcl}}</div>
                                </div>
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
import barChart from '../../components/barChart.vue'
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
                { value: 0, name: '未完成' },
                { value: 0, name: '已完成' },
            ],
            pie2Value: [
                { value: 335, name: '未完成' },
                { value: 310, name: '已完成' },
            ],
            
            currentProvince:provinceArr,
            animate:false,
            qyysData:[],
            pannelData:{},
            ysdtData:[],
            count:0,
            nowDate:'',
            timer:null
        }
    },
    watch: {
        currentProvince(){
            this.$nextTick(() => {
                this.initMap();
            });
        },
    },
    created() {
        this.$nextTick(() => {
            this.initMap();
        });
        this.queryProjectAcceptancePanel();
        //  获取验收统计
        this.$get(this.API.queryYqWgData,{
                isYs:true
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
                this.qyysData[0] = qymcArr;
                this.qyysData[1] = mbArr;
                this.qyysData[2] = ywcArr;
            }
        })
        
        this.nowDate = getMyDate(new Date());
    },
    mounted() {},
    methods: {
        handleCloseTimer(){
           clearInterval(this.timer);
        },
        handleStartTimer(){
           this.timer = setInterval(this.scroll,1000);  
        },
        scroll(){
                this.animate=true;    
                setTimeout(()=>{     
                    this.ysdtData.push(this.ysdtData[0]); 
                    this.ysdtData.shift();              
                    this.animate = false; 
             },500)
         },
          queryProjectAcceptancePanel(qymc){
            this.$get(this.API.queryProjectAcceptancePanel,{
                curPage:1,
                pageSize:99999,
                qymc:qymc
            }).then(res=>{
                if(res.data.state == 'success'){
                    this.pannelData = res.data.data
                    this.ysdtData = res.data.data.ysData
                    this.pie1Value[0].value = (Number(res.data.data.dnysmb)-Number(res.data.data.dnyswcl))<0?0:Number(res.data.data.dnysmb)-Number(res.data.data.dnyswcl)
                    this.pie1Value[1].value = res.data.data.dnyswcl
                    
                    this.pie2Value[0].value = (Number(res.data.data.byysjh)-Number(res.data.data.byyswcl))<0?0:Number(res.data.data.byysjh)-Number(res.data.data.byyswcl)
                    this.pie2Value[1].value = res.data.data.byyswcl
                    
                    this.initChart1();
                    this.initChart2();
                    if(this.ysdtData.length > 5){
                        this.timer = setInterval(this.scroll,1000);
                    }
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
        initChart1() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('pieItems1'));
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)",
                    position: function(point, params, dom, rect, size){
                        //其中params为当前鼠标的位置
                        return [params[0]-220,'10%'];

                        }
                },

                series: [{
                    type: 'pie',
                    radius: ['40%', '70%'],
                    // avoidLabelOverlap: false,
                    color:['#D1D1D1', '#3AC868'],
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
                    data: this.pie1Value
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        initChart2() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('pieItems2'));
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
                    color: ['#D1D1D1', '#27A6F6'],
                    label: {
                        show: false,
                        fontSize: 14,
                        fontFamily: "DINCondensed",
                        fontWeight: "bolder",
                        position: "inside",
                        textBorderWidth: 0,
                        align: "right",
                    },
                    labelLine: {
                        show: false
                    },
                    data: this.pie2Value
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },

    components: {
        doublebarChart,
        numCardGroup,
        progressBarGroup,
        Card,
        mapChina,
        noData,
        barChart,
        headBar
    },
}
</script>
<style lang="scss" scope>
@import '../../../static/css/sass/resources/tools.scss';
@import '../../../static/css/sass/resources/settings.scss';
.pannel2{
    height: 100%;
    display: flex;
    min-height: 670px;
    flex-direction: column;
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
            height: 40px;
            @include truncate(70%);
        }
        td:nth-child(1){
            width: 60%;
        }
        .title {
            border-left: 5px solid #F9B74C;
            padding-left: 10px;
        }
        td.date {
            text-align: center;
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