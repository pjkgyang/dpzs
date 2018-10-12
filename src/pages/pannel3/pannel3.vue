<template>
  <div class="pannel3">
    <div>
      <head-bar :title="'工程完工分析'" :time="nowDate"></head-bar>
    </div>
    <div class="app__content">
      <div class="secure height100" flex>
        <main flex-column col="3">
          <div class="top" flex col="6">
            <Card class="secure__map" col="4" title="" :row="true">
              <china-map @handleChangeqy="handleChangeqy" @handleFilterqy="handleFilterqy" :numPer="((Number(wgtjData.wnwgwcl)+Number(wgtjData.dnwgwcl))/(Number(wgtjData.wnwgmb)+Number(wgtjData.dnwgmb))*100).toFixed(2)" :mapData="mapData" :toolip-title="'工程完工率'"></china-map>
            </Card>
          </div>
          <div class="secure__detail" col="4" flex>
            <Card col="3" title="区域完工统计">
              <doublebar-chart :data="qywgData"  :max="max" :count="count" :qymc="qymc" @handleChooseBar="handleChooseBar"></doublebar-chart>
            </Card>
          </div>
        </main>
        <!-- 右侧表格 -->
        <aside class="secure__rightaside" flex-column col="2">
          <Card col="2" flex-column :row=false>
            <div col="2" flex-column>
              <div flex col="3">
                <div col="1" flex-column>
                  <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">当年项目( 万元 )</h4>
                  <div col="6" flex>
                    <div id="pieItems1" col="4"></div>
                    <div col="2" flex-column rowcenter>
                      <h4>当年目标</h4>
                      <div class="num" style="color:#3AC868;font-size: 25px;margin-bottom: 20px;">{{wgtjData.dnwgmb}}</div>
                      <h4>已完成</h4>
                      <div class="num" style="color:#F9B74C;font-size: 25px;">
                        {{wgtjData.dnwgwcl}}<br>({{!wgtjData.dnwgwcl||!wgtjData.dnwgmb?'-':(Number(wgtjData.dnwgwcl)/Number(wgtjData.dnwgmb)*100).toFixed(2)}}%)
                      </div>
                    </div>
                  </div>
                </div>
                <div col="1" flex-column>
                  <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">当月完工( 万元 )</h4>
                  <div col="6" flex>
                    <div id="pieItems2" col="4"></div>
                    <div col="2" flex-column rowcenter>
                      <h4>当月目标</h4>
                      <div class="num" style="color:#3AC868;font-size: 24px;margin-bottom: 25px;">{{wgtjData.bywgjh}}</div>
                      <h4>已完成</h4>
                      <div class="num" style="color:#F9B74C;font-size: 25px;">
                        {{wgtjData.bywgwcl}}<br>({{!wgtjData.bywgwcl||!wgtjData.bywgjh?'-':(Number(wgtjData.bywgwcl)/Number(wgtjData.bywgjh)*100).toFixed(2)}}%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div col="1" flex>
                <arrow-bar :done="Number(wgtjData.dnwgwcl)" :total="Number(wgtjData.dnwgmb)"></arrow-bar>
              </div>
            </div>
            <div col="2" flex-column>
              <div flex col="3">
                <div col="1" flex-column>
                  <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">往年项目( 万元 )</h4>
                  <div col="6" flex>
                    <div id="pieItems3" col="4"></div>
                    <div col="2" flex-column rowcenter>
                      <h4>往年目标</h4>
                      <div class="num" style="color:#E85650;font-size: 25px;margin-bottom: 20px;">{{wgtjData.wnwgmb}}</div>
                      <h4>已完成</h4>
                      <div class="num" style="color:#37A2F7;font-size: 25px;">
                        {{wgtjData.wnwgwcl}}<br>({{!wgtjData.wnwgwcl||!wgtjData.wnwgmb?'-':(Number(wgtjData.wnwgwcl)/Number(wgtjData.wnwgmb)*100).toFixed(2)}}%)
                      </div>
                    </div>
                  </div>
                </div>
                <div col="1" flex-column>
                  <h4 col="1" flex colcenter class="fontsize16" style="padding-left: 28px;">当月完工( 万元 )</h4>
                  <div col="6" flex>
                    <div id="pieItems4" col="4"></div>
                    <div col="2" flex-column rowcenter>
                      <h4>当月目标</h4>
                      <div class="num" style="color:#E85650;font-size: 25px;margin-bottom: 20px;">{{wgtjData.bywnwgjh}}</div>
                      <h4>已完成</h4>
                      <div class="num" style="color:#27A6F6;font-size: 25px;">
                        {{wgtjData.bywnwgwcl}}<br>({{!wgtjData.bywnwgwcl||!wgtjData.bywnwgjh?'-':(Number(wgtjData.bywnwgwcl)/Number(wgtjData.bywnwgjh)*100).toFixed(2)}}%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div col="1">
                <arrow-bar :done="Number(wgtjData.wnwgwcl)" :total="Number(wgtjData.wnwgmb)"></arrow-bar>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getMyDate } from "../../utils.js";
import headBar from "../../components/header.vue";
import numCardGroup from "../../components/numCardGroup.vue";
import progressBarGroup from "../../components/progressBarGroup.vue";
import Card from "../../components/Card.vue";
import doublebarChart from "../../components/doublebarChart.vue";
import arrowBar from "../../components/arrowBar.vue";
import noData from "../../components/noData.vue";
import chinaMap from "../../components/chinaMap.vue";
import echarts from "echarts";
var json = require("echarts/map/json/china.json");
import provinceArr from "../../../static/mapjson/province.js";
export default {
  data() {
    return {
      summary: {
        totalNum: 864
      },
      currentProvince: provinceArr,
      pie1Value: [
        { value: 35, name: "已完成" },
        { value: 310, name: "未完成" }
      ],
      pie2Value: [
        { value: 335, name: "已完成" },
        { value: 310, name: "未完成" }
      ],
      pie3Value: [
        { value: 335, name: "已完成" },
        { value: 310, name: "未完成" }
      ],
      pie4Value: [
        { value: 335, name: "已完成" },
        { value: 310, name: "未完成" }
      ],
      count: 0,
      qywgData: [],
      nowDate: "",
      wgtjData: {},
      qymc: "",
      qyArr: [],
      mapData: [],
      max: 100
    };
  },
  watch: {},
  created() {
    this.$get(this.API.queryYqWgData, {
      isYs: false
    }).then(res => {
      if (res.data.state == "success") {
        this.count = 3;
        let qymcArr = [];
        let mbArr = [];
        let ywcArr = [];
        let xlArr = [];
        let oldmbArr = [];
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
        res.data.data.qydata.forEach(ele => {
          if (ele.qymc == "渠道工程") {
            ele.qymc = ele.qymc.split("工程")[0];
          }
        qymcArr.push(ele.qymc.split("区域工程")[0]);
          mbArr.push(ele.mbwcl);
          ywcArr.push(ele.wcl);
          xlArr.push(ele.xl);
        });
        this.max = Number(xlArr[0]);
        let len = xlArr.length;
        for (var i = 1; i < len; i++) {
          if (Number(xlArr[i]) > this.max) {
            this.max = Number(xlArr[i]);
          }
        }
        this.qywgData[0] = qymcArr;
        this.qywgData[1] = mbArr;
        this.qywgData[2] = ywcArr;
        this.qywgData[3] = xlArr;
         
        mbArr.forEach((item,i,arr)=>{
           let num = '';
            if(Number(item) -Number(ywcArr[i]) < 0){
              num = 0
            }else{
              num = Number(item) - Number(ywcArr[i])
            }
            oldmbArr.push(num)
          })
        this.qywgData[4] = oldmbArr;

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
    });
    this.queryProjectCompletionPanel();
    this.nowDate = getMyDate(new Date());
  },
  mounted() {},
  methods: {
    handleChooseBar(data) {
      this.queryProjectCompletionPanel(data);
      this.qymc = data;
    },
    handleChangeqy(data) {
      this.queryProjectCompletionPanel(data);
      this.qymc = data;
    },
    handleFilterqy(data) {
      this.queryProjectCompletionPanel(data);
      this.qymc = data;
    },
    queryProjectCompletionPanel(qymc) {
      this.$get(this.API.queryProjectCompletionPanel, {
        curPage: 1,
        pageSize: 999,
        qymc: qymc
      }).then(res => {
        if (res.data.state == "success") {
          this.wgtjData = res.data.data;
          this.pie1Value[1].value =
            Number(res.data.data.dnwgmb) - Number(res.data.data.dnwgwcl) < 0
              ? 0
              : Number(res.data.data.dnwgmb) - Number(res.data.data.dnwgwcl);
          this.pie1Value[0].value = res.data.data.dnwgwcl;

          this.pie2Value[1].value =
            Number(res.data.data.bywgjh) - Number(res.data.data.bywgwcl) < 0
              ? 0
              : Number(res.data.data.bywgjh) - Number(res.data.data.bywgwcl);
          this.pie2Value[0].value = res.data.data.bywgwcl;

          this.pie3Value[1].value =
            Number(res.data.data.wnwgmb) - Number(res.data.data.wnwgwcl) < 0
              ? 0
              : Number(res.data.data.wnwgmb) - Number(res.data.data.wnwgwcl);
          this.pie3Value[0].value = res.data.data.wnwgwcl;

          this.pie4Value[1].value =
            Number(res.data.data.bywnwgjh) - Number(res.data.data.bywnwgwcl) < 0
              ? 0
              : Number(res.data.data.bywnwgjh) -
                Number(res.data.data.bywnwgwcl);
          this.pie4Value[0].value = res.data.data.bywnwgwcl;
          this.initChart("pieItems1", this.pie1Value, ["#F9B74C", "#D1D1D1"]);
          this.initChart("pieItems2", this.pie2Value, ["#F9B74C", "#D1D1D1"]);
          this.initChart("pieItems3", this.pie3Value, ["#37A2F7", "#D1D1D1"]);
          this.initChart("pieItems4", this.pie4Value, ["#37A2F7", "#D1D1D1"]);
        } else {
          this.$alert(res.data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    initChart(id, value, color = ["#3AC868", "#F9B74C", "#E85650", "#37A2F7"]) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(id));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
          position: [20, 20]
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
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
          }
        ]
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
    noData,
    arrowBar,
    headBar,
    chinaMap
  }
};
</script>
<style lang="scss" scope>
@import "../../../static/css/sass/resources/tools.scss";
@import "../../../static/css/sass/resources/settings.scss";
.pannel3 {
  height: 100%;
  display: flex;
  min-height: 670px;
  flex-direction: column;
  font-size: 14px;
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
    th {
      text-align: left;
    }
    td {
      @include truncate(70%);
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