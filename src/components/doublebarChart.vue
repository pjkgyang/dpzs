<template>
    <div class="doublebarChart" flex>
        <div id="doublebarItems"></div>
    </div>
</template>
<script>
import echarts from 'echarts'

export default {
    data() {
        return {

        }
    },
    props: {
        data: {
            default: function() {
                return [
                    { value: 335, name: '满意' },
                    { value: 310, name: '不满意' },

                ]
            },
            type: Array
        },
        count:{
            type:Number,
            default:0
        }
    },
    watch: {
        count(n,o){
            this.initChart();
        }
    },
    mounted() {
        // this.$nextTick(() => {
        //     this.initChart();
        // });
    },
    methods: {
        initChart() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('doublebarItems'));
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: [this.count==1?'目标':'总金额',this.count==1?'已完成':'总完工'],
                    textStyle:{color:'#fff'}
                },
                color: ['#27A6F6','#F9B74C'],

                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    show: false,
                    type: 'value'
                },

                xAxis: {
                    type: 'category',
                    data:this.data[0],
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        color: '#fff',
                    }
                },

                series: [{
                        name:this.count==1?'已完成':'总完工',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideTop',
                                 color:"#fff"
                            }
                        },
                        barWidth: 20,
                        data:this.data[2]
                    },
                    {
                        name:this.count==1?'目标':'总金额',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color:"#fff"
                            }
                        },
                        barWidth: 20,
                        data:this.data[1]
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            // myChart.dispatchAction({
            //     type: 'showTip',
            //     seriesIndex:0 ,//第几条series
            //     dataIndex:5,//第几个tooltip
            //  });
        },
    },
    components: {},
}
</script>
<style lang="scss" scope>
@import '../../static/css/sass/resources/tools.scss';
.doublebarChart {
    .sum {
        @include gradient(#B4EC51, #429321);
    }
    #doublebarItems{
        width:100%;
    }
}
</style>