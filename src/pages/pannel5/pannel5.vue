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
                                            <div class="num num1 fontsize50">{{pannelData.zsrs}}</div>
                                            <h3>正式</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num2 fontsize50">{{pannelData.sxrs}}</div>
                                            <h3>实习</h3>
                                        </div>
                                        <div class="totalStatics-item" flex-column center>
                                            <div class="num num3 fontsize50">{{pannelData.qtrs}}</div>
                                            <h3>其他</h3>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Card class="" col="6" flex-column :title="'人员级别'">
                                <div  flex-column  v-if="ryjbData.length">
                                    <div col="1" flex colcenter>
                                        <div col="1"  textcenter><span class="dot dot4"></span>&nbsp;资格</div>
                                        <div col="1"  textcenter><span class="dot dot1"></span>&nbsp;初级</div>
                                        <div col="1"  textcenter><span class="dot dot2"></span>&nbsp;中级</div>
                                        <div col="1"  textcenter><span class="dot dot3"></span>&nbsp;高级</div>
                                    </div>
                                    <div col="8" style="padding:15px 0">
                                        <el-scrollbar style="height:400px">
                                            <div style="margin-bottom:12px" flex-column  colcenter v-for="item in ryjbData" >
                                                <div class="progress-outter">
                                                    <span class="progress-zg num" :style="{width:Number(!item.zg?0:item.zg)*100/(Number(!item.zg?0:item.zg)+Number(!item.cj?0:item.cj)+Number(!item.zj?0:item.zj)+Number(!item.gj?0:item.gj)) + '%'}">{{!item.zg?0:item.zg}}</span>
                                                    <span class="progress-low num" :style="{width:Number(!item.cj?0:item.cj)*100/(Number(!item.zg?0:item.zg)+Number(!item.cj?0:item.cj)+Number(!item.zj?0:item.zj)+Number(!item.gj?0:item.gj)) + '%'}">{{item.cj}}</span>
                                                    <span class="progress-mid num" :style="{width:Number(!item.zj?0:item.zj)*100/(Number(!item.zg?0:item.zg)+Number(!item.cj?0:item.cj)+Number(!item.zj?0:item.zj)+Number(!item.gj?0:item.gj)) + '%'}">{{item.zj}}</span>
                                                    <span class="progress-high num" :style="{width:Number(!item.gj?0:item.gj)*100/(Number(!item.zg?0:item.zg)+Number(!item.cj?0:item.cj)+Number(!item.zj?0:item.zj)+Number(!item.gj?0:item.gj)) + '%'}">{{item.gj}}</span>
                                                </div>
                                                <h4>{{item.CPXMC}}</h4>
                                            </div>
                                            </el-scrollbar>
                                        </div>
                                </div>
                             <no-data col="1" v-else />
                          
                        </Card>
                    </div>
                </aside>
                <main flex-column col="4">
                    <div class="" flex col="6">
                        <Card class="" col="4" title="" flex>
                            <!-- <div ref="chinamap" id="chinamap" col="5"></div> -->
                            <chinaMap col="5" @handleChangeqy="handleChangeqy" @handleFilterqy="handleFilterqy" :title="'挣值效率'" :userTag="isCheck"
                            :mapData="mapData"  :toolip-title="'挣值效率'" :num-per="(Number(pannelData.zzz)/Number(pannelData.zjx)*100).toFixed(2)" 
                            @handleCheckReport="handleCheckReport"></chinaMap>
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
                                        <th width="110">姓名</th>
                                        <th width="100">总挣值</th>
                                        <th width="90">效率</th>
                                    </thead>
                                </table>
                              <el-scrollbar style="height:100%">
                                <table  v-if="ryzzData.length > 0"  class="table" @mouseover="handleClearTimer" @mouseout="handleStartTimer">
                                    <tbody :class="{animcb:animate==true}">
                                      <tr v-for="(item,index) in ryzzData" :key="index" flex spacearound >
                                        <td width="110">{{item.mc}}</td>
                                        <td width="100">{{item.zz}}</td>
                                        <td width="90">{{item.xl}}</td>
                                     </tr>
                                    </tbody>
                              </table>
                            <no-data col="1" v-else />
                          </el-scrollbar>
                        </Card>
                    </div>
                    <div class="" col="3" flex>
                        <Card col="3" title="战队挣值">
                            <table class="theadTable">
                                    <thead flex spacearound>
                                        <th width="110">战队名称</th>
                                        <th width="100">总挣值</th>
                                        <th width="90">效率</th>
                                    </thead>
                                </table>
                                 <el-scrollbar style="height:100%">
                                  <table  v-if="zdzzData.length > 0"  class="table" @mouseover="handleClearTimer2" @mouseout="handleStartTimer2">
                                      <tbody :class="{animcb:animateZd==true}">
                                        <tr v-for="(item,index) in zdzzData" :key="index" flex spacearound >
                                          <td width="110">{{item.mc}}</td>
                                          <td width="100">{{item.zz}}</td>
                                          <td width="90">{{item.xl}}</td>
                                      </tr>
                                      </tbody>
                                </table>
                               <no-data col="1" v-else />
                            </el-scrollbar>
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
import numCardGroup from "../../components/numCardGroup.vue";
import progressBarGroup from "../../components/progressBarGroup.vue";
import Card from "../../components/Card.vue";
import doublebarChart from "../../components/doublebarChart.vue";
import arrowBar from "../../components/arrowBar.vue";
import chinaMap from "../../components/chinaMap.vue";
import noData from "../../components/noData.vue";
import provinceArr from "../../../static/mapjson/province.js";
import echarts from "echarts";
var json = require("echarts/map/json/china.json");

