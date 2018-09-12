<template>
    <div class="pannel4">
        <div class="app__content">
            <div class="secure height100" flex>
                <main flex-column col="8">
                    <div class="top" flex col="6">
                        <aside class="secure__leftaside" flex col="2">
                            <Card class="totalStatics" col="3" title="综合统计" :gradient='["#0086E3","rgba(0,70,209,0.33)"]'>
                                <div textcenter flex-column>
                                    <div col="6" flex spacearound wrap>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num fontsize60">114</div>
                                            <h3>服务客户数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num fontsize60">24</div>
                                            <h3>总项目数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num fontsize60">114</div>
                                            <h3>在建项目数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num fontsize60">24</div>
                                            <h3>在售后项目数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num overDate fontsize60">35</div>
                                            <h3>过保项目数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num partner fontsize60">43</div>
                                            <h3>终止</h3>
                                        </div>
                                    </div>
                                    <div col="1" flex colcenter spacearound>
                                        <h3 class="fontsize16">在谈项目数</h3>
                                        <div class="num fontsize60">24</div>
                                    </div>
                                </div>
                            </Card>
                        </aside>
                        <Card class="secure__map" col="4" title="" flex>
                            <div ref="chinamap" id="chinamap"></div>
                        </Card>
                    </div>
                    <div class="secure__detail" col="3" flex>
                        <Card col="2" flex :row=true>
                            <div col="1" id="pieItems1">
                            </div>
                            <div col="1" id="pieItems2"></div>
                        </Card>
                        <Card col="3">
                            <table class="table" v-if="waitDealEvent.length > 0">
                                <thead>
                                    <th width="70%" class="title">最近验收</th>
                                    <th width="90"></th>
                                    <th width="90"></th>
                                </thead>
                                <tr v-for="(e,index) in waitDealEvent" :key="index">
                                    <td>{{e.companyName}}{{e.companyName}}{{e.companyName}}</td>
                                    <td class="date">{{e.signTime}}</td>
                                    <td style="text-align: right;color:#E9B042;">已验收</td>
                                </tr>
                                <tr v-for="(i,index) in (5 - waitDealEvent.length)" :key="'padding'+index">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </table>
                            <no-data col="1" v-else />
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="secure__rightaside" flex-column col="3">
                    <Card class="secure__type" col="2" title="最近立项">
                        <table class="table" v-if="signInfoList.length > 0">
                            <thead>
                                <th width="70%" class="title">最近立项</th>
                                <th width="90"></th>
                                <th width="90"></th>
                            </thead>
                            <tr v-for="(e,index) in signInfoList" :key="index">
                                <td>{{e.companyName}}{{e.companyName}}{{e.companyName}}</td>
                                <td class="date">{{e.signTime}}</td>
                                <td style="text-align: right;color:#E9B042;">已验收</td>
                            </tr>
                            <tr v-for="(i,index) in (20 - signInfoList.length)" :key="'padding'+index">
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                        <no-data col="1" v-else />
                    </Card>
                </aside>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import numCardGroup from '../../components/numCardGroup.vue'
import progressBarGroup from '../../components/progressBarGroup.vue'
import Card from '../../components/Card.vue'
import jobDistribute from '../../components/jobDistribute.vue'
import barChart from '../../components/barChart.vue'
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
            signInfoList: [{
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
                    "companyName": "3浙江机电职业",
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
                },
                {
                    "signTime": "2018-04-12",
                    "companyName": "5湖北师范大学",
                    "position": "主任/处长/部长",
                    "department": "信息（网络）中心",
                    "userName": "6",
                    current: "校长",
                    overdate: 20
                }, {
                    "signTime": "2018-04-12",
                    "companyName": "6上海建桥学院",
                    "position": "主任/处长/部长",
                    "department": "校办",
                    "userName": "5",
                    current: "校长",
                    overdate: 20
                }, {
                    "signTime": "2018-04-12",
                    "companyName": "7西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                }, {
                    "signTime": "2018-04-12",
                    "companyName": "8西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "9西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "10西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "11西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "12西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "13西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "14西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "15西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "16西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "17西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "18西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "19西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },{
                    "signTime": "2018-04-12",
                    "companyName": "20西安欧亚学院",
                    "position": "科长",
                    "department": "信息（网络）中心",
                    "userName": "4",
                    current: "校长",
                    overdate: 20
                },
            ],
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
                { value: 311, name: '过保' },
                { value: 335, name: '售后' },
            ],
            pie2Value: [
                { value: 335, name: '合同' },
                { value: 310, name: '在读' },
            ],
            currentProvince:provinceArr,
        }
    },
    created() {
        this.scrollShow()
        this.$nextTick(() => {
            this.initChart1();
            this.initChart2();
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
        initChart1() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('pieItems1'));
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
                    color: ['#3AC868', '#F9B74C', '#E85650', '#37A2F7'],
                    label: {
                        show: true,
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
                    color: ['#3AC868', '#F9B74C'],
                    label: {
                        show: true,
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
        },
        scrollShow() {
            var that = this;
            var page = 1;
            var size = 5;

            if (!this.signInfoList) {
                return;
            }
            if (this.signInfoList.length <= 5) {
                this.waitDealEvent = this.signInfoList.reverse()
                return;
            }

            var count = this.signInfoList.length;

            clearInterval(this.intervalIndex);
            var i = 0;
            this.intervalIndex = setInterval(function() {
                if (i > count - 5) {
                    i = 0;
                }
                var attactTemp = [];

                for (let m = i; m < count && m < i + 5; m++) {
                    let o = that.signInfoList[m];

                    attactTemp.push(o);
                }

                attactTemp.forEach(function(e) {
                    that.waitDealEvent.unshift(e);
                });

                while (that.waitDealEvent.length > 5) {
                    that.waitDealEvent.pop();
                }
                i++;
            }, 2000);
        }
    },

    components: {

        numCardGroup,
        progressBarGroup,
        Card,
        jobDistribute,
        mapChina,
        noData,
        barChart,
    },
}
</script>
<style lang="scss" scope>
@import '../../../static/css/sass/resources/tools.scss';
@import '../../../static/css/sass/resources/settings.scss';
.pannel4{
    height: 100%;
    display: flex;
    min-height: 670px;
    flex-direction: column;
    .totalStatics {
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