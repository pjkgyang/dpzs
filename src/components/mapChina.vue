<template>
  <div class="china-map" flex-column>
    <div col="4" flex>
      <div class="circle__box">
        <h2 class="curqy">{{!qymc?'全国':qymc}}</h2>
        <div class="secure_circle" flex-column rowcenter colcenter>
          <span class="num">{{((Number(pannelData.yjjs)/Number(pannelData.wtzs)*100).toFixed(2))+'%'}}</span>
          <span>问题解决率</span>
        </div>
      </div>
      <div ref="chart" id="attack_chart"></div>
      <div class="other-qygc">
        <Button size="small" @click="handleChangeqy('')">全国</Button><br>
      </div>
    </div>
    <div col="1" flex colcenter spacearound>
      <div class="secure_intro" flex colcenter spacearound>
        <h3 class="name">超期未解决问题数</h3>
        <div class="num ">{{pannelData.cqwjjs}}</div>
      </div>
      <div class="secure_intro" flex colcenter spacearound>
        <h3 class="name">超期未响应问题数</h3>
        <div class="num ">{{pannelData.cqwxys}}</div>
      </div>
      <div class="secure_intro" flex colcenter spacearound>
        <h3 class="name">超期解决问题数</h3>
        <div class="num ">{{pannelData.cqyjjs}}</div>
      </div>
      <div class="secure_intro" flex colcenter spacearound>
        <h3 class="name">投诉数</h3>
        <div class="num ">{{pannelData.tss}}</div>
      </div>
      <!-- <div class="secure_intro" flex colcenter spacearound>
                <h3 class="name">问题处理不满意数</h3>
                <div class="num ">{{pannelData.bmys}}</div>
            </div> -->
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import provinceArr from "../../static/mapjson/province.js";

var json = require("echarts/map/json/china.json");

export default {
  data() {
    return {
      chart: {},
      qyArr: [],
      qymc: "",
      currentProvince: [],
      // provinceArr
      max: ""
    };
  },
  props: {
    data: {
      default: function() {
        return [{ name: "山西", selected: true }];
      },
      type: Array
    },
    pannelData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    data(n, o) {
      this.max = n[0].value;
      let len = n.length;
      for (var i = 1; i < len; i++) {
        if (n[i].value > this.max) {
          this.max = n[i].value;
        }
      }
      this.initChart(this.data);
    }
    // currentProvince(){
    //     this.$nextTick(() => {
    //         this.initChart();
    //     });
    // }
  },
  mounted() {
    // this.$nextTick(() => {
    //     this.initChart();
    // });
    this.getDictEnum();
  },
  methods: {
    getDictEnum() {
      this.$get(this.API.getDictEnum, {
        name: "xzqh",
        isInterface: true
      }).then(res => {
        if (res.data.state == "success") {
          res.data.data.forEach(ele => {
            if (ele.XZMC.indexOf("市") != -1) {
              ele.XZMC = ele.XZMC.split("市")[0];
            } else if (ele.XZMC.indexOf("省") != -1) {
              ele.XZMC = ele.XZMC.split("省")[0];
            } else if (
              ele.XZMC.indexOf("自治区") != -1 &&
              ele.XZMC.indexOf("维吾尔") == -1 &&
              ele.XZMC.indexOf("回族") == -1 &&
              ele.XZMC.indexOf("壮族") == -1
            ) {
              ele.XZMC = ele.XZMC.split("自治区")[0];
            } else if (ele.XZMC.indexOf("维吾尔") != -1) {
              ele.XZMC = ele.XZMC.split("维吾尔")[0];
            } else if (ele.XZMC.indexOf("回族") != -1) {
              ele.XZMC = ele.XZMC.split("回族")[0];
            } else if (ele.XZMC.indexOf("壮族") != -1) {
              ele.XZMC = ele.XZMC.split("壮族")[0];
            } else if (ele.XZMC.indexOf("特别行政区") != -1) {
              ele.XZMC = ele.XZMC.split("特别行政区")[0];
            }
          });
          this.qyArr = res.data.data;
        }
      });
    },

    filterObj(val) {
      this.qymc = "";
      let arr = [];
      this.qyArr.forEach(ele => {
        if (ele.XZMC == val) {
          this.qymc = ele.QYMC;
          this.qyArr.forEach(ele => {
            if (ele.QYMC == this.qymc) {
              arr.push(ele.XZMC);
            }
          });
        }
      });
      return arr;
    },
    handleChangeqy(params) {
      this.$emit("handleChangeqy", params);
      this.qymc = params;
    },
    initChart(data) {
      var _this = this;
      // 绘图方法
      echarts.registerMap("china", json);
      this.chart = echarts.init(this.$refs.chart);
      // 皮肤添加同一般使用方式
      this.chart.showLoading();
      this.chart.setOption({
        // title : {
        //     text: '全国 ( 问题解决率 ) 分布',
        //     x:'center',
        //     textStyle:{
        //         color:'#fff',
        //         fontSize:16,
        //     }
        // },
        geo: {
          map: "china"
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            let qymc = qymc;
            _this.qyArr.forEach(ele => {
              if (ele.XZMC == params.name) {
                qymc = ele.QYMC;
              }
            });
            if (!qymc) {
              return params.name + " 暂无区域工程";
            } else {
              return qymc + "<br/>" + "问题解决率 : " + params.value + "%";
            }
          }
        },
        dataRange: {
          orient: "vertitle",
          min: 0,
          max: this.max,
          text: ["高", "低"], // 文本，默认为数值文本
          splitNumber: 0,
          color: ["#50ce31", "#f00"],
          // ['#61A5FA','#F76B1C'],
          x: "right",
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            type: "map",
            selectedMode: "multiple",
            mapType: "china", // 自定义扩展图表类型
            itemStyle: {
              normal: {
                //未选中状态
                label: { show: true },
                areaColor: "#a2bbc5" //背景颜色
              }
            },
            data: data
            //  _this.currentProvince
          }
        ]
      });
      this.chart.hideLoading();
      this.chart.off("click");
      this.chart.on("click", function(params) {
        let tempArr = JSON.parse(JSON.stringify(_this.data));
        if (_this.filterObj(params.name).includes(params.name)) {
          _this.$emit("handleFilterqy", _this.qymc);
          tempArr.forEach((item, index) => {
            if (_this.filterObj(params.name).includes(item.name)) {
              _this.$set(tempArr[index], "selected", true);
            }
          });
        }
        _this.initChart(tempArr);
        // _this.currentProvince = tempArr
      });
    }
  },
  components: {}
};
</script>
<style lang="scss" scope>
@import "../../static/css/sass/resources/tools.scss";
.china-map {
  #attack_chart {
    flex: 1 0 0;
  }
  .secure_intro {
    width: 20%;
    .name {
      width: 60px;
    }
    .num {
      font-size: 32px;
      @include gradient(#fad961, #f76b1c);
    }
  }
  .circle__box {
    position: relative;
    flex: 100px 0 0;
    width: 100px;
  }
  .circle-text {
    position: absolute;
    left: 120px;
    bottom: 0;
    min-width: 130px;
    font-size: 16px;
    letter-spacing: 0.3em;
    color: rgba(255, 255, 255, 0.5);
  }
  .secure_circle {
    position: absolute;
    width: 100px;
    height: 100px;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(#fad961),
      to(#f76b1c)
    );
    border-radius: 50%;
    left: 0;
    bottom: 0;
    .num {
      font-size: 40px;
    }
  }
}
</style>