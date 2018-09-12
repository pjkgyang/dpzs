<template>
    <div class="pannel6">
        <div>
            <head-bar :title="'工程成本分析'" :time="'2018/08/08 00:00:00'"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <!-- 左侧 -->
                <aside class="" flex-column col="2">
                    <div col="2" flex-column :row='false'>
                        <div class="top" flex col="6">
                            <Card class="" col="4" title="成本统计" flex :gradient='["#0086E3","rgba(0,70,209,0.33)"]'>
                                <div col="1" flex-column spacearound>
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
                                </div>
                                <div col="1" id="pieItems1">
                                </div>
                            </Card>
                        </div>
                        <div class="" col="3" flex>
                            <Card col="3" title="结算排名">
                                <table class="table" v-if="ranks.length > 0">
                                    <thead>
                                        <th width="90">区域</th>
                                        <th width="90">姓名</th>
                                        <th width="120">入职时间</th>
                                        <th width="90">金额</th>
                                    </thead>
                                    <tr v-for="(e,index) in ranks" :key="index">
                                        <td>{{e.area}}</td>
                                        <td>{{e.name}}</td>
                                        <td>{{e.time}}</td>
                                        <td>{{e.money}}</td>
                                    </tr>
                                </table>
                                <no-data col="1" v-else />
                            </Card>
                        </div>
                    </div>
                </aside>
                <main flex-column col="4">
                    <div class="" flex col="6">
                        <Card class="" col="4" title="" flex>
                            <div ref="chinamap" id="chinamap"></div>
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="分包效率">
                            <doublebar-chart></doublebar-chart>
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="" flex-column col="2">
                    <div class="" flex-column col="6">
                        <Card class="projects" col="1" title="软件项目" flex rowcenter style="position:relative;">
                            <span style="position:absolute;top:16px;right:16px;">
                                <template v-for="(items,index) in tabbtn">
                                    <span :class="{'titlebutton':true,'titlebtnactive':index==curTabindex1}" @click='chooseBtn1(index)'>{{items}}</span>
</template>
</span>
<div col="1" flex style="width:90%;margin: 0 auto;">
    <div flex col="1" spacebetween colcenter>
        <div flex spacebetween colcenter style="background-image: linear-gradient(-180deg, rgb(227, 144, 0,0.6) 0%, rgba(221,206,0,0.4) 20%, rgba(214,213,0,0.2) 48%, rgba(209,202,0,0.00) 100%);width:100%;height:50px;padding:0 20px;">
            <span class="text">效率</span>
            <span class="num">40%</span>
        </div>
    </div>
</div>
<div col="1" flex spacebetween>
    <div flex col="1" spacearound colcenter>
        <span class="text">完工</span>
        <span class="num">200</span>
    </div>
    <div flex col="1" spacearound colcenter>
        <span class="text">验收</span>
        <span class="num">180</span>
    </div>
</div>
<div col="1" flex spacebetween>
    <div flex col="1" spacearound colcenter>
        <span class="text">收入</span>
        <span class="num">200</span>
    </div>
    <div flex col="1" spacearound colcenter>
        <span class="text">成本</span>
        <span class="num">180</span>
    </div>
</div>
</Card>
<Card class="projects" col="1" title="其他项目" flex style="position:relative;">
    <span style="position:absolute;top:16px;right:16px;">
                                <span v-for="(items,index) in tabbtn" :class="{'titlebutton':true,'titlebtnactive':index==curTabindex2}" @click='chooseBtn2(index)'>{{items}}</span>
    </span>
    <div col="1" flex spacebetween>
        <div flex col="1" spacearound colcenter>
            <span class="text">完工</span>
            <span class="num">200</span>
        </div>
        <div flex col="1" spacearound colcenter>
            <span class="text">验收</span>
            <span class="num">180</span>
        </div>
    </div>
    <div col="1" flex spacebetween>
        <div flex col="1" spacearound colcenter>
            <span class="text">收入</span>
            <span class="num">200</span>
        </div>
        <div flex col="1" spacearound colcenter>
            <span class="text">成本</span>
            <span class="num">180</span>
        </div>
    </div>
</Card>
</div>
<div class="" col="3" flex>
    <Card col="3" title="过保项目">
        <div flex spacearound>
            <div class="totalStatics-item" flex-column center>
                <div class="num fontsize60">200</div>
                <h3>过保项目数</h3>
            </div>
            <div class="totalStatics-item" flex-column center>
                <div class="num fontsize60">50</div>
                <h3>继续服务数</h3>
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
</aside>
</div>
</div>
</div>
</template>
<script type="text/javascript">
import headBar from '../../components/header.vue'
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
            curTabindex1: 0,
            curTabindex2: 0,
            tabbtn: ["当年", "往年"],
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
                }
            ],
            pie1Value: [
                { value: 35, name: '人力' },
                { value: 310, name: '二开' },
                { value: 230, name: '可变' }
            ],
        }
    },
    created() {
        this.$nextTick(() => {
            this.initChart('pieItems1', this.pie1Value);
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
        //卡片右上角按钮
        chooseBtn1(index) {
            this.curTabindex1 = index
        },
        chooseBtn2(index) {
            this.curTabindex2 = index
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
.pannel6 {
    height: 100%;
    display: flex;
    min-height: 670px;
    flex-direction: column;
    .projects {
        .text {
            font-size: 16px;
        }
        .num {
            font-size: 20px;
        }
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