export default {
  data() {
    return {
      summary: {
        totalNum: 864
      },
      pie1Value: [
        { value: 35, name: "人力" },
        { value: 310, name: "二开" },
        { value: 230, name: "可变" }
      ],
      currentProvince: provinceArr,
      pannelData: {},
      ryzzData: [],
      zdzzData: [],
      ryjbData: [],
      animate: false,
      animateZd: false,
      timer: null,
      timer2: null,
      nowDate: "",
      mapData: [],
      qygc:'',

      isCheck:false
    };
  },
  created() {
    this.queryPersonnelPanel();
    this.nowDate = getMyDate(new Date());
    if(JSON.parse(sessionStorage.getItem('userInfo')).includes('JYGL')){
      this.isCheck = true 
    }
  },
  watch: {},
  mounted() {},
  methods: {
    handleCheckReport(){
      let routeData = this.$router.resolve({
        name: "ryReport",
        query: {
          qy:this.qygc
        }
      });
      window.open(routeData.href, "_blank");
    },
    handleChangeqy(data) {
      console.log(data)
      this.queryPersonnelPanel(data);
    },
    handleFilterqy(data) {
      this.qygc = data
      this.queryPersonnelPanel(data);
    },
    handleClearTimer() {
      clearInterval(this.timer);
    },
    handleStartTimer() {
      if (this.ryzzData.length > 12) {
        this.timer = setInterval(this.scroll, 10000);
      }
    },
    handleClearTimer2() {
      clearInterval(this.timer2);
    },
    handleStartTimer2() {
      if (this.zdzzData.length > 12) {
        this.timer2 = setInterval(this.scrollZd, 10000);
      }
    },
    scroll() {
      this.animate = true;
      this.ryzzData = this.ryzzData.concat(this.ryzzData.slice(0,8));
      setTimeout(() => {
        // this.ryzzData.push(this.ryzzData[0]);
        // this.ryzzData.shift();
        this.ryzzData.splice(0,8);
        this.animate = false;
      }, 500);
    },
    scrollZd() {
      this.animateZd = true;
      this.zdzzData = this.zdzzData.concat(this.zdzzData.slice(0,8));
      setTimeout(() => {
        // this.zdzzData.push(this.zdzzData[0]);
        // this.zdzzData.shift();
        this.zdzzData.splice(0,8);
        this.animateZd = false;
      }, 500);
    },
    queryPersonnelPanel(qymc) {
      clearInterval(this.timer);
      clearInterval(this.timer2);
      this.$get(this.API.queryPersonnelPanel, {
        curPage: 1,
        pageSize: 9999,
        qymc: qymc
      }).then(res => {
        if (res.data.state == "success") {
          this.pannelData = res.data.data;
          this.ryzzData = res.data.data.ryzzData;
          this.zdzzData = res.data.data.zdzzData;
          this.ryjbData = res.data.data.ryjbData;
          let keyMap = {
            "1": "zg",
            "2": "cj",
            "3": "zj",
            "4": "gj",
            // CPXBH: "CPXBH",
            // CPXMC: "CPXMC"
          };
          for (var i = 0; i < this.ryjbData.length; i++) {
            var obj = this.ryjbData[i];
            for (var key in obj) {
              var newKey = keyMap[key];
              if (newKey) {
                obj[newKey] = obj[key];
                   delete obj[key];
              }
            }
          }
          if (!!res.data.data.provinceData) {
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
              }else if (ele.PROVINCE.indexOf("壮族") != -1) {
                ele.PROVINCE = ele.PROVINCE.split("壮族")[0];
              }else if (ele.PROVINCE.indexOf("特别行政区") != -1) {
                ele.PROVINCE = ele.PROVINCE.split("特别行政区")[0];
              }
            });
            this.mapData = res.data.data.provinceData;
            let keyMap2 = {
              PROVINCE: "name",
              PROVINCEDATA: "value"
            };
            for (var i = 0; i < this.mapData.length; i++) {
              var obj = this.mapData[i];
              for (var key in obj) {
                var newKey = keyMap2[key];
                if (newKey) {
                  obj[newKey] = obj[key];
                  delete obj[key];
                }
              }
            }
          }
          if (this.ryzzData.length > 12) {
            this.timer = setInterval(this.scroll, 10000);
          }
          if (this.zdzzData.length > 12) {
            this.timer2 = setInterval(this.scrollZd,10000);
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
.pannel5 {
  height: 100%;
  display: flex;
  min-height: 670px;
  flex-direction: column;
  .totalStatics-item {
    h3 {
      font-size: 14px;
    }
  }
  h3.arrowtop {
    background: url(../../../static/assets/arrowtop.png) 0 60% no-repeat;
    text-indent: 26px;
    background-size: 21px;
  }
  h3.arrowdown {
    background: url(../../../static/assets/arrowdown.png) 0 60% no-repeat;
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
    background: #e9b042;
  }
  .dot2 {
    background: #9d81d2;
  }
  .dot3 {
    background: #37a2f7;
  }
  .dot4{
    background: #24b63c;  
  }
  .progress-outter {
    width: 80%;
    font-size: 0;
    height: 28px;
    line-height: 28px;
    margin-bottom: 4px;
    border-radius: 5px;
    overflow: hidden;
    span {
      display: inline-block;
      font-size: 20px;
      text-align: center;
    }
    span.progress-zg{
       background: #24b63c;
      //  border-bottom-left-radius: 10px;
      //  border-top-left-radius: 10px;
    }
    span.progress-low {
      background: #e9b042;
      // border-bottom-left-radius: 10px;
      // border-top-left-radius: 10px;
    }
    span.progress-mid {
      background: #9d81d2;
    }
    span.progress-high {
      background: #37a2f7;
      // border-bottom-right-radius: 10px;
      // border-top-right-radius: 10px;
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
    @include gradient(#b4ec51, #429321);
  }
  .num.num2 {
    @include gradient(#ffaf91, #f71c1c);
  }
  .num.num3 {
    @include gradient(#ffd891, #f7791c);
  }
  .num.numzs {
    @include gradient(#ffffff, #d1d1d1);
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
      height: 80%;
      td {
        text-align: center;
        height: 28px;
        line-height: 28px;
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