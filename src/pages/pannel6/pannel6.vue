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
                            <Card class="" col="4"  title="综合统计(万元)" flex :gradient='["#0086E3","rgba(0,70,209,0.33)"]'>
                                <div col="1" flex-column spacearound>
                                    <div flex spacearound>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num fontsize60">{{pannelData.zbwgl}}</div>
                                            <h3>完工量</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num fontsize60">
                                                {{(((Number(pannelData.zbrlfy)+Number(pannelData.zbekfy)+Number(pannelData.zbkbfy))/Number(pannelData.zbwgl))*100).toFixed(0)+"%"}}
                                            </div>
                                            <h3>效率</h3>
                                        </div>
                                    </div>
                                    <div flex spacearound>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num1 fontsize60">{{!pannelData.zbrlfy?0:pannelData.zbrlfy}}</div>
                                            <h3>工程</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num2 fontsize60">{{!pannelData.zbekfy?0:pannelData.zbekfy}}</div>
                                            <h3>二开</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num3 fontsize60">{{!pannelData.zbkbfy?0:pannelData.zbkbfy}}</div>
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
                                        <th width="90">金额(万元)</th>
                                    </thead>
                                </table>
                                <table  v-if="jsData.length > 0"  class="table" @mouseover="handleClearTimer" @mouseout="handleStartTimer">
                                    <tbody :class="{animcb1:animate==true}">
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
                        <Card class="" col="4"  title="" flex>
                            <!-- <div ref="chinamap" id="chinamap"></div> -->
                             <china-map  @handleChangeqy="handleChangeqy" @handleFilterqy="handleFilterqy"  
                             :circle-show="false" :toolip-title="'效率'" :map-data="mapData" :map-color='["#f00","#50ce31"]'></china-map>
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="效率(万元)">
                            <doublebar-chart :data="barData" :max="max" :count="count" :qymc="qymc" @handleChooseBar="handleChooseBar"></doublebar-chart>
                        </Card>
                    </div>
                </main>
                <!-- 右侧表格 -->
                <aside class="" flex-column col="2">
                    <div class="" flex-column col="6">
                        <Card class="projects" col="2" title="软件项目(万元)" flex rowcenter style="position:relative;">
                            <!-- <span style="position:absolute;top:16px;right:16px;">
                                <template v-for="(items,index) in tabbtn">
                                    <span :class="{'titlebutton':true,'titlebtnactive':index==curTabindex1}" @click='chooseBtn1(index)'>{{items}}</span>
</template>
</span> -->
<!-- <div col="1" flex style="width:98%;margin: 0 auto;">
    <div flex col="1" spacebetween colcenter>
        <div flex spacebetween colcenter style="background-image: linear-gradient(-180deg, rgb(227, 144, 0,0.6) 0%, rgba(221,206,0,0.4) 20%, rgba(214,213,0,0.2) 48%, rgba(209,202,0,0.00) 100%);width:100%;height:50px;padding:0 20px;">
            <span class="text">效率</span>
            <span class="num" style="text-align:right">
                {{(!xmData.wcl||!xmData.cb?0:Number(xmData.cb)/Number(xmData.wcl)*100).toFixed(0)}}%
            </span>
        </div>
    </div>
</div> -->
<div col="1" flex spacearound>
     <div class="totalStatics-item" flex-column center>
          <div class="num num1 fontsize60">{{!pannelData.dnrjwg?0:pannelData.dnrjwg}}</div>
          <h3>当年完工</h3>
      </div>
      <div class="totalStatics-item" flex-column center>
          <div class="num num2 fontsize60">{{!pannelData.wnrjwg?0:pannelData.wnrjwg}}</div>
          <h3>往年完工</h3>
      </div>
      
</div>

     <div col="1" flex spacearound>
      <div class="totalStatics-item" flex-column center>
          <div class="num num1 fontsize60">{{!pannelData.dnrjys?0:pannelData.dnrjys}}</div>
          <h3>当年验收</h3>
      </div>
      <div class="totalStatics-item" flex-column center>
          <div class="num num2 fontsize60">{{!pannelData.wnrjys?0:pannelData.wnrjys}}</div>
          <h3>往年验收</h3>
      </div>
