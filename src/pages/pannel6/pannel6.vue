<template>
    <div class="pannel6">
        <div>
            <head-bar :title="'工程成本分析'" :time="nowDate"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <!-- 左侧 -->
                <aside class="" flex-column col="2">
                    <div col="2" flex-column :row='false'>
                        <div class="top" flex col="6">
                            <Card class="" col="4" title="综合统计" flex :gradient='["#0086E3","rgba(0,70,209,0.33)"]'>
                                <div col="1" flex-column spacearound>
                                    <div flex spacearound>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num fontsize60">{{pannelData.zbwgl}}</div>
                                            <h3>完工量</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num fontsize60">
                                                {{(Number(pannelData.zbwgl)/(Number(pannelData.zbrlfy)+Number(pannelData.zbekfy)+Number(pannelData.zbkbfy))*100).toFixed(0)+"%"}}
                                            </div>
                                            <h3>效率</h3>
                                        </div>
                                    </div>
                                    <div flex spacearound>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num1 fontsize60">{{pannelData.zbrlfy}}</div>
                                            <h3>人力</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num2 fontsize60">{{pannelData.zbekfy}}</div>
                                            <h3>二开</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num3 fontsize60">{{pannelData.zbkbfy}}</div>
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
                                <table class="theadTable">
                                    <thead flex spacearound>
                                        <th width="30">排名</th>
                                        <th width="110">区域</th>
                                        <th width="80">姓名</th>
                                        <th width="90">入职时间</th>
                                        <th width="90">金额(元)</th>
                                    </thead>
                                </table>
                                <table  v-if="jsData.length > 0"  class="table" @mouseover="handleClearTimer" @mouseout="handleStartTimer">
                                    <tbody :class="{animcb:animate==true}">
                                      <tr v-for="(item,index) in jsData" :key="index" flex spacearound >
                                        <td width="30">{{item.mc}}</td>
                                        <td width="110">{{item.qymc}}</td>
                                        <td width="80">{{item.ygxm}}</td>
                                        <td width="90">{{item.rzsj}}</td>
                                        <td width="90">{{item.je}}</td>
                                     </tr>
                                    </tbody>
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
                            <doublebar-chart :data="barData" :count="count"></doublebar-chart>
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
            <span class="num">
                {{(!xmData.wcl||!xmData.cb?0:Number(xmData.wcl)/Number(xmData.cb)*100).toFixed(0)}}
            </span>
        </div>
    </div>
</div>
<div col="1" flex spacebetween>
    <div flex col="1" spacearound colcenter>
        <span class="text">完工</span>
        <span class="num">{{!xmData.wcl?0:xmData.wcl}}</span>
    </div>
    <div flex col="1" spacearound colcenter>
        <span class="text">验收</span>
        <span class="num">{{!xmData.ysl?0:xmData.ysl}}</span>
    </div>
</div>
<div col="1" flex spacebetween>
    <div flex col="1" spacearound colcenter>
        <span class="text">收入</span>
        <span class="num">{{!xmData.sr?0:xmData.sr}}</span>
    </div>
    <div flex col="1" spacearound colcenter>
        <span class="text">成本</span>
        <span class="num">{{!xmData.cb?0:xmData.cb}}</span>
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
            <span class="num">{{!otherData.wcl?0:otherData.wcl}}</span>
        </div>
        <div flex col="1" spacearound colcenter>
            <span class="text">效率</span>
            <span class="num">
                 {{(!otherData.wcl||!otherData.cb?0:Number(otherData.wcl)/Number(otherData.cb)*100).toFixed(0)}}
            </span>
        </div>
    </div>
    <div col="1" flex spacebetween>
        <div flex col="1" spacearound colcenter>
            <span class="text">收入</span>
            <span class="num">{{!otherData.sr?0:otherData.sr}}</span>
        </div>
        <div flex col="1" spacearound colcenter>
            <span class="text">成本</span>
            <span class="num">{{!otherData.cb?0:otherData.cb}}</span>
        </div>
    </div>
