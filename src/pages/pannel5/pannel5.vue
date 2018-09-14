<template>
    <div class="pannel5">
         <div>
            <head-bar :title="'工程人员概况'" :time="nowDate"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <!-- 左侧 -->
                <aside class="" flex-column col="2">
                    <div col="2" flex-column :row='false'>
                        <div class="top" flex col="4">
                            <Card class="" col="4" title="人员统计" flex>
                                <div col="1" flex-column spacearound>
                                    <div flex spacearound colcenter>
                                        <span class="fontsize18">人 员 总 数</span>
                                        <span class="num numzs fontsize50">{{pannelData.ryzs}}</span>
                                    </div>
                                    <div flex spacearound>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num2 fontsize50">{{pannelData.sxrs}}</div>
                                            <h3>实习</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num1 fontsize50">{{pannelData.zsrs}}</div>
                                            <h3>正式</h3>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Card class="" col="6" flex-column :title="'人员级别'">
                          <div  flex-column  v-if="ryjbData.length">
                            <div col="1" flex colcenter>
                                <div col="1"  textcenter><span class="dot dot1"></span>&nbsp;初级</div>
                                <div col="1"  textcenter><span class="dot dot2"></span>&nbsp;中级</div>
                                <div col="1"  textcenter><span class="dot dot3"></span>&nbsp;高级</div>
                            </div>
                            <div col="8">
                                <div  flex-column  colcenter v-for="item in ryjbData" >
                                    <div class="progress-outter">
                                        <span class="progress-low num" :style="{width:Number(item.cj)*100/(Number(item.cj)+Number(item.zj)+Number(item.gj)) + '%'}">{{item.cj}}</span>
                                        <span class="progress-mid num" :style="{width:Number(item.zj)*100/(Number(item.cj)+Number(item.zj)+Number(item.gj)) + '%'}">{{item.zj}}</span>
                                        <span class="progress-high num" :style="{width:Number(item.gj)*100/(Number(item.cj)+Number(item.zj)+Number(item.gj)) + '%'}">{{item.gj}}</span>
                                    </div>
                                    <h4>{{item.CPXMC}}</h4>
                                </div>
                            </div>
                           </div>
                            <no-data col="1" v-else />
                        </Card>
                    </div>
                </aside>
                <main flex-column col="4">
                    <div class="" flex col="6">
                        <Card class="" col="4" title="人员挣值统计" flex>
                            <div ref="chinamap" id="chinamap" col="5"></div>
                            <div col="1" flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize50">{{pannelData.per200up}}</div>
                                    <h3 class="arrowtop">200%以上</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize50">{{pannelData.per100up}}</div>
                                    <h3 class="arrowtop">100%以上</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize50">{{pannelData.per75up}}</div>
                                    <h3 class="arrowtop">75%以上</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num2 fontsize50">{{pannelData.per50down}}</div>
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
                                    <span class="num">{{pannelData.dnrzrs}}</span>
                                </div>
                                <div col="1">
                                    
                                </div>
                                <div flex col="9" spacearound colcenter style="height:60px;background-image: linear-gradient(-180deg, rgb(227, 0, 0,0.4) 0%, rgba(255,42,42,0.3) 22%, rgba(240,33,33,0.2) 48%, rgba(209,0,0,0.05) 100%);">
                                    <span class="text">当年离职</span>
                                    <span class="num">{{pannelData.dnlzrs}}</span>
                                </div>
                            </div>
                            <div col="1" flex spacebetween>
                                <div flex col="9" spacearound colcenter style="height:60px;background-image: linear-gradient(-180deg, rgba(0, 134, 227,0.6) 0%, rgba(0,113,221,0.3) 21%, rgba(0,89,214,0.2) 46%, rgba(0,70,209,0.04) 97%);">
                                    <span class="text">当月入职</span>
                                    <span class="num">{{pannelData.dyrzrs}}</span>
                                </div>
                                <div col="1">
                                    
                                </div>
                                <div flex col="9" spacearound colcenter style="height:60px;background-image: linear-gradient(-180deg, rgb(227, 0, 0,0.4) 0%, rgba(255,42,42,0.3) 22%, rgba(240,33,33,0.2) 48%, rgba(209,0,0,0.05) 100%);">
                                    <span class="text">当月离职</span>
                                    <span class="num">{{pannelData.dylzrs}}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="" flex-column col="2">
                    <div class="" flex-column col="3">
                        <Card col="3" title="人员挣值">
                            <table class="theadTable">
                                    <thead flex spacearound>
                                        <th width="90">姓名</th>
                                        <th width="120">总挣值</th>
                                        <th width="90">效率</th>
                                    </thead>
                                </table>
                                <table  v-if="ryzzData.length > 0"  class="table" @mouseover="handleClearTimer" @mouseout="handleStartTimer">
                                    <tbody :class="{animcb:animate==true}">
                                      <tr v-for="(item,index) in ryzzData" :key="index" flex spacearound >
                                        <td width="90">{{item.mc}}</td>
                                        <td width="120">{{item.zz}}</td>
                                        <td width="90">{{item.xl}}</td>
                                     </tr>
                                    </tbody>
                              </table>
                            <no-data col="1" v-else />
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="战队挣值">
                            <table class="theadTable">
                                    <thead flex spacearound>
                                        <th width="90">战队名称</th>
                                        <th width="120">总挣值</th>
                                        <th width="90">效率</th>
                                    </thead>
                                </table>
                                <table  v-if="zdzzData.length > 0"  class="table" @mouseover="handleClearTimer2" @mouseout="handleStartTimer2">
                                    <tbody :class="{animcb:animateZd==true}">
                                      <tr v-for="(item,index) in zdzzData" :key="index" flex spacearound >
                                        <td width="90">{{item.mc}}</td>
                                        <td width="120">{{item.zz}}</td>
                                        <td width="90">{{item.xl}}</td>
                                     </tr>
                                    </tbody>
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
import { getMyDate } from '../../utils.js'
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
             pannelData:{},
             ryzzData:[],
             zdzzData:[],
             ryjbData:[],
             animate:false,
             animateZd:false,
             timer:null,
             timer2:null,
             nowDate:''
        }
    },
    created() {
        this.$nextTick(() => {
            this.initMap();
        });
        this.queryPersonnelPanel();
        this.timer = setInterval(this.scroll,1000);
        this.timer2 = setInterval(this.scrollZd,1000);
        this.nowDate = getMyDate(new Date());
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
        handleClearTimer2(){
            clearInterval(this.timer2);
        },
        handleStartTimer2(){
            this.timer2 = setInterval(this.scrollZd,1000);
        },
        scroll(){
                this.animate=true;    
                setTimeout(()=>{     
                    this.ryzzData.push(this.ryzzData[0]); 
                    this.ryzzData.shift();              
                    this.animate = false; 
             },500)
         },
         scrollZd(){
                this.animateZd = true;    
                setTimeout(()=>{     
                    this.zdzzData.push(this.zdzzData[0]); 
                    this.zdzzData.shift();              
                    this.animateZd = false; 
             },500)
         },    
        queryPersonnelPanel(qymc){
              this.$get(this.API.queryPersonnelPanel,{
                curPage:1,
                pageSize:9999,
                qymc:qymc
            }).then(res=>{
                if(res.data.state == 'success'){
                    this.pannelData = res.data.data
                    this.ryzzData = res.data.data.ryzzData
                    this.zdzzData = res.data.data.zdzzData
                    this.ryjbData = res.data.data.ryjbData
                    let keyMap = {
                        "1" : "cj",
                        "2" : "zj",
                        "3" : "gj",
                        'CPXBH':'CPXBH',
                        'CPXMC':'CPXMC'
                    };
                    for(var i = 0;i < this.ryjbData.length;i++){
                        var obj = this.ryjbData[i];
                        for(var key in obj){
                                var newKey = keyMap[key];
                                if(newKey){
                                       obj[newKey] = obj[key];
                                    //    delete obj[key];
                                    }
                            }
                       }
                }else{
                    this.$Message.error({content: res.data.msg,duration: 5,closable: true});
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
    .totalStatics-item{
        h3{
            font-size: 14px;
        }
    }
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
        margin-bottom:8px;
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
    .num.numzs{
        @include gradient(#FFFFFF, #D1D1D1);
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
            height:80%;
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