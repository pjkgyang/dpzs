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
            chart:''
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
        },
        qymc:{
            type:String,
            default:''
        },
        max:{
            type:Number,
            default:100
        },
    },
    watch: {
        count(n,o){
            this.initChart();
        },
        qymc(n,o){
            if(!!n){
              this.data[0].forEach((ele,i,arr)=>{
                  if(n.indexOf(ele) != -1){
                    this.chart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0 ,//第几条series
                        dataIndex:i,//第几个tooltip
                     });  
                  }
              })  
            }else{
               this.chart.dispatchAction({
                    type: 'showTip',
                    seriesIndex:0 ,//第几条series
                    dataIndex:20,//第几个tooltip
                });   
            }
        },
        data(n,o){
            console.log(n)
        }
    },
    mounted() {
        
    },
    methods: {
        initChart() {
            let _this = this;
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(document.getElementById('doublebarItems'));
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'item',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(params,ticket) {
                        var index = ticket.split('_')[2]
                        var res = params.name+'<br/>';
                        var myseries = option.series;
                        for (var i = 0; i < myseries.length; i++) {
                            let num = '';
                            let marker = '';
                            if(myseries[i].name == '目标'){
                                num = _this.data[i][index];
                            }else{
                                    num = myseries[i].data[index]
                                if(myseries[i].name=='验收完成率'||myseries[i].name=='完工率'||myseries[i].name=='效率'){
                                    num = myseries[i].data[index] + '%'
                                }
                            }
                            if(myseries[i].name == '目标' || myseries[i].name == '总金额'){
                                marker = "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#27A6F6;'></span>"
                            }else if (myseries[i].name == '已完成' || myseries[i].name == '总完工'){
                                marker = "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F9B74C;'></span>"
                            }else{
                                marker = "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#d14a61;'></span>"
                            }
                             res += marker + myseries[i].name +' : '+ num +'</br>';
                        }
                        return res;
                    //     let res = params[0].name;
                    //     params.forEach((ele,i,arr)=>{
                    //         if(ele.seriesName == (_this.count==1?'验收完成率':_this.count==3?'完工率':'效率')){
                    //            ele.value = ele.value + '%' 
                    //         }
                    //         res += '<br/>'+ ele.marker + ele.seriesName + ' : ' + ele.value;
                    //     })
                    //    return res;
                    },
                },
                legend: {
                    data: [this.count==1||this.count==3?'目标':'总金额',this.count==1||this.count==3?'已完成':'总完工',this.count==1?'验收完成率':this.count==3?'完工率':'效率'],
                    textStyle:{color:'#fff'}
                },
                color: ['#F9B74C','#27A6F6'],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: [{
                    show: false,
                    type: 'value',
                },
                {
                    show:false,
                    type: 'value',
                    name:this.count==1?'验收完成率(%)':this.count==3?'完工率(%)':'效率(%)',
                    min: 0,
                    max:this.max,
                    interval:20,
                    axisLabel: {
                        formatter: '{value} ',
                        color:'#fff'
                    },
                    axisLine:{
                      show:false, 
                      lineStyle:{
                          color:'#fff', 
                      } 
                    },
                    axisTick:{
                      lineStyle:{
                          color:'#fff', 
                      } 
                    },
                    splitLine:{
                    },
                    nameTextStyle:{
                        color:'#fff'
                    }
                   }
                ],

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
                        margin:12
                    }
                },

                series: [
                    {
                        name:this.count==1||this.count==3?'已完成':'总完工',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideTop',
                                color:"#fff",
                            }
                        },
                        barWidth: 20,
                        data:this.data[2]
                    },
                    {
                        name:this.count==1||this.count==3?'目标':'总金额',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color:"#fff",
                                 formatter: function(params) {
                                     let value = _this.data[2];
                                     let value1 = _this.data[1];
                                     for (var i = 0,l = option.xAxis.data.length; i < l; i++) {
                                            if (option.xAxis.data[i] == params.name) {
                                                var val1 = value1[i] || 0;
                                                var val2 = value[i] || 0;
                                                return Number(val1)
                                            }
                                        }

                                    // console.log(params)
                                    // console.log(option.series[1].data.length);
                                    // for(var i = 0;i<_this.data[2].length;i++){
                                    //     let var1 = Number(_this.data[2][i]);
                                    //     let var2 = Number(_this.data[1][i]);
                                    //     return var1+var2;
                                    // }
                                },
                            }
                        },
                        barWidth: 20,
                        data:this.data[4]
                        // [80,70,50,55,63,69,89,90,60,60,30,30,50,55,99,50,30]
                        // this.data[1]
                    },
                     {
                        name:this.count==1?'验收完成率':this.count==3?'完工率':'效率',
                        type:'line',
                        yAxisIndex: 1,
                        color:['#d14a61'],
                        data:this.data[3]
                        // function(){
                        //     return this.data[3]
                        // }
                        // this.data[3]
                        // [80,70,50,55,63,69,89,90,60,60,30,30,50,55,99,50,30]
                     }
                ]
            };
            
            // 使用刚指定的配置项和数据显示图表。
             this.chart.setOption(option);
             this.chart.on('click',function(params){
                 let qymc = params.name=='渠道'?'渠道工程':params.name+'区域工程';
                 _this.$bus.$emit('handleChooseBar',qymc);
                 _this.$emit('handleChooseBar',qymc);
             })   
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