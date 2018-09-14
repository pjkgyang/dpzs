<template>
    <div class="china-map" flex-column>
        <div col="4" flex>
            <div class="circle__box">
                <div class="secure_circle" flex center>
                    <span class="num">{{((Number(pannelData.yjjs)/Number(pannelData.wtzs)*100).toFixed(0))+'%'}}</span>
                </div>
                <div class="circle-text">问题解决率</div>
            </div>
            <div ref="chart" id="attack_chart">
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
            <div class="secure_intro" flex colcenter spacearound>
                <h3 class="name">问题处理不满意数</h3>
                <div class="num ">{{pannelData.bmys}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import provinceArr from '../../static/mapjson/province.js'

var json = require('echarts/map/json/china.json')

export default {
    data() {
        return {
            chart: {},
            currentProvince:provinceArr
        }
    },
    props: {
        data: {
            default: function() {
                return [{name:'山西', selected:true}]
            },
            type: Array
        },
        pannelData:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    watch: {
        data() {
            this.$nextTick(() => {
                this.initChart();
            });
        },
        currentProvince(){
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
            var _this = this
            // 绘图方法
            echarts.registerMap('china', json);
            this.chart = echarts.init(this.$refs.chart);
            // 皮肤添加同一般使用方式
            this.chart.showLoading()
            this.chart.setOption({

                geo: {
                    map: 'china',
                },
                series: [{
                    type: 'map',
                    selectedMode : 'multiple',
                    mapType: 'china', // 自定义扩展图表类型
                    itemStyle: {
                        normal: { //未选中状态
                            areaColor: '#a2bbc5', //背景颜色
                        },
                    },
                    data: _this.currentProvince
                }]
            });
            this.chart.hideLoading();
            this.chart.on('click', function(params) {
                console.log(params)
                //联动区域
                let tempArr = JSON.parse(JSON.stringify(provinceArr))
                if(params.name=='黑龙江'||params.name=='吉林'||params.name=='辽宁'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='黑龙江'||item.name=='吉林'||item.name=='辽宁'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='湖北'||params.name=='湖南'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='湖北'||item.name=='湖南'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='安徽'||params.name=='上海'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='安徽'||item.name=='上海'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='陕西'||params.name=='甘肃'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='陕西'||item.name=='甘肃'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='河北'||params.name=='天津'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='河北'||item.name=='天津'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else if(params.name=='四川'||params.name=='重庆'||params.name=='云南'||params.name=='贵州'){
                    tempArr.forEach((item,index)=>{
                        if(item.name=='四川'||item.name=='重庆'||item.name=='云南'||item.name=='贵州'){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }else{
                    tempArr.forEach((item,index)=>{
                        if(item.name==params.name){
                            _this.$set(tempArr[index],'selected',true)
                        }
                    })
                }
                _this.currentProvince = tempArr
            });
        },
    },
    components: {},
}
</script>
<style lang="scss" scope>
@import '../../static/css/sass/resources/tools.scss';
.china-map {
    #attack_chart {
        flex: 1 0 0;
    }
    .secure_intro {
        width: 20%;
        .name {
            width:60px;
        }
        .num {
            font-size: 32px;
            @include gradient(#FAD961, #F76B1C);
        }
    }
    .circle__box {
        position: relative;
        flex: 100px 0 0;
        width: 100px;
    }
    .circle-text{
        position: absolute;
        left: 120px;
        bottom: 0;
        min-width:130px;
        font-size: 16px;
        letter-spacing: 0.3em;
        color:rgba(255,255,255,0.5)
    }
    .secure_circle {
        position: absolute;
        width: 100px;
        height: 100px;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#FAD961), to(#F76B1C));
        border-radius: 50%;
        left: 0;
        bottom: 0;
        .num {
            font-size: 40px;
        }
    }
}
</style>