</div>
</Card>
<Card class="projects" col="1" title="服务项目(万元)" flex style="position:relative;">
    <!-- <span style="position:absolute;top:16px;right:16px;">
        <span v-for="(items,index) in tabbtn" :class="{'titlebutton':true,'titlebtnactive':index==curTabindex2}" @click='chooseBtn2(index)'>{{items}}</span>
    </span> -->
    <div col="1" flex spacearound>
      <div class="totalStatics-item" flex-column center>
          <div class="num num1 fontsize60">{{!pannelData.dnqtwg?0:pannelData.dnqtwg}}</div>
          <h3>当年完工</h3>
      </div>
      <div class="totalStatics-item" flex-column center>
          <div class="num num2 fontsize60">{{!pannelData.wnqtwg?0:pannelData.wnqtwg}}</div>
          <h3>往年完工</h3>
      </div>
    </div>
    <!-- <div col="1" flex spacebetween>
        <div flex col="1" rowcenter colcenter>
            <span class="text">往年验收</span>
            <span class="num">
                 {{(!otherData.wcl||!otherData.cb?0:Number(otherData.cb)/Number(otherData.wcl)*100).toFixed(0)}}%
            </span>
        </div>
        <div flex col="1" rowcenter colcenter>
            <span class="text">往年验收</span>
            <span class="num">{{!otherData.cb?0:otherData.cb}}</span>
        </div>
    </div> -->
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
                <div class="num num1 fontsize60">{{!pannelData.gbrlfy?0:pannelData.gbrlfy}}</div>
                <h3>工程(万元)</h3>
            </div>
            <div class="totalStatics-item" flex-column center>
                <div class="num num2 fontsize60">{{!pannelData.gbekfy?0:pannelData.gbekfy}}</div>
                <h3>二开(万元)</h3>
            </div>
            <div class="totalStatics-item" flex-column center>
                <div class="num num3 fontsize60">{{!pannelData.gbkbfy?0:pannelData.gbkbfy}}</div>
                <h3>可变(万元)</h3>
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
import { getMyDate } from "../../utils.js";
import headBar from "../../components/header.vue";
import progressBarGroup from "../../components/progressBarGroup.vue";
import Card from "../../components/Card.vue";
import doublebarChart from "../../components/doublebarChart.vue";
import arrowBar from "../../components/arrowBar.vue";
import noData from "../../components/noData.vue";
import chinaMap from "../../components/chinaMap.vue";
import echarts from "echarts";
var json = require("echarts/map/json/china.json");

export default {
  data() {
    return {
      summary: {
        totalNum: 864
      },
      curTabindex1: 0,
      curTabindex2: 0,
      tabbtn: ["当年", "往年"],
      pie1Value: [
        { value: 35, name: "工程" },
        { value: 310, name: "二开" },
        { value: 230, name: "可变" }
      ],
      pannelData: {},
      jsData: [],
      barData: [],
      count: 0,
      nowDate: "",
      animate: false,
      timer: null,
      qymc: "",
      mapData: [],
      max:100
    };
  },
  created() {
    this.nowDate = getMyDate(new Date());
    this.queryCostAnalysisPanel();
    this.$get(this.API.queryRegionSubcontractEfficiency, {}).then(res => {
      if (res.data.state == "success") {
        this.count = 2;
        let qymcArr = [];
        let zjeArr = [];
        let ywcArr = [];
        let xlArr = [];
        res.data.data.qydata.forEach(ele => {
          if (ele.qymc == "渠道工程") {
            ele.qymc = ele.qymc.split("工程")[0];
          }
          qymcArr.push(ele.qymc.split("区域工程")[0]);
          zjeArr.push(ele.zje);
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
        this.barData[0] = qymcArr;
        this.barData[1] = zjeArr;
        this.barData[2] = ywcArr;
        this.barData[3] = xlArr;
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
    });
  },
  watch: {},
  mounted() {},
  methods: {
    handleChooseBar(data) {
      this.queryCostAnalysisPanel(data);
      this.qymc = data;
    },
    handleChangeqy(data) {
      this.queryCostAnalysisPanel(data);
      this.qymc = data;
    },
    handleFilterqy(data) {
      this.queryCostAnalysisPanel(data);
      this.qymc = data;
    },
    handleClearTimer() {
      clearInterval(this.timer);
    },
    handleStartTimer() {
      if (this.jsData.length > 7) {
        this.timer = setInterval(this.scroll, 1000);
      }
    },
    scroll() {
      this.animate = true;
      setTimeout(() => {
        this.jsData.push(this.jsData[0]);
        this.jsData.shift();
        this.animate = false;
      }, 500);
    },
    queryCostAnalysisPanel(qymc) {
      clearInterval(this.timer);
      this.$get(this.API.queryCostAnalysisPanel, {
        curPage: 1,
        pageSize: 9999,
        qymc: qymc
      }).then(res => {
        if (res.data.state == "success") {
          this.pannelData = res.data.data;
          res.data.data.jsData.forEach((ele, i, arr) => {
            ele.mc = i + 1;
          });
          this.jsData = res.data.data.jsData;
          this.pie1Value[0].value = res.data.data.zbrlfy;
          this.pie1Value[1].value = res.data.data.zbekfy;
          this.pie1Value[2].value = res.data.data.zbkbfy;
          this.initChart("pieItems1", this.pie1Value);
          if (this.jsData.length > 7) {
            this.timer = setInterval(this.scroll, 1000);
          }
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
          formatter: "{b}: {c} ({d}%)"
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
.pannel6 {
  height: 100%;
  display: flex;
  min-height: 670px;
  flex-direction: column;
  .projects {
    .text {
      font-size: 18px;
      width: 100px;
      text-align: center;
    }
    .num {
      font-size:50px;
    }
  }
  .totalStatics-item {
    .num.num1 {
      @include gradient(#b4ec51, #429321);
    }
    .num.num2 {
      @include gradient(#ffaf91, #f71c1c);
    }
    .num.num3 {
      @include gradient(#ffd891, #f7791c);
    }
  }
  .theadTable {
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
    tbody {
      display: block;
      width: 100%;
      height: 95%;
      td {
        text-align: center;
        height: 30px;
        line-height: 30px;
        @include truncate(70%);
      }
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
  span.titlebutton {
    font-size: 12px;
    display: inline-block;
    padding: 4px 12px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 3px;
    cursor: pointer;
  }
  span.titlebtnactive {
    background: #27a6f6;
    border: 1px solid #27a6f6;
  }
}
</style>