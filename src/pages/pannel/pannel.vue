<template>
    <div class="pannel1">
        <div>
            <head-bar :title="'问题跟踪分析'" :time="nowDate"></head-bar>
        </div>
        <div class="app__content">
            <div class="secure height100" flex>
                <main flex-column col="8">
                    <div class="top" flex col="6">
                        <aside class="secure__leftaside" flex col="2">
                            <Card class="totalStatics" col="3" title="" :gradient='["#0086E3","rgba(0,70,209,0.33)"]'>
                                <div textcenter flex-column>
                                    <div col="1" flex colcenter spacearound>
                                        <h3 class="fontsize16" style="letter-spacing:1em;">接入学校数</h3>
                                        <div class="num customNums">{{pannelData.jrxxs}}</div>
                                    </div>
                                    <div col="2" flex spacearound wrap>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num fontsize60">{{pannelData.twxxs}}</div>
                                            <h3>提问学校数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num fontsize60">{{pannelData.hyxxs}}</div>
                                            <h3>活跃学校数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num overDate fontsize60">{{pannelData.twyhs}}</div>
                                            <h3>提问用户数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num partner fontsize60">{{pannelData.hyyhs}}</div>
                                            <h3>活跃用户数</h3>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </aside>
                        <Card class="secure__map" col="4" title="" flex>
                            <map-china :data="areaStatisc" :pannelData="pannelData" />
                        </Card>
                    </div>
                    <div class="secure__detail" col="3" flex :row=true>
                        <Card col="1" flex>
                            <div class="" flex spacearound center col="1">
                                <h3 class="fontsize18" style="width:110px">总问题数</h3>
                                <span class="num fontsize60">{{pannelData.wtzs}}</span>
                            </div>
                            <div class="" flex spacearound center col="1" style="border-top: 1px solid rgba(255, 255, 255, 0.2);">
                                <h3 class="fontsize18" style="width:110px">已解决问题数</h3>
                                <span class="num fontsize60">{{pannelData.yjjs}}</span>
                            </div>
                        </Card>
                        <Card col="1" :title="'未关闭投诉'">
                              <div style="height:300px;overflow:hidden"  v-if="wgbtsData.length > 0" @mouseover="handleClearTimerTs" @mouseout="handleStartTimerTs"> 
                                <table class="table"  :class="{animWT:animate==true}">
                                    <tr v-for="(item,index) in wgbtsData" :key="index" >
                                        <td :title="item.bt">{{item.bt}}<br><span class="current">当前环节:{{item.zt}}</span></td>
                                        <td class="date">{{item.fbrq}}</td>
                                    </tr>
                                </table>
                            </div>
                            <no-data col="1" v-else />
                        </Card>
                        <Card col="1" :title="'超期未解决问题'">
                                <div style="height:300px;overflow:hidden"  v-if="cqwjjData.length > 0" @mouseover="handleClearTimerCq" @mouseout="handleStartTimerCq"> 
                                <table class="table"  :class="{animWT:animateCq==true}">
                                    <tr v-for="(item,index) in cqwjjData" :key="index" >
                                        <td :title="item.bt">{{item.bt}}<br><span class="current">当前环节:{{item.zt}}</span></td>
                                        <td class="date">{{item.fbrq}}<br><span class="overdate">已超期: {{item.cqts}} 天</span></td>
                                    </tr>
                                </table>
                            </div>
                            <no-data col="1" v-else />
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="secure__rightaside" flex-column col="3">
                    <Card class="secure__type" col="3" title="处理中问题数" :gradient='["rgba(214,0,0,0.5)","rgba(214,0,0,0.1)"]'>
                        <div col="1" flex>
                            <job-distribute v-if="jobDistributes.length > 0" :data="jobDistributes" 
                             :clzwts="Number(pannelData.wxys)+Number(pannelData.wjjs)+Number(pannelData.wjjsqgb)"/>
                            <no-data col="1" v-else />
                        </div>
                    </Card>
                    <Card col="3" title="处理完成问题数" :gradient='["rgba(0,221,137,0.5)","rgba(0,0,0,0.1)"]'>
                        <bar-chart :mys="mys" :bmys="bmys" :clwcwts="Number(pannelData.bmys)+Number(pannelData.mys)"></bar-chart>
                    </Card>
                    <Card col="3" :title="'未关闭催办'">
                            <div style="height:300px;overflow:hidden"  v-if="wgbcbData.length > 0" @mouseover="handleClearTimerCb" @mouseout="handleStartTimerCb"> 
                                <table class="table"  :class="{animWT:animateCb==true}">
                                    <tr v-for="(item,index) in wgbcbData" :key="index" >
                                        <td :title="item.bt">{{item.bt}}<br><span class="current">当前环节:{{item.zt}}</span></td>
                                        <td class="date">{{item.fbrq}}</td>
                                    </tr>
                                </table>
                            </div>
                            <no-data col="1" v-else />
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
import jobDistribute from '../../components/jobDistribute.vue'
import barChart from '../../components/barChart.vue'
import mapChina from '../../components/mapChina.vue'
import noData from '../../components/noData.vue'
import { getMyDate } from '../../utils.js'

