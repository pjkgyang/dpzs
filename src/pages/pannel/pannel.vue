<template>
    <div class="pannel1">
        <div>
            <head-bar :title="'学校问题跟踪分析'" :time="nowDate"></head-bar>
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
                                        <div class="num customNums fontsize60">{{pannelData.jrxxs}}</div>
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
                            <map-china :data="mapData" :pannelData="pannelData" @handleChangeqy="handleChangeqy" @handleFilterqy="handleFilterqy"/>
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
                        <Card col="1" :title="'未关闭投诉 ( '+ wgbtsLength+' )'" :show="true">
                          <el-scrollbar style="height:300px">
                              <div style="height:300px;"  v-if="wgbtsLength > 0" @mouseover="handleClearTimerTs" @mouseout="handleStartTimerTs"> 
                                <table class="table"  :class="{animWT:animate==true}">
                                    <tr v-for="(item,index) in wgbtsData" :key="index" >
                                        <td :title="item.bt">{{item.bt}}<br><span class="current">当前环节:{{item.dqhj}}</span></td>
                                        <td class="date">{{item.fbrq}}</td>
                                    </tr>
                                </table>
                            </div>
                            <no-data col="1" v-else />
                          </el-scrollbar>
                        </Card>
                        <Card col="1" :title="'超期未解决问题 ( '+ cqwjjLength+' )'" :show="true" >
                           <el-scrollbar style="height:300px">
                             <div style="height:100%;"  v-if="cqwjjLength > 0" @mouseover="handleClearTimerCq" @mouseout="handleStartTimerCq"> 
                                <table class="table"  :class="{animWT:animateCq==true}" >
                                    <tr v-for="(item,index) in cqwjjData" :key="index" >
                                        <td :title="item.bt">{{item.bt}}<br><span class="current">当前环节:{{item.dqhj}}</span></td>
                                        <td class="date">{{item.fbrq}}<br><span class="overdate">{{item.cqts<0?'还有'+Math.abs(item.cqts)+'天超期':'已超期'+item.cqts+'天'}}</span></td>
                                    </tr>
                                </table>
                            </div>
                            <no-data col="1" v-else />
                           </el-scrollbar>
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="secure__rightaside" flex-column col="3">
                    <Card class="secure__type" col="3" title="处理中问题数" :gradient='["rgba(214,0,0,0.5)","rgba(214,0,0,0.1)"]'>
                        <div col="1" flex>
                            <job-distribute v-if="jobDistributes.length > 0" :data="jobDistributes" 
                             :clzwts="Number(pannelData.wtzs) - Number(pannelData.yjjs)"/>
                            <no-data col="1" v-else />
                        </div>
                    </Card>
                    <Card col="3" title="处理完成问题数" :gradient='["rgba(0,221,137,0.5)","rgba(0,0,0,0.1)"]'>
                        <bar-chart :mys="mys" :bmys="bmys" :clwcwts="Number(pannelData.bmys)+Number(pannelData.mys)"></bar-chart>
                    </Card>
                    <Card col="3" :title="'未关闭催办 ( '+wgbcbLength+' )'" :show="true">
                        <el-scrollbar style="height:300px">
                              <div style="height:100%;"  v-if="wgbcbLength > 0" @mouseover="handleClearTimerCb" @mouseout="handleStartTimerCb"> 
                                  <table class="table"  :class="{animWT:animateCb==true}">
                                      <tr v-for="(item,index) in wgbcbData" :key="index" >
                                          <td :title="item.bt">{{item.bt}}<br><span class="current">当前环节:{{item.dqhj}}</span></td>
                                          <td class="date">{{item.fbrq}}</td>
                                      </tr>
                                  </table>
                              </div>
                              <no-data col="1" v-else />
                        </el-scrollbar>
                        </Card>
                </aside>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import headBar from "../../components/header.vue";
