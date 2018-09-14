<template>
    <div class="app pannel7">
        <div>
            <head-bar :title="'工程综合概况'" :time="date"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <!-- 左侧 -->
                <aside class="left-statics" flex-column col="2">
                    <div col="2" flex-column :row='false'>
                        <div class="top" flex col="3">
                            <Card class="" col="4" title="验收统计(万元)" flex>
                                <div class="statics bottom-split" flex-column col="1">
                                    <h3 col="1" flex rowcenter colcenter style="background-image: linear-gradient(-180deg, rgba(0, 134, 227,0.6) 0%, rgba(0,113,221,0.5) 21%, rgba(0,89,214,0.4) 46%, rgba(0,70,209,0.00) 97%);">全年计划</h3>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">全年目标</div>
                                        <div class="num">{{zhgkData.dnysmb}}</div>
                                    </div> 
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">已完成</div>
                                        <div class="num">{{zhgkData.dnyswcl}}</div>
                                    </div>
                                </div>
                                <div class="statics" flex-column col="1">
                                    <h3 col="1" flex rowcenter colcenter style="background-image: linear-gradient(-180deg, rgb(227, 144, 0,0.5) 0%, rgba(221,206,0,0.3) 20%, rgba(214,213,0,0.1) 48%, rgba(209,202,0,0.00) 100%);">本月计划</h3>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">本月计划</div>
                                        <div class="num">{{zhgkData.byysjh}}</div>
                                    </div>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">已完成</div>
                                        <div class="num">{{zhgkData.byyswcl}}</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div class="" col="3" flex>
                            <Card class="" col="4" title="完工统计(万元)" flex>
                                <div class="statics bottom-split" flex-column col="1">
                                    <h3 col="1" flex rowcenter colcenter style="background-image: linear-gradient(-180deg, rgba(227, 0, 0,0.5) 0%, rgba(255,42,42,0.4) 22%, rgba(240,33,33,0.2) 48%, rgba(209,0,0,0.00) 100%);">全年计划</h3>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">全年目标</div>
                                        <div class="num">{{zhgkData.dnwgmb}}</div>
                                    </div>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">已完成</div>
                                        <div class="num">{{zhgkData.dnwgwcl}}</div>
                                    </div>
                                </div>
                                <div class="statics" flex-column col="1">
                                    <h3 col="1" flex rowcenter colcenter style="background-image: linear-gradient(-180deg, rgb(227, 144, 0,0.5) 0%, rgba(221,206,0,0.3) 20%, rgba(214,213,0,0.1) 48%, rgba(209,202,0,0.00) 100%);">本月计划</h3>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">本月计划</div>
                                        <div class="num">{{zhgkData.bywgjh}}</div>
                                    </div>
                                    <div col="1" flex spacearound colcenter>
                                        <div class="text">已完成</div>
                                        <div class="num">{{zhgkData.bywgwcl}}</div>
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
                                <div col="2">
                                    <div>
                                        <h2 class="curqy">{{!qymc?'全部工程区域':qymc}}</h2>
                                    </div>
                                    <div class="circle circle1" flex-column center>
                                        <span class="num">{{zhgkData.khs}}</span>
                                        <span>客户数</span>
                                    </div>
                                    <div class="circle circle2" flex-column center>
                                        <span class="num">{{zhgkData.xms}}</span>
                                        <span>总项目数</span>
                                    </div>
                                </div>
                                <div ref="chinamap" col="7" id="chinamap"></div>
                                <div col="1"  class="other-qygc">
                                      <Button size="small" @click="handleChangeqy('渠道工程')">渠道工程</Button><br>
                                      <Button size="small" @click="handleChangeqy('深圳区域工程')">深圳区域工程</Button>
                                </div>
                            </div>
                            <div col="1" flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">{{zhgkData.zjs}}</div>
                                    <h3>在建</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">{{zhgkData.shs}}</div>
                                    <h3>售后</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">{{zhgkData.gbs}}</div>
                                    <h3>过保</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">{{zhgkData.zts}}</div>
                                    <h3>在谈</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">{{zhgkData.zzs}}</div>
                                    <h3>终止</h3>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="人员统计">
                            <div flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num fontsize60">{{zhgkData.ryzs}}</div>
                                    <h3>人员总数</h3>
                                </div>
                            </div>
                            <div flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num2 fontsize60">{{zhgkData.sxrs}}</div>
                                    <h3>实习</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num1 fontsize60">{{zhgkData.zsrs}}</div>
                                    <h3>正式</h3>
                                </div>
                            </div>
                        </Card>
                        <Card col="3" title="分包统计">
                            <div flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num fontsize60">{{zhgkData.fbwgl}}</div>
                                    <h3>完工量</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num fontsize60">
                                        {{((Number(zhgkData.fbwgl)/(Number(zhgkData.fbrl)+Number(zhgkData.fbek)+Number(zhgkData.fbkb)))*100).toFixed(0)+'%'}}
                                    </div>
                                    <h3>效率</h3>
                                </div>
                            </div>
                            <div flex spacearound>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num1 fontsize60">{{zhgkData.fbrl}}</div>
                                    <h3>人力</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num2 fontsize60">{{zhgkData.fbek}}</div>
                                    <h3>二开</h3>
                                </div>
                                <div class="totalStatics-item" flex-column center>
                                    <div class="num num3 fontsize60">{{zhgkData.fbkb}}</div>
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
                                <div flex-column rowcenter colcenter  class="projects-box">
                                    <span class="num">{{zhgkData.cqwxys}}</span>
                                    <span class="text">超期未响应</span>
                                </div>
                                <div flex-column rowcenter colcenter  class="projects-box">
                                    <span class="num">{{zhgkData.cqwjjs}}</span>
                                    <span class="text">超期未解决</span>
                                </div>
                                <div flex-column rowcenter colcenter   class="projects-box">
                                    <span class="num">{{zhgkData.cqyjjs}}</span>
                                    <span class="text">超期已解决</span>
                                </div>
                                <div flex-column rowcenter colcenter  class="projects-box">
                                    <span class="num">{{zhgkData.tss}}</span>
                                    <span class="text">投诉</span>
                                </div>
                                <div flex-column rowcenter colcenter  class="projects-box">
                                    <span class="num">{{!zhgkData.bmys?0:zhgkData.bmys}}</span>
                                    <span class="text">不满意</span>
                                </div>
                            </div>
                        </Card>
                        <Card class="projects" col="1" title="使用率" flex style="position:relative;" :gradient='["rgba(221,206,0,0.5)","rgba(209,202,0,0.1)"]'>
                            <div style="flex-wrap: wrap;" flex spacebetween>
                                <!-- <div flex-column rowcenter colcenter  class="projects-box">
                                    <span class="num"></span>
                                    <span class="text">应用总量</span>
                                </div> -->
                                <div flex-column rowcenter colcenter  class="projects-box">
                                    <span class="num">{{zhgkData.fwzs}}</span>
                                    <span class="text">访问总量</span>
                                </div>
                                <div flex-column rowcenter colcenter class="projects-box">
                                    <span class="num">{{zhgkData.yhzs}}</span>
                                    <span class="text">用户总量</span>
                                </div>
                                <div flex-column rowcenter colcenter  class="projects-box">
                                    <span class="num">{{zhgkData.byfwzs}}</span>
                                    <span class="text">本月访问量</span>
                                </div>
                                <div flex-column rowcenter colcenter  class="projects-box">
                                    <span class="num">{{zhgkData.byyhzs}}</span>
                                    <span class="text">本月用户量</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="项目动态" >
                            <div style="height:300px;overflow:hidden"  v-if="ysData.length > 0" @mouseover="handleClearTimer" @mouseout="handleStartTimer"> 
                                <table class="table"  :class="{anim:animate==true}">
                                    <tr v-for="(item,index) in ysData" :key="index" >
                                        <td :title="item.xmmc">{{item.xmmc}}</td>
                                        <td>{{item.yssj}}</td>
                                        <td style="color:#F2A51B">{{item.xmzt}}</td>
                                    </tr>
                                </table>
                            </div>
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
            ysData: [],
            pie1Value: [
                { value: 35, name: '人力' },
                { value: 310, name: '二开' },
                { value: 230, name: '可变' }
            ],
            date:'',
            zhgkData:{},
            animate:false,
            objArr:[],
            qymc:'',
            timer:null
        }
    },
    created() {
        this.$nextTick(() => {
            this.initMap();
        });
        this.date = getMyDate(new Date())
        this.queryOverallPanel();
        this.getDictEnum();
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
        handleChangeqy(param){
            this.qymc = param;
            this.queryOverallPanel(param);
        },
        getDictEnum(){
            this.$get(this.API.getDictEnum,{
                name:'xzqh',
                isInterface:true
            }).then(res=>{
                if(res.data.state == 'success'){
                    res.data.data.forEach(ele=>{
                          if(ele.XZMC.indexOf('市') != -1){
                              ele.XZMC = ele.XZMC.split('市')[0]
                          }else if(ele.XZMC.indexOf('省') != -1){
                              ele.XZMC = ele.XZMC.split('省')[0]
                          }else if(ele.XZMC.indexOf('自治区') != -1){
                              ele.XZMC = ele.XZMC.split('自治区')[0]
                        } 
                    })
                    this.objArr = res.data.data;
                }
            })
        },
        handleClearTimer(){
            clearInterval(this.timer);
        },
        handleStartTimer(){
            this.timer = setInterval(this.scroll,1000);
        },
        scroll(){
                this.animate=true;    
                setTimeout(()=>{     
                    this.ysData.push(this.ysData[0]); 
                    this.ysData.shift();              
                    this.animate = false; 
             },500)
         },
        queryOverallPanel(qymc){
            clearInterval(this.timer);
            this.$get(this.API.queryOverallPanel,{
                curPage:1,
                pageSize:9999,
                qymc:qymc
            }).then(res=>{
                if(res.data.state == 'success'){
                    this.zhgkData = res.data.data
                    this.ysData = res.data.data.ysData
                    if(this.ysData.length > 7){
                        this.timer = setInterval(this.scroll,1000);
                    }
                }else{
                    this.$Message.error({content: res.data.msg,duration: 5,closable: true});
                }
            })
        },
        filterObj(val){
            this.qymc = ''
            let arr = [];
            this.objArr.forEach(ele=>{ 
                if(ele.XZMC == val){
                    this.qymc =  ele.QYMC
                    this.objArr.forEach(ele=>{
                       if(ele.QYMC == this.qymc){
                          arr.push(ele.XZMC)     
                       } 
                    }) 
                };
            })
            return arr;
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
                    // dataRange: {
                    //     orient: 'vertitle',
                    //     min: 0,
                    //     max: 100,
                    //     text:['高','低'],           // 文本，默认为数值文本
                    //     splitNumber:0,
                    //     color: ['#66235d', '#a5559a','#e0d2de']
                    // },
                series: [{
                    type: 'map',
                    mapType: 'china', // 自定义扩展图表类型
                    itemStyle: {
                        normal: { //未选中状态
                            areaColor: '#a2bbc5', //背景颜色
                            label:{show:false}
                        },
                    },
                    data: _this.currentProvince
                }]
            });
            this.chart.hideLoading();
            this.chart.off('click');
            this.chart.on('click',function(params) {
                let tempArr = JSON.parse(JSON.stringify(provinceArr));
                 if(_this.filterObj(params.name).includes(params.name)){
                     _this.queryOverallPanel(_this.qymc);
                     tempArr.forEach((item,index)=>{
                        if(_this.filterObj(params.name).includes(item.name)){
                             _this.$set(tempArr[index],'selected',true) 
                        }
                    })
                 }
                _this.currentProvince = tempArr
                return;
                //联动区域
                // let tempArr = JSON.parse(JSON.stringify(provinceArr))
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
    .curqy{
        white-space: nowrap;
        @include gradient(#FFFFFF, #d1cbcb); 
    }
    .left-statics {
        h3 {
            font-size: 16px;
        }
        .text {
            font-size: 14px;
            display: inline-block;
            width: 50%;
            text-align: center;
        }
        .num {
            font-size: 30px;
            width: 50%;
            text-align: center;

        }
        .bottom-split {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1)
        }
    }
    .projects {
        .projects-box {
            width: 50%;
            height: 50px;
        }
        .text {
            display: inline-block;
          
            font-size: 16px;
        }
        .num {
            display: inline-block;
            font-size: 26px;
        }
    }
    .other-qygc>button{
        margin-top:4px;
        color: #fff;
        background:rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.2);
    }
    .other-qygc>button:hover{
       background:rgba(255, 255, 255, 0.4);   
       border-color: rgba(255, 255, 255, 0.2);  
    }
    .circle {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        .num {
            font-size: 36px;
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
        height:100%;
        tr{
            height:32px;
        }
        th {
            text-align: center;
            color: #999;
        }
        td {
            text-align: center;
            @include truncate(70%);
        }
        td:nth-child(1){
            width: 60%;
            text-align: left;
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