export default {
    data() {
        return {
            summary: {
                totalNum: 864
            },
            areaStatisc: [],
            jobDistributes: [{
                name: "未响应",
                value:30
            }, {
                name: "未解决",
                value: 10
            }, {
                name: "申请关闭",
                value: 50
            }],
            mys:10,
            bmys:200,
            animate:false,
            animateCq:false,
            animateCb:false,
            pannelData:{},
            wgbtsData:[],
            cqwjjData:[],
            wgbcbData:[],
            nowDate:'',
            timerTs:null,
            timerCq:null,
            timerCb:null
        }
    },
    created() {
        this.querySchoolQuestionPanel();
        this.nowDate = getMyDate(new Date());
    },
    mounted() {},
    methods: {
        handleClearTimerTs(){
            clearInterval(this.timerTs);
        },
        handleStartTimerTs(){
            this.timerTs =  setInterval(this.scroll,1000);
        },
        handleClearTimerCq(){
            clearInterval(this.timerCq);
        },
        handleStartTimerCq(){
            this.timerCq = setInterval(this.scrollCq,1000);
        },
        handleClearTimerCb(){
            clearInterval(this.timerCb);
        },
        handleStartTimerCb(){
            this.timerCb = setInterval(this.scrollCb,1000);
        },
        scroll(){
                this.animate=true;    
                setTimeout(()=>{     
                    this.wgbtsData.push(this.wgbtsData[0]); 
                    this.wgbtsData.shift();              
                    this.animate = false; 
             },500)
         },
         scrollCq(){
                this.animateCq=true;    
                setTimeout(()=>{     
                    this.cqwjjData.push(this.cqwjjData[0]); 
                    this.cqwjjData.shift();              
                    this.animateCq = false; 
             },500)
         },
         scrollCb(){
                this.animateCb=true;    
                setTimeout(()=>{     
                    this.wgbcbData.push(this.wgbcbData[0]); 
                    this.wgbcbData.shift();              
                    this.animateCb = false; 
             },500)
         },
         
        querySchoolQuestionPanel(qymc){
            this.$get(this.API.querySchoolQuestionPanel,{
                curPage:1,
                pageSize:9999,
                qymc:qymc
            }).then(res=>{
                if(res.data.state == 'success'){
                    this.pannelData = res.data.data
                    this.wgbtsData = res.data.data.wgbtsLst
                    this.cqwjjData = res.data.data.cqwjjwtLst
                    this.wgbcbData = res.data.data.wgbcbwtLst
                    this.jobDistributes[0].value = res.data.data.wxys
                    this.jobDistributes[1].value = res.data.data.wjjs
                    this.jobDistributes[2].value = res.data.data.wjjsqgb
                    this.mys = Number(res.data.data.mys)
                    this.bmys = Number(res.data.data.bmys)
                    this.cqwjjData.forEach(ele=>{
                        if(this.DateMinus(ele.cnjsrq) >= 0 ){
                            ele.cqts =  Math.abs(this.DateMinus(ele.cnjsrq));
                        }else{
                            ele.cqts = 0    
                        }
                    })
                    if(this.wgbtsData.length > 5){
                       this.timerTs =  setInterval(this.scroll,1000);
                    }
                    if(this.cqwjjData.length > 5){
                       this.timerCq = setInterval(this.scrollCq,1000);
                    }
                    if(this.wgbcbData.length > 5){
                       this.timerCb = setInterval(this.scrollCb,1000);
                    }
                }
            })
        },
        DateMinus(sDate){ 
        　　var sdate = new Date(sDate.replace(/-/g, "/")); 
        　　var now = new Date(); 
        　　var days = now.getTime() - sdate.getTime(); 
        　　var day = parseInt(days / (1000 * 60 * 60 * 24)); 
        　　return day; 
        },

        //控制表格滚动
        scrollShow() {
            var that = this;
            // var page = 1;
            // var size = 5;

            if (!this.signInfoList) {
                return;
            }
            if (this.signInfoList.length <= 3) {
                this.waitDealEvent = this.signInfoList.reverse()
                return;
            }
            var count = this.signInfoList.length;
            clearInterval(this.intervalIndex);
            var i = 0;
            this.intervalIndex = setInterval(function() {
            if (i > count - 3) {
                i = 0;
            }
            var attactTemp = [];
            for (let m = i; m < count && m < i + 3; m++) {
                let o = that.signInfoList[m];

                attactTemp.push(o);
            }
            attactTemp.forEach(function(e) {
                that.waitDealEvent.unshift(e);
            });

            while (that.waitDealEvent.length > 3) {
                that.waitDealEvent.pop();
            }
            // console.log('---------当前签到明细-------------------')
            // console.log(that.waitDealEvent)
            // console.log('当前循环的i值:' + i)
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
        headBar
    },
}
</script>
<style lang="scss" scope>
@import '../../../static/css/sass/resources/tools.scss';
@import '../../../static/css/sass/resources/settings.scss';
.pannel1{
    height: 100%;
    display: flex;
    min-height: 670px;
    flex-direction: column;
    .num.customNums{
        font-size: 70px;
        @include gradient(#FFFFFF, #B3B3B3);
    }
    .totalStatics {
        .totalStatics-item {
            width: 50%;
            h3 {
                font-size: 15px;
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
        td {
            height: 45px;
            @include truncate(70%);
        }
        td:nth-child(1){
            width: 62%;
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