import numCardGroup from "../../components/numCardGroup.vue";
import progressBarGroup from "../../components/progressBarGroup.vue";
import Card from "../../components/Card.vue";
import jobDistribute from "../../components/jobDistribute.vue";
import barChart from "../../components/barChart.vue";
import mapChina from "../../components/mapChina.vue";
import noData from "../../components/noData.vue";
import { getMyDate } from "../../utils.js";

export default {
  data() {
    return {
      summary: {
        totalNum: 864
      },
      jobDistributes: [
        {
          name: "未响应",
          value: 30
        },
        {
          name: "未解决",
          value: 10
        },
        {
          name: "申请关闭",
          value: 50
        }
      ],
      mys: 10,
      bmys: 200,
      animate: false,
      animateCq: false,
      animateCb: false,
      pannelData: {},
      wgbtsData: [],
      cqwjjData: [],
      wgbcbData: [],
      nowDate: "",
      timerTs: null,
      timerCq: null,
      timerCb: null,
      mapData: [],

      wgbcbLength:'',
      wgbtsLength:'',
      cqwjjLength:'',
    };
  },
  created() {
    this.querySchoolQuestionPanel();
    this.nowDate = getMyDate(new Date());
    console.log(window.innerHeight)
  },
  mounted() {},
  methods: {
    handleChangeqy(data) {
      this.querySchoolQuestionPanel(data);
    },
    handleFilterqy(data) {
      //切换区域
      this.querySchoolQuestionPanel(data);
    },
    handleClearTimerTs() {
      clearInterval(this.timerTs);
    },
    handleStartTimerTs() {
      if (this.wgbtsData.length > window.innerHeight>850?5:4) {
        this.timerTs = setInterval(this.scroll, 10000);
      }
    },
    handleClearTimerCq() {
      clearInterval(this.timerCq);
    },
    handleStartTimerCq() {
      if (this.cqwjjData.length > window.innerHeight>850?5:4) {
        this.timerCq = setInterval(this.scrollCq, 10000);
      }
    },
    handleClearTimerCb() {
      clearInterval(this.timerCb);
    },
    handleStartTimerCb() {
      if (this.wgbcbData.length > window.innerHeight>850?5:4) {
        this.timerCb = setInterval(this.scrollCb, 10000);
      }
    },
    scroll() {
      this.animate = true;
      this.wgbtsData = this.wgbtsData.concat(this.wgbtsData.slice(0,5));
      setTimeout(() => {
        // this.wgbtsData.push(this.wgbtsData[0]);
        // this.wgbtsData.shift();
        this.wgbtsData.splice(0,5);
        this.animate = false;
      }, 500);
    },
    scrollCq() {
      this.animateCq = true;
      this.cqwjjData = this.cqwjjData.concat(this.cqwjjData.slice(0,5));
      setTimeout(() => {
        // this.cqwjjData.push(this.cqwjjData[0]);
        // this.cqwjjData.shift();
        this.cqwjjData.splice(0,5);
        this.animateCq = false;
      }, 500);
    },
    scrollCb() {
      this.animateCb = true;
      this.wgbcbData = this.wgbcbData.concat(this.wgbcbData.slice(0,5));
      setTimeout(() => {
        // this.wgbcbData.push(this.wgbcbData[0]);
        // this.wgbcbData.shift();
        this.wgbcbData.splice(0,5);
        this.animateCb = false;
      }, 500);
    },

    querySchoolQuestionPanel(qymc) {
      clearInterval(this.timerTs);
      clearInterval(this.timerCq);
      clearInterval(this.timerCb);

      this.$get(this.API.querySchoolQuestionPanel, {
        curPage: 1,
        pageSize: 9999,
        qymc: qymc
      }).then(res => {
        if (res.data.state == "success") {
          this.pannelData = res.data.data;
          this.wgbtsData = res.data.data.wgbtsLst;
          this.cqwjjData = res.data.data.cqwjjwtLst;
          this.wgbcbData = res.data.data.wgbcbwtLst;
          this.wgbcbLength = res.data.data.wgbcbwtLst.length;
          this.wgbtsLength = res.data.data.wgbtsLst.length,
          this.cqwjjLength =  res.data.data.cqwjjwtLst.length,

          this.jobDistributes[0].value = res.data.data.wxys;
          this.jobDistributes[1].value = res.data.data.wjjs;
          this.jobDistributes[2].value = res.data.data.wjjsqgb;
          this.mys = Number(res.data.data.mys);
          this.bmys = Number(res.data.data.bmys);
          if (!this.mapData.length && !!res.data.data.provinceData) {
            res.data.data.provinceData.forEach(ele => {
              if (ele.PROVINCE.indexOf("市") != -1) {
                ele.PROVINCE = ele.PROVINCE.split("市")[0];
              } else if (ele.PROVINCE.indexOf("省") != -1) {
                ele.PROVINCE = ele.PROVINCE.split("省")[0];
              } else if (
                ele.PROVINCE.indexOf("自治区") != -1 &&
                ele.PROVINCE.indexOf("维吾尔") == -1 &&
                ele.PROVINCE.indexOf("回族") == -1 &&
                ele.PROVINCE.indexOf("壮族") == -1
              ) {
                ele.PROVINCE = ele.PROVINCE.split("自治区")[0];
              } else if (ele.PROVINCE.indexOf("维吾尔") != -1) {
                ele.PROVINCE = ele.PROVINCE.split("维吾尔")[0];
              } else if (ele.PROVINCE.indexOf("回族") != -1) {
                ele.PROVINCE = ele.PROVINCE.split("回族")[0];
              } else if (ele.PROVINCE.indexOf("壮族") != -1) {
                ele.PROVINCE = ele.PROVINCE.split("壮族")[0];
              } else if (ele.PROVINCE.indexOf("特别行政区") != -1) {
                ele.PROVINCE = ele.PROVINCE.split("特别行政区")[0];
              }
            });
            this.mapData = res.data.data.provinceData;
            let keyMap = {
              PROVINCE: "name",
              PROVINCEDATA: "value"
            };
            for (var i = 0; i < this.mapData.length; i++) {
              var obj = this.mapData[i];
              for (var key in obj) {
                var newKey = keyMap[key];
                if (newKey) {
                  obj[newKey] = obj[key];
                  delete obj[key];
                }
              }
            }
          }
          if (this.wgbtsData.length > 5) {
            this.timerTs = setInterval(this.scroll, 10000);
          }
          if (this.cqwjjData.length > 5) {
            this.timerCq = setInterval(this.scrollCq, 10000);
          }
          if (this.wgbcbData.length > 5) {
            this.timerCb = setInterval(this.scrollCb,10000);
          }
        } else {
          this.$alert(res.data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    DateMinus(sDate) {
      var sdate = new Date(sDate.replace(/-/g, "/"));
      var now = new Date();
      var days = now.getTime() - sdate.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      return day;
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
  }
};
</script>
<style lang="scss" scope>
@import "../../../static/css/sass/resources/tools.scss";
@import "../../../static/css/sass/resources/settings.scss";
.pannel1 {
  height: 100%;
  display: flex;
  min-height: 670px;
  flex-direction: column;
  .num.customNums {
    @include gradient(#ffffff, #b3b3b3);
  }
  .totalStatics {
    .totalStatics-item {
      width: 50%;
      h3 {
        font-size: 15px;
      }
      .num.overDate {
        @include gradient(#ffaf91, #f71c1c);
      }
      .num.partner {
        @include gradient(#b4ec51, #429321);
      }
    }
  }
  table {
    table-layout: fixed;
    width: 100%;
    height: 100%;
    td {
      height: 42px;
      @include truncate(70%);
    }
    td:nth-child(1) {
      width: 60%;
    }
    .title {
      border-left: 5px solid #f9b74c;
      padding-left: 10px;
    }
    td.date {
      text-align: right;
    }
    .current {
      color: #419ef8;
    }
    .overdate {
      color: #f9b74c;
    }
  }
}
</style>