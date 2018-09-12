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
    },
    watch: {
        data() {
            this.$nextTick(() => {
                this.initChart();
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
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
                    data: ['目标','已完成'],
                    textStyle:{color:'#fff'}
                },
                color: ['#27A6F6', '#F9B74C'],

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
                    data: ['北京', '浙江', '沪皖', '山东', '广州', '湖北', '湖南','山东', '广州', '湖北', '湖南'],
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
                        name: '已完成',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'right'
                            }
                        },
                        barWidth: 20,
                        data: [150, 212, 201, 154, 190, 330, 410, 212, 201, 154, 190]
                    },
                    {
                        name: '目标',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'right'
                            }
                        },
                        barWidth: 20,
                        data: [820, 832, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330]
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex:0 ,//第几条series
                dataIndex:5,//第几个tooltip
             });
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