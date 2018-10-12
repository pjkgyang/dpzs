<template>
    <div class="barChart" flex>
        <div col="2" flex-column spacearound >
            <div center flex-column><span class="bmy fontsize50 num">{{bmys}}</span><h3>不满意数</h3></div>
            <div center flex-column><span class="num fontsize50 sum">{{clwcwts}}</span><h3>总数</h3></div>
        </div>
        <div col="4" id="barItems"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import numCardVue from './numCard.vue';

export default {
    data() {
        return {
            chart: {},

        }
    },
    props: {
        mys:{
            type:Number,
            default:10
        },
        bmys:{
            type:Number,
            default:20
        },
        data: {
            default: function() {
                return []
            },
            type: Array
        },
        clwcwts:{
            type:Number,
            default:0
        }
    },
    watch: {
        mys(n,o) {
            // this.$nextTick(() => {
                this.initChart();
            // });
        }
    },
    mounted() {
        // this.$nextTick(() => {
            // this.initChart();
        // });
    },
    methods: {
        initChart() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('barItems'));
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
                    color: ['#3AC868', '#D1D1D1'],
                    label: {
                        show: true,
                        fontSize: 14,
                        fontFamily: "DINCondensed",
                        fontWeight: "bolder",
                        position: "inside",
                        textBorderWidth: 0,
                        align: "right",
                        formatter: "{b}:{d}%",
                    },
                    labelLine: {
                        show: false
                    },
                    data:[{ value:this.mys, name: '满意' },
                          { value:this.bmys, name: '不满意' },]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        },
    },
    components: {},
}
</script>
<style lang="scss" scope>
@import '../../static/css/sass/resources/tools.scss';
.barChart {
    .sum {
        @include gradient(#B4EC51, #429321);
    }
    .bmy {
         @include gradient(#fad961, #f76b1c);
    }
    
}
</style>