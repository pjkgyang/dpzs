<template>
    <div class="pannel1">
        <div>
            <head-bar :title="'问题跟踪分析'" :time="'2018/08/08 00:00:00'"></head-bar>
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
                                        <div class="num customNums">864</div>
                                    </div>
                                    <div col="2" flex spacearound wrap>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num fontsize60">114</div>
                                            <h3>提问学校数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num fontsize60">264</div>
                                            <h3>活跃学校数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num overDate fontsize60">35</div>
                                            <h3>提问用户数</h3>
                                        </div>
                                        <div class="totalStatics-item" flex flex-column>
                                            <div class="num partner fontsize60">43</div>
                                            <h3>活跃用户数</h3>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </aside>
                        <Card class="secure__map" col="4" title="" flex>
                            <map-china :data="areaStatisc" />
                        </Card>
                    </div>
                    <div class="secure__detail" col="3" flex :row=true>
                        <Card col="1" flex>
                            <div class="" flex spacearound center col="1">
                                <h3 class="fontsize18" style="width:110px">总问题数</h3>
                                <span class="num fontsize60">659</span>
                            </div>
                            <div class="" flex spacearound center col="1" style="border-top: 1px solid rgba(255, 255, 255, 0.2);">
                                <h3 class="fontsize18" style="width:110px">已解决问题数</h3>
                                <span class="num fontsize60">800</span>
                            </div>
                        </Card>
                        <Card col="1">
                            <table class="table" v-if="waitDealEvent.length > 0">
                                <thead>
                                    <th width="70%" class="title">未关闭投诉：</th>
                                    <th width="90"></th>
                                </thead>
                                <tr v-for="(e,index) in waitDealEvent" :key="index">
                                    <td>{{e.companyName}}{{e.companyName}}{{e.companyName}}
                                        <br><span class="current">当前环节:{{e.current}}</span></td>
                                    <td class="date">{{e.signTime}}</td>
                                </tr>
                                <tr v-for="(i,index) in (3 - waitDealEvent.length)" :key="'padding'+index">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </table>
                            <no-data col="1" v-else />
                        </Card>
                        <Card col="1">
                            <table class="table" v-if="waitDealEvent.length > 0">
                                <thead>
                                    <th width="70%" class="title">超期未解决问题：</th>
                                    <th width="90"></th>
                                </thead>
                                <tr v-for="(e,index) in waitDealEvent" :key="index">
                                    <td>{{e.companyName}}{{e.companyName}}{{e.companyName}}
                                        <br><span class="current">当前环节:{{e.current}}</span></td>
                                    <td class="date">{{e.signTime}}
                                        <br><span class="overdate">已超期{{e.overdate}}天</span></td>
                                </tr>
                                <tr v-for="(i,index) in (3 - waitDealEvent.length)" :key="'padding'+index">
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
                    <Card class="secure__type" col="3" title="处理中问题数" :gradient='["rgba(214,0,0,0.5)","rgba(214,0,0,0.1)"]'>
                        <div col="1" flex>
                            <job-distribute v-if="jobDistributes.length > 0" :data="jobDistributes" />
                            <no-data col="1" v-else />
                        </div>
                    </Card>
                    <Card col="3" title="处理完成问题数" :gradient='["rgba(0,221,137,0.5)","rgba(0,0,0,0.1)"]'>
                        <bar-chart></bar-chart>
                    </Card>
                    <Card col="3">
                        <table class="table" v-if="waitDealEvent.length > 0">
                            <thead>
                                <th width="70%" class="title">未关闭催办：</th>
                                <th width="90"></th>
                            </thead>
                            <tr v-for="(e,index) in waitDealEvent" :key="index">
                                <td>{{e.companyName}}{{e.companyName}}{{e.companyName}}
                                    <br><span class="current">当前环节:{{e.current}}</span></td>
                                <td class="date">{{e.signTime}}</td>
                            </tr>
                            <tr v-for="(i,index) in (3 - waitDealEvent.length)" :key="'padding'+index">
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
import headBar from '../../components/header.vue'
import numCardGroup from '../../components/numCardGroup.vue'
import progressBarGroup from '../../components/progressBarGroup.vue'
import Card from '../../components/Card.vue'
import jobDistribute from '../../components/jobDistribute.vue'
import barChart from '../../components/barChart.vue'
import mapChina from '../../components/mapChina.vue'
import noData from '../../components/noData.vue'

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
            }]
        }
    },
    created() {
        this.scrollShow();
    },
    mounted() {},
    methods: {
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