</Card>
</div>
<div class="" col="3" flex>
    <Card col="3" title="过保项目">
        <div flex spacearound>
            <div class="totalStatics-item" flex-column center>
                <div class="num fontsize60">{{pannelData.gbxms}}</div>
                <h3>过保项目数</h3>
            </div>
            <div class="totalStatics-item" flex-column center>
                <div class="num fontsize60">{{pannelData.gbjxfws}}</div>
                <h3>继续服务数</h3>
            </div>
        </div>
        <div flex spacearound>
            <div class="totalStatics-item" flex-column center>
                <div class="num num1 fontsize60">{{pannelData.gbrlfy}}</div>
                <h3>人力</h3>
            </div>
            <div class="totalStatics-item" flex-column center>
                <div class="num num2 fontsize60">{{!pannelData.gbekfy?0:pannelData.gbekfy}}</div>
                <h3>二开</h3>
            </div>
            <div class="totalStatics-item" flex-column center>
                <div class="num num3 fontsize60">{{pannelData.gbkbfy}}</div>
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
import { getMyDate } from '../../utils.js'
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
            pannelData:{},
            jsData:[],
            barData:[],
            count:0,
            xmData:{},
            otherData:{},
            nowDate:'',
            animate:false,
            timer:null
        }
    },
    created() {
        this.$nextTick(() => {
            this.initMap();
        });
        this.nowDate = getMyDate(new Date());
        this.queryCostAnalysisPanel();
        this.$get(this.API.queryRegionSubcontractEfficiency,{}).then(res=>{
            if(res.data.state == 'success'){
                this.count = 2;
                let qymcArr = [];  
                let zjeArr = [];
                let ywcArr = [];
                res.data.data.forEach(ele=>{
                    qymcArr.push(ele.qymc.split('区域工程')[0]);
                    zjeArr.push(ele.zje);
                    ywcArr.push(ele.wcl);
                })
                this.barData[0] = qymcArr;
                this.barData[1] = zjeArr;
                this.barData[2] = ywcArr;
            }
        });
        this.queryRegionCostStat(this.curTabindex1==0?true:false,1);
        this.queryRegionCostStat(this.curTabindex2==0?true:false,'2,3');

        this.timer = setInterval(this.scroll,1000);
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
        handleClearTimer(){
            clearInterval(this.timer);
        },
        handleStartTimer(){
            this.timer = setInterval(this.scroll,1000);
        },
        scroll(){
                this.animate=true;    
                setTimeout(()=>{     
                    this.jsData.push(this.jsData[0]); 
                    this.jsData.shift();              
                    this.animate = false; 
             },500)
         },
        queryCostAnalysisPanel(qymc){
             this.$get(this.API.queryCostAnalysisPanel,{
                curPage:1,
                pageSize:9999,
                qymc:qymc
            }).then(res=>{
                if(res.data.state == 'success'){
                  this.pannelData = res.data.data
                  res.data.data.jsData.forEach((ele,i,arr)=>{
                      ele.mc = i+1
                  })
                  this.jsData =  res.data.data.jsData
                  this.pie1Value[0].value = res.data.data.zbrlfy
                  this.pie1Value[1].value = res.data.data.zbekfy
                  this.pie1Value[2].value = res.data.data.zbkbfy
                  this.initChart('pieItems1', this.pie1Value);
                }else{
                    this.$Message.error({content: res.data.msg,duration: 5,closable: true});  
                }
            })
        },
        queryRegionCostStat(isDn,xmlb){
            this.$get(this.API.queryRegionCostStat,{
                isDn:isDn,
                xmlb:xmlb
            }).then(res=>{
                if(res.data.state == 'success'){
                    if(xmlb == 1){
                       this.xmData = res.data.data
                    }else{
                       this.otherData = res.data.data 
                    }
                }else{
                    this.$Message.error({content: res.data.msg,duration: 5,closable: true});
                }
            })
        },
        //卡片右上角按钮
        chooseBtn1(index) {
            this.curTabindex1 = index;
            this.queryRegionCostStat(this.curTabindex1==0?true:false,1);
        },
        chooseBtn2(index) {
            this.curTabindex2 = index;
            this.queryRegionCostStat(this.curTabindex2==0?true:false,'2,3');
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
    .theadTable{
        th {
            text-align: center;
            color: #999;
        }
    }
    .table {
        table-layout: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        tbody{
            display: block;
            width: 100%;
            height:95%;
            td {
                text-align: center;
                height:30px;
                line-height: 30px;
                @include truncate(70%);
           }
           
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