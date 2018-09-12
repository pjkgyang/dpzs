<template>
    <div class="pannel5">
         <div>
            <head-bar :title="'工程人员概况'" :time="'2018/08/08 00:00:00'"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <!-- 左侧 -->
                <aside class="" flex-column col="2">
                    <div col="2" flex-column :row='false'>
                        <div class="top" flex col="3">
                            <Card class="" col="4" title="人员统计" flex>
                                <div col="1" flex-column spacearound>
                                    <div flex spacearound colcenter>
                                        <span class="fontsize18">人员总数</span>
                                        <span class="num fontsize60">300</span>
                                    </div>
                                    <div flex spacearound>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num2 fontsize60">24</div>
                                            <h3>实习</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num1 fontsize60">114</div>
                                            <h3>正式</h3>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Card class="" col="6" flex-column>
                            <div col="1" flex colcenter>
                                <div col="1" flex colcenter spacearound><span class="dot dot1"></span>初级</div>
                                <div col="1" flex colcenter spacearound><span class="dot dot2"></span>中级</div>
                                <div col="1" flex colcenter spacearound><span class="dot dot3"></span>高级</div>
                            </div>
                            <div col="1" flex-column spacearound colcenter v-for="item in progress">
                                <div class="progress-outter">
                                    <span class="progress-low num" :style="{width:item.low*100/(item.low+item.mid+item.high) + '%'}">{{item.low}}</span>
                                    <span class="progress-mid num" :style="{width:item.mid*100/(item.low+item.mid+item.high) + '%'}">{{item.mid}}</span>
                                    <span class="progress-high num" :style="{width:item.high*100/(item.low+item.mid+item.high) + '%'}">{{item.high}}</span>
                                </div>
                                <h4>{{item.name}}</h4>
                            </div>
                        </Card>
                    </div>
                </aside>
                <main flex-column col="4">
                    <div class="" flex col="6">
                        <Card class="" col="4" title="人员挣值统计" flex>
                            <div ref="chinamap" id="chinamap" col="5"></div>
                            <div col="1" flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">2</div>
                                    <h3 class="arrowtop">200%以上</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">23</div>
                                    <h3 class="arrowtop">100%以上</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">40</div>
                                    <h3 class="arrowtop">75%以上</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num2 fontsize60">2</div>
                                    <h3 class="arrowdown">50%以下</h3>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div class="peoples" col="3" flex>
                        <Card col="3" title="人员动态">
                            <div col="1" flex spacebetween colcenter>
                                <div flex col="9" spacearound colcenter style="height:60px;background-image: linear-gradient(-180deg, rgba(0, 134, 227,0.6) 0%, rgba(0,113,221,0.3) 21%, rgba(0,89,214,0.2) 46%, rgba(0,70,209,0.04) 97%);">
                                    <span class="text">当年入职</span>
                                    <span class="num">60</span>
                                </div>
                                <div col="1">
                                    
                                </div>
                                <div flex col="9" spacearound colcenter style="height:60px;background-image: linear-gradient(-180deg, rgb(227, 0, 0,0.4) 0%, rgba(255,42,42,0.3) 22%, rgba(240,33,33,0.2) 48%, rgba(209,0,0,0.05) 100%);">
                                    <span class="text">当年离职</span>
                                    <span class="num">20</span>
                                </div>
                            </div>
                            <div col="1" flex spacebetween>
                                <div flex col="9" spacearound colcenter style="height:60px;background-image: linear-gradient(-180deg, rgba(0, 134, 227,0.6) 0%, rgba(0,113,221,0.3) 21%, rgba(0,89,214,0.2) 46%, rgba(0,70,209,0.04) 97%);">
                                    <span class="text">当月入职</span>
                                    <span class="num">20</span>
                                </div>
                                <div col="1">
                                    
                                </div>
                                <div flex col="9" spacearound colcenter style="height:60px;background-image: linear-gradient(-180deg, rgb(227, 0, 0,0.4) 0%, rgba(255,42,42,0.3) 22%, rgba(240,33,33,0.2) 48%, rgba(209,0,0,0.05) 100%);">
                                    <span class="text">当月离职</span>
                                    <span class="num">5</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="" flex-column col="2">
                    <div class="" flex-column col="3">
                        <Card col="3" title="人员挣值">
                            <table class="table" v-if="ranks.length > 0">
                                <thead>
                                    <th width="90">姓名</th>
                                    <th width="120">总挣值</th>
                                    <th width="90">效率</th>
                                </thead>
                                <tr v-for="(e,index) in ranks" :key="index">
                                    <td>{{e.name}}</td>
                                    <td>{{e.time}}</td>
                                    <td>{{e.money}}</td>
                                </tr>
                            </table>
                            <no-data col="1" v-else />
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="战队挣值">
                            <table class="table" v-if="ranks.length > 0">
                                <thead>
                                    <th width="90">姓名</th>
                                    <th width="120">总挣值</th>
                                    <th width="90">效率</th>
                                </thead>
                                <tr v-for="(e,index) in ranks" :key="index">
                                    <td>{{e.name}}</td>
                                    <td>{{e.time}}</td>
                                    <td>{{e.money}}</td>
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
            summary: {
                totalNum: 864
            },
            areaStatisc: [],
            waitDealEvent: [],
            intervalIndex: {},
            progress: [{
                name: "学工",
                low: 20,
                mid: 30,
                high: 40
            }, {
                name: "人事",
                low: 20,
                mid: 44,
                high: 40
            }, {
                name: "平台",
                low: 20,
                mid: 30,
                high: 50
            }, {
                name: "项目管理",
                low: 20,
                mid: 20,
                high: 40
            }],
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
                    area: "江苏",
                    name: "张三",
                    time: "2012.11.24",
                    money: "5000",
                },
                {
                    area: "江苏",
                    name: "张三",
                    time: "2012.11.24",
                    money: "5000",
                }, {
                    area: "江苏",
                    name: "张三",
                    time: "2012.11.24",
                    money: "5000",
                }, {
                    area: "江苏",
                    name: "张三",
                    time: "2012.11.24",
                    money: "5000",
                }, {
                    area: "江苏",
                    name: "张三",
                    time: "2012.11.24",
                    money: "5000",
                }, {
                    area: "江苏",
                    name: "张三",
                    time: "2012.11.24",
                    money: "5000",
                }
            ],
            pie1Value: [
                { value: 35, name: '人力' },
                { value: 310, name: '二开' },
                { value: 230, name: '可变' }
            ],
             currentProvince:provinceArr,
        }
    },
    created() {
        this.$nextTick(() => {
            this.initMap();
        });
    },
    watch: {
        currentProvince(){
            this.$nextTick(() => {
                this.initMap();
            });
        }
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
.pannel5 {
    height: 100%;
    display: flex;
    min-height: 670px;
    flex-direction: column;
    h3.arrowtop{
        background:url(../../../static/assets/arrowtop.png) 0 60% no-repeat;
        text-indent: 26px;
        background-size: 21px;
    }
    h3.arrowdown{
        background:url(../../../static/assets/arrowdown.png) 0 60% no-repeat;
        text-indent: 25px;
        background-size: 17px 16px;
    }
    .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
    .dot1 {
        background: #E9B042;
    }
    .dot2 {
        background: #9D81D2;
    }
    .dot3 {
        background: #37A2F7;
    }
    .progress-outter {
        width: 80%;
        font-size: 0;
        height: 28px;
        line-height: 28px;
        span {
            display: inline-block;
            height: 100%;
            font-size: 20px;
            text-align: center;
        }
        span.progress-low {
            background: #E9B042;
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;
        }
        span.progress-mid {
            background: #9D81D2;
        }
        span.progress-high {
            background: #37A2F7;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
        }
    }
    .peoples {
        .text {
            font-size: 16px;
        }
        .num {
            font-size: 35px;
        }
    }

    .num.num1 {
        @include gradient(#B4EC51, #429321);
    }
    .num.num2 {
        @include gradient(#FFAF91, #F71C1C);
    }
    .num.num3 {
        @include gradient(#FFD891, #F7791C);
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