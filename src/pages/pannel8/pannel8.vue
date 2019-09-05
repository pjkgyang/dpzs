<template>
  <div class="pannel-fwt" flex-column spacebetween>
    <div class="pannel-fwt_top" flex spacebetween colcenter>
      <h2>服务台实时动态</h2>
      <div flex colcenter>
        <!-- :remote-method="remoteMethod" -->
        <el-select v-model="dwbh" filterable remote reserve-keyword  placeholder="请选择" @change="handleChangeDept">
          <el-option v-for="item in options" :key="item.wid" :label="item.jc" :value="item.wid"></el-option>
        </el-select>&#x3000;
        <span>{{pannelData.ksrq}}起</span>
      </div>
    </div>
    <div class="pannel-fwt_bottom" col="9" flex spacebetween>
      <div class="bottom-left bgshadow">
        <section class="top">
          <div flex colcenter class="top-info">
            <div class="pie-chart" id="pieChart"></div>
            <div colcenter rowcenter flex-column>
              <p class="fontShadow" flex colcenter>
                <img src="../../../static/images/service.png" alt />&nbsp;
                <span>服务请求总数</span>
              </p>
              <p class="fontsize50">{{pannelData.fwzs}}</p>
            </div>
          </div>
          <div class="top-oprate" flex spacebetween>
            <section class="bg-clz" flex-column spacearound>
              <div textcenter>
                <img src="../../../static/images/clz.png" alt />
              </div>
              <div textcenter>
                <span class="fontShadow">处理中</span>
                <br />
                <span class="fontsize36">{{pannelData.clzzs}}</span>
              </div>
            </section>
            <section class="bg-dyz" flex-column spacearound>
              <div textcenter>
                <img src="../../../static/images/dyz.png" alt />
              </div>
              <div textcenter>
                <span class="fontShadow">待验证</span>
                <br />
                <span class="fontsize36">{{pannelData.dyzzs}}</span>
              </div>
            </section>
            <section class="bg-ybj" flex-column spacearound>
              <div textcenter>
                <img src="../../../static/images/ybj.png" alt />
              </div>
              <div textcenter>
                <span class="fontShadow">已办结</span>
                <br />
                <span class="fontsize36">{{pannelData.ybjzs}}</span>
              </div>
            </section>
          </div>
        </section>
        <section class="bottom">
          <div flex class="bottom-top">
            <section flex colcenter rowcenter v-for="item in jjscpfData">
              <img :src="item.imgurl" alt />&#x3000;
              <p>
                <span class="fontShadow">{{item.mc}}</span>
                <br />
                <span class="fontsize36">{{item.val}}</span>
              </p>
            </section>
          </div>
          <div class="bottom-percentage" flex spacebetween>
            <section textcenter v-for="(item,index) in cllData">
              <span class="fontShadow">{{item.mc}}</span>
              <br />
              <el-progress type="circle" :width="100" :percentage="item.val" :color="item.color"></el-progress>
            </section>
          </div>
        </section>
      </div>
      <div class="bottom-center" flex-column spacebetween>
        <section class="bgshadow" v-loading="lineloading" element-loading-background="rgba(0, 0, 0, 0.5)">
          <div class="lineChart-title" flex colcenter row-end>
            <span
              v-for="(item,index) in lineTab"
              :class="{'tab-active':curIndex == index}"
              @click="handleChangeTab(index)"
            >{{item}}</span>
          </div>
          <div class="lineChart" id="lineChart"></div>
        </section>
        <section style="height:20px"></section>
        <section
          class="bgshadow bar-chart"
          v-loading="barloading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
        >
          <div class="barChart" id="barChart"></div>
        </section>
      </div>
      <div class="bottom-right" flex-column spacebetween>
        <section class="xxxtqq-layout bgshadow">
          <div class="xxxtqq-title fontsize18" flex colcenter>信息系统服务请求</div>
          <div class="xxxtqq-li-height title" flex>
            <p>信息系统</p>
            <p>请求数</p>
            <p>处理中</p>
            <p>待验证</p>
            <p>已办结</p>
          </div>
          <vue-seamless-scroll
            v-if="!!statData.length"
            :data="statData"
            :class-option="optionSinglexxxt"
            class="xxxt-seamless-warp"
          >
            <ul class="seamless-warp_ul">
              <li class="xxxtqq-li-height" v-for="item in statData" flex>
                <p :title="item.yymc">{{item.yymc}}</p>
                <p>{{item.fwzs}}</p>
                <p>{{item.clzzs}}</p>
                <p>{{item.dyzzs}}</p>
                <p>{{item.ybjzs}}</p>
              </li>
            </ul>
          </vue-seamless-scroll>
          <div v-if="!statData.length" class="empty-content">
              暂无内容
          </div>
        </section>

        <section style="height:20px"></section>

        <section class="xxxtqq-layout bgshadow">
          <div class="xxxtqq-title fontsize18" flex colcenter>近期服务请求</div>
          <div class="jqfwqq-li-height title" flex>
            <p>服务请求</p>
            <p>提出部门</p>
            <p>提出时间</p>
            <p>处理状态</p>
          </div>
          <vue-seamless-scroll
            v-if="!!recentData.length"
            :data="recentData"
            :class-option="optionSinglexxxt"
            class="xxxt-seamless-warp"
          >
            <ul class="seamless-warp_ul">
              <li class="jqfwqq-li-height" v-for="item in recentData" flex>
                <p :title="item.bt">{{item.bt}}</p>
                <p :title="item.bmmc">{{item.bmmc}}</p>
                <p :title="item.tbsj">{{item.tbsj}}</p>
                <p
                  :title="item.zt_display"
                  :class="{'clz-color':item.zt==1,'dyz-color':item.zt==2,'bj-color':item.zt==3}"
                >{{item.zt_display}}</p>
              </li>
            </ul>
          </vue-seamless-scroll>
          <div v-if="!recentData.length" class="empty-content">
              暂无内容
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { GetDateStr,setCookie,getCookie } from "../../utils.js";
import { setInterval, clearTimeout, clearInterval, setTimeout } from 'timers';
export default {
  data() {
    return {
      xxkw: "", //单位关键字
      options: [],
      loading: false,
      jjscpfData: [
        {
          mc: "用户平均解决时长（天）",
          val: 0,
          imgurl: require("../../../static/images/jjsc.png")
        },
        {
          mc: "整体平均评分（分）",
          val: 0,
          imgurl: require("../../../static/images/ztpj.png")
        }
      ], //解决时长 评分
      cllData: [
        { mc: "按承诺处理率", val: 35.5, color: "#E25EA0" },
        { mc: "按期望处理率", val: 50, color: "#3A7CFF" },
        { mc: "好评率", val: 62, color: "#4ABDCD" }
      ], //处理率
      curIndex: 0,
      lineTab: ["近30天"],
      
      // 柱图数据
      barLegend:[],
      barxAxis:[],
      barSeries:[],
      barTotal:0,
      barTimer:null,
      initTimer:null,
      barloading:false,
      // 折线图数据
      lineLegend:[],
      linexAxis:[],
      lineSeries:[],
      lineTimer:null,
      lineloading:false,

      ksrq: "", //开始日期
      dwbh: "",
      pannelData: {},
      currentPage: 1,
      pageSize: 10,
      // 统计分页
      currentPageStat: 1,
      pageSizeStat: 999,
      // 部门分页
      currentPageDept: 1,
      pageSizeDept: 10,
      // 请求数
      currentPageQqs: 1,
      pageSizeQqs: 10,
      // 信息系统服务请求
      statData: [],
      // 最近请求
      recentData: [],
      deptData: [],
      legendData:[]
    };
  },
  mounted() {
    let _this = this;
    if(!!getCookie('dwbh')){
      this.dwbh = getCookie('dwbh');
    }
    window.onresize = function() {
      _this.handleResizChart();
    };
    this.getDwByUser();
    this.barInterval();
    this.initData();
  },
  destroyed(){
    clearInterval(this.barTimer);
    clearInterval(this.initTimer);
  },
  methods: {
    getData(){
      this.getPanelData();
      this.pageAppStat();
      this.pageRecentRequest();
      this.pageDeptServiceDesk(); 
    },
    // 饼图
    initChart1() {
      let myChart = echarts.init(document.getElementById("pieChart"));
      let _this = this;
      // 指定图表的配置项和数据
      let option = {
         legend: {
            // data:['待验证','处理中','已办结'],
          textStyle: {
            color: "#ccc",
          },
          formatter:  function(name){
              let total = 0;
              let target;
              _this.legendData.forEach(ele=>{
                 total += ele.value;
                if (ele.name == name) {
                    target = ele.value;
                }
              })
              return name + '(' + ((target/total)*100).toFixed(0) + '%)';
            }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
          // position: function(point, params, dom, rect, size) {
          //   //其中params为当前鼠标的位置
          //   return [params[0] - 220, "10%"];
          // }
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            itemStyle: {
              normal: {
                // 设置扇形的阴影
                shadowBlur: 30,
                shadowColor: "rgba(0,0,0,0.1)",
                shadowOffsetX: -5,
                shadowOffsetY: 5
              }
            },
            label: {
              show: false,
              fontSize: 16,
              fontFamily: "DINCondensed",
              fontWeight: "bolder",
              // position: "inside",
              textBorderWidth: 0,
              align: "right",
              formatter: "{d}%\n{b}"
            },
            data: [
              {
                value: this.pannelData.dyzzs,
                name: "待验证",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: this.pannelData.dyzzs<10?20:0,
                    y: 10,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#47AFED" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#305FFD" // 100% 处的颜色
                      }
                    ]
                  }
                }
              },
              {
                value: this.pannelData.clzzs,
                name: "处理中",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#4ABDCB" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#4DC7B5" // 100% 处的颜色
                      }
                    ]
                  }
                }
              },
              {
                value: this.pannelData.ybjzs,
                name:"已办结",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#8253FF" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#6A4BFF" // 100% 处的颜色
                      }
                    ]
                  }
                }
              }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    // 折线图
    initLine() {
      let myChart = echarts.init(document.getElementById("lineChart"));
      let option = {
        title: {
          text: "新增/解决服务请求数",
          x: "45",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        color: ["#4EC5DB", "#BF539A"],
        legend: {
          data: this.lineLegend,
          x: "70%",
          textStyle: {
            color: "#ccc"
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#706FAD"
              }
            },
            axisLabel: {
              interval: (index, name) => {
                if ((index + 1) % 6 === 0 || index == 0) {
                  return true;
                }
                return false;
              },
              textStyle: {
                color: "#fff"
              }
            },
            data:this.linexAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#706FAD"
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#706FAD"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#484491"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#706FAD"
              }
            }
          }
        ],
        series: this.lineSeries
      };
      myChart.setOption(option);
    },

    // 柱图
    initBar() {
      let myChart = echarts.init(document.getElementById("barChart"));
      let option = {
        color: ["#4ABDCD", "#7B49FF"],
        title: {
          text: "各业务部门服务请求处理情况",
          x: "45",
          y: "20",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          data: this.barLegend,
          x: "70%",
          y: "20",
          textStyle: {
            color: "#ccc"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              margin: 10,
              rotate:-45,
              textStyle: {
                color: "#fff"
              },
              interval:0
            },
            axisLine: {
              lineStyle: {
                color: "#706FAD"
              }
            },
            data:this.barxAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        grid: {
          left: "5%",
          right: "5%"
        },
        series: this.barSeries
      };

      myChart.setOption(option);
    },

    // remoteMethod(query) {
    //   this.getDwByUser(true,query);
    // },

    handleChangeDept(){
      this.currentPage = 1;
      this.currentPageStat = 1;
      this.currentPageDept = 1;
      this.currentPageQqs = 1;
      if(!!this.dwbh){
        this.getData();
      }
      setCookie('dwbh',this.dwbh);
    },
    handleResizChart() {
      echarts.init(document.getElementById("pieChart")).resize();
      echarts.init(document.getElementById("lineChart")).resize();
      echarts.init(document.getElementById("barChart")).resize();
    },

    getDwByUser(filter,keyword) {
      this.$get(this.API.getDwByUser, {
        dwlx: "",
        curPage: 1,
        pageSize: 9999,
        keyword:keyword
      }).then(res => {
        if (res.data.state == "success") {
          this.options = res.data.data.rows;
          if(!filter && !getCookie('dwbh')){
            this.dwbh = res.data.data.rows[0].wid;
          }
          if(!filter){
            this.getData();
          } 
        }
      });
    },
    //
    handleChangeTab(index) {
      this.curIndex = index;
    },

    // 获取大屏数据
    getPanelData() {
      this.$get(this.API.getPanelData, {
        dwbh: this.dwbh
      }).then(res => {
        if (res.data.state == "success") {
          this.pannelData = res.data.data;
          // 解决情况
          this.jjscpfData[0].val = res.data.data.pjjjsc;
          this.jjscpfData[1].val = res.data.data.pjpf;
          // 处理率
          this.cllData[0].val = Number(res.data.data.cncllv.toFixed(2));
          this.cllData[1].val = Number(res.data.data.qwcllv.toFixed(2));
          this.cllData[2].val = Number(res.data.data.hplv.toFixed(2));

          this.legendData[0] = {name:'待验证',value:res.data.data.dyzzs};
          this.legendData[1] = {name:'处理中',value:res.data.data.clzzs};
          this.legendData[2] = {name:'已办结',value:res.data.data.ybjzs};
          if(!!res.data.data.ksrq){
              if (new Date(GetDateStr(-30)).getTime() >
              new Date(res.data.data.ksrq).getTime()
            ) {
              this.ksrq = GetDateStr(-30);
            } else {
              this.ksrq = res.data.data.ksrq;
            }
          }else{
            this.ksrq = GetDateStr(0);
          }
          this.increasedStat();
          this.initChart1();
        } else {
        }
      });
    },
    // 获取应用统计分页数据
    pageAppStat() {
      this.$get(this.API.pageAppStat, {
        curPage: this.currentPageStat,
        pageSize: this.pageSizeStat,
        dwbh: this.dwbh
      }).then(res => {
        if (res.data.state == "success") {
          if (!!res.data.data.rows) {
            this.statData = res.data.data.rows;
          } else {
            this.statData = [];
          }
        } else {
        }
      });
    },
    // 最近请求分页列表
    pageRecentRequest() {
      this.$get(this.API.pageRecentRequest, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        dwbh: this.dwbh
      }).then(res => {
        if (res.data.state == "success") {
          if (!!res.data.data.rows) {
            this.recentData = res.data.data.rows;
          } else {
            this.recentData = [];
          }
        } else {
        }
      });
    },

    // 部门统计分页
    pageDeptServiceDesk() {
      let _this = this;
      this.barloading = true;
      this.$get(this.API.pageDeptServiceDesk, {
        curPage: this.currentPageDept,
        pageSize: this.pageSizeDept,
        dwbh: this.dwbh
      }).then(res => {
        if (res.data.state == "success") {
 
         this.barLegend = res.data.data.legend;
         this.barxAxis = res.data.data.xAxis;
         this.barSeries = res.data.data.series;
         this.barTotal = res.data.data.total;

         this.barSeries.forEach(ele=>{
           ele.itemStyle = {normal: {label: { 
             show: true, 
             position: "inside",
             formatter:function(v){
               let total = 0;
               let num1 = _this.barSeries[0].data[v.dataIndex];
               let num2 = _this.barSeries[1].data[v.dataIndex];
               total = num1+num2;
               return ele.name=='解决数'?(v.value + '\n(' + (total==0?0:((v.value/total)*100).toFixed(0)) + '%)'):v.value;
              }
            }}};
         })

         this.initBar();
         setTimeout(()=>{
           this.barloading = false;
         },1000)
         if(this.currentPageDept >= this.barTotal){
           this.currentPageDept = 1;
         }else{
           this.currentPageDept += 1;
         }
        } else {

        }
      });
    },

    //  折线统计数据
    increasedStat(){
      this.lineloading = true;
      this.$get(this.API.increasedStat, {
        startDt: this.ksrq,
        endDt: GetDateStr(0),
        dwbh: this.dwbh
      }).then(res => {
        if (res.data.state == "success") {
         this.lineLegend = res.data.data.legend;
         this.linexAxis = res.data.data.xAxis;
         this.lineSeries = res.data.data.series;
         this.lineSeries.forEach((ele,i,arr)=>{
           ele.smooth = true;
           ele.symbolSize = 10;
           ele.itemStyle = {
              normal: {
                  label: {
                    show: true,
                    textStyle: { color: "#fff", fontSize: 14 }
                  },
                  lineStyle: {
                    width: 5,
                    shadowColor: i==0?"rgba(83, 212, 227,1)":"rgba(191, 83, 154,1)",
                    shadowBlur: 50,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0
                  }
                }
            }
         })
         this.lineloading = false;
          this.initLine();
        } else {

        }
      });
    },

    barInterval(){
      this.barTimer = setInterval(()=>{
        this.pageDeptServiceDesk();
      },60000);
    },

    initData(){
      this.initTimer = setInterval(()=>{
         this.getData();
      },3600000);
    },
  },
  computed: {
    optionSinglexxxt() {
      return {
         step:0.5
      };
    },
    optionSinglejqqq() {
      return {
        //  waitTime:2500
      };
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.pannel-fwt {
  height: 100vh;
  width: 100vw;
  background: url("../../../static/images/bg.jpg");
  background-size: 100% 100%;
  padding: 10px 20px 20px;
  .pannel-fwt_top {
    height: 70px;
    font-size: 22px;
  }

  .pannel-fwt_bottom {
    // 图标
    .bottom-center {
      width: 40%;
      margin: 0 20px;
      section {
        height: 50%;
        width: 100%;

        // 线图tab
        .lineChart-title {
          height: 10%;
          span {
            width: 60px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            font-size: 0.8em;
            margin-right: 15px;
            border-radius: 12.5px;
            background: rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
            &:hover {
              cursor: pointer;
            }
          }
        }
        // 线图
        .lineChart {
          height: 90%;
          width: 100%;
        }

        // 柱图
        .barChart {
          height: 100%;
          width: 100%;
        }
      }
      .bar-chart {
        overflow: hidden;
      }
    }
    .bottom-left {
      border-radius: 16px;
      padding: 0 20px;
      width: 30%;
      background-image: linear-gradient(
        -135deg,
        rgba(255, 255, 255, 0.02) 0%,
        rgba(255, 255, 255, 0.11) 56%,
        rgba(255, 255, 255, 0.04) 100%
      );
      // 饼图区域
      .top {
        height: 58%;
        padding-top:10px;
        .top-info {
          height: 58%;
          width: 100%;
          // 饼图，总数
          .pie-chart{
            width: 70%;
          }
          > div{
            height: 100%;
            width: 30%;
          }
        }

        // 处理中，待验证，已办结
        .top-oprate {
          height: 42%;
          padding: 20px 0;
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.2);
          > section {
            height: 100%;
            width: 30%;
            border-radius: 10px;
          }
        }
      }

      //   解决时长
      .bottom {
        height: 42%;
        .bottom-top {
          height: 40%;
          > section {
            width: 50%;
          }
        }
        // 处理率
        .bottom-percentage {
          height: 60%;
          line-height: 400%;
          section {
            width: 30%;
          }
        }
      }
    }

    // 信息列表
    .bottom-right {
      width: 30%;
      section {
        height: 50%;
        width: 100%;
        overflow: hidden;
      }
      .xxxtqq-layout {
        padding: 15px;
        .xxxtqq-title {
          height: 10%;
          font-weight: 700;
        }
        // 服务请求标题
        .title {
          background: #3766be;
        }
        .xxxtqq-li-height {
          height: 35px;
          line-height: 35px;
          border-radius: 4px;
          width: 100%;
          p {
            display: inline-block;
            width: 20%;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }

        //
        .jqfwqq-li-height {
          height: 35px;
          line-height: 35px;
          border-radius: 4px;
          width: 100%;
          p {
            display: inline-block;
            width: 25%;
            text-align: center;
            // &:nth-of-type(1),&:nth-of-type(2) {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            // }
          }
        }

        // 滚动列表
        .xxxt-seamless-warp {
          // height:calc(90% - 80px);
          max-height: 300px;
          overflow: hidden;
          > div {
            width: 100% !important;
          }
          li:nth-of-type(even) {
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }
}

.fontShadow {
  color: rgba(255, 255, 255, 0.45);
}

.bg-clz {
  background: url("../../../static/images/clzbg.png") no-repeat;
  background-size: 100% 100%;
}
.bg-dyz {
  background: url("../../../static/images/dyzbg.png") no-repeat;
  background-size: 100% 100%;
}
.bg-ybj {
  background: url("../../../static/images/ybjbg.png") no-repeat;
  background-size: 100% 100%;
}
.clz-color {
  color: #387df8;
}
.dyz-color {
  color: #8253ff;
}
.bj-color {
  color: #4dc6b7;
}

.tab-active {
  background-image: linear-gradient(
    -180deg,
    #00c3ec 0%,
    #0073ec 100%
  ) !important;
  box-shadow: 0 2px 6px 0 rgba(2, 109, 221, 0.45);
}
.empty-content{
  text-align: center;
  margin: 30px;
}
</style>
