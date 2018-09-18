<template>
    <div class="china-map" flex>
        <div col="1" flex>
            <div col="1" v-if="!circleShow">
                <h2 class="curqy">{{!qymc?'全国':qymc}}</h2>
            </div>
            <div class="circle__box"  col="1" v-if="circleShow">
                <h2 class="curqy">{{!qymc?'全国':qymc}}</h2>
                <div class="secure_circle" flex-column center>
                    <span class="num">{{numPer}}%</span>
                    <span>{{title}}</span>
                </div>
                <div class="circle-text"></div>
            </div>
            <div ref="chart" id="attack_chart" col="5"></div>
            <div  class="other-qygc" col="1">
               <Button size="small" @click="handleChangeqy('')">全部区域工程</Button><br>
               <Button size="small" @click="handleChangeqy('渠道工程')">渠道工程</Button><br>
               <Button size="small" @click="handleChangeqy('深圳区域工程')">深圳区域工程</Button>
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
            qyArr:[],
            qymc:'',
            currentProvince:[],
            // provinceArr
            max:100
        }
    },
    props: {
        data: {
            default: function() {
                return [{name:'山西', selected:true}]
            },
            type: Array
        },
        numPer:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:'完工率'
        },
        mapData:{
            type:Array,
            default:()=>{
                return []
            }
        },
        toolipTitle:{
            type:String,
            default:'验收完成率'
        },
        circleShow:{
            type:Boolean,
            default:true
        }
    },
    watch: {
        // data() {
        //     this.$nextTick(() => {
        //         this.initChart();
        //     });
        // },
        mapData(n,o){
            this.max = n[0].value;
            let len = n.length; 
                for (var i = 1; i < len; i++){ 
                    if (n[i].value > this.max) { 
                    this.max = n[i].value; 
                } 
            } 
            this.initChart(this.mapData);
        },
        // currentProvince(){
        //     console.log('===')
        //     this.$nextTick(() => {
        //         this.initMap();
        //     });
        // }
     },
     mounted() {
        // this.$nextTick(() => {
            // this.initChart(this.mapData);
        // });
        this.getDictEnum();
        this.$bus.$on('handleChooseBar',(params)=>{
            this.filterArr(params);
            this.qymc = params;
        });
    },
    methods: {

         getDictEnum(){
            this.$get(this.API.getDictEnum,{
                name:'xzqh',
                isInterface:true
            }).then(res=>{
                if(res.data.state == 'success'){
                    res.data.data.forEach(ele=>{
                          if(ele.XZMC.indexOf('市') != -1){
                              ele.XZMC = ele.XZMC.split('市')[0]
                          }else if(ele.XZMC.indexOf('省') != -1){
                              ele.XZMC = ele.XZMC.split('省')[0]
                          }else if(ele.XZMC.indexOf('自治区') != -1 && ele.XZMC.indexOf('维吾尔') == -1 && ele.XZMC.indexOf('回族') == -1){
                              ele.XZMC = ele.XZMC.split('自治区')[0]
                          }else if(ele.XZMC.indexOf('维吾尔') != -1){
                              ele.XZMC = ele.XZMC.split('维吾尔')[0] 
                          }else if(ele.XZMC.indexOf('回族') != -1){
                              ele.XZMC = ele.XZMC.split('回族')[0] 
                          }
                    })
                    this.qyArr = res.data.data;
                }
            })
        },
        filterObj(val){
            this.qymc = ''
            let arr = [];
            this.qyArr.forEach(ele=>{ 
                if(ele.XZMC == val){
                    this.qymc = ele.QYMC
                    this.qyArr.forEach(ele=>{
                       if(ele.QYMC == this.qymc){
                          arr.push(ele.XZMC)     
                       } 
                    }) 
                };
            })
            return arr;
        },
        filterArr(name){
            // provinceArr
            let tempArr = JSON.parse(JSON.stringify(this.mapData));
            this.qyArr.forEach((ele,i,arr)=>{
               if(ele.QYMC == name && ele.QYMC != "渠道工程" && ele.QYMC != "深圳区域工程"){
                   if(this.filterObj(ele.XZMC).includes(ele.XZMC)){
                     tempArr.forEach((item,index)=>{
                        if(this.filterObj(ele.XZMC).includes(item.name)){
                             this.$set(tempArr[index],'selected',true) 
                        }
                    })
                  }
                }else{
                   return;
                }
             })
        //    this.currentProvince = tempArr
              this.initChart(tempArr);
        },
        handleChangeqy(params){
            this.initChart(this.mapData);
            this.$emit('handleChangeqy',params);
            this.qymc = params;
        },
        initChart(data) {
            var _this = this;
            // 绘图方法
            echarts.registerMap('china', json);
            this.chart = echarts.init(this.$refs.chart);
            // 皮肤添加同一般使用方式
            this.chart.showLoading()
            this.chart.setOption({
                  title : {
                    text: '全国 ( '+_this.toolipTitle+' ) 分布',
                    x:'center',
                    textStyle:{
                        color:'#fff',
                        fontSize:16,
                    }
                },
                geo: {
                    map: 'china',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        let qymc = qymc;
                         _this.qyArr.forEach(ele=>{ 
                            if(ele.XZMC == params.name){
                                qymc = ele.QYMC
                            };
                        })
                        if(!qymc){
                            return params.name+' 暂无区域工程'
                        }else{
                            return  qymc+'<br/>'+ _this.toolipTitle +' : '+ params.value+'%';
                        }
                        // var myseries = option.series;
                        // for (var i = 0; i < myseries.length; i++) {
                        //     for(var j=0;j<myseries[i].data.length;j++){
                        //         if(myseries[i].data[j].name==params.name){
                        //             res+=myseries[i].name +' : '+myseries[i].data[j].value+'</br>';
                        //         }
                        //     }
                        // }
                        
                    }
                },
                 dataRange: {
                        orient: 'vertitle',
                        min: 0,
                        max:this.max,
                        text:['高','低'],           // 文本，默认为数值文本
                        splitNumber:0,
                        color: ['#61A5FA','#F76B1C'],
                        x:'right',
                        textStyle:{
                            color:'#fff'
                        }
                    },
                series: [{
                    type: 'map',
                    selectedMode : 'multiple',
                    mapType: 'china', // 自定义扩展图表类型
                    itemStyle: {
                        normal: { //未选中状态
                            label:{ show : true } ,
                            areaColor:'#a2bbc5', //背景颜色
                        },
                    },
                    data:data
                    // _this.currentProvince
                }]
            });
            this.chart.hideLoading();
            this.chart.off('click');
            this.chart.on('click', function(params) {
                let tempArr = JSON.parse(JSON.stringify(_this.mapData));
                 if(_this.filterObj(params.name).includes(params.name)){
                     _this.$emit('handleFilterqy',_this.qymc);
                     tempArr.forEach((item,index)=>{
                        if(_this.filterObj(params.name).includes(item.name)){
                             _this.$set(tempArr[index],'selected',true);
                        }
                    })
                 }
                // _this.currentProvince = tempArr
                 _this.initChart(tempArr);
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
            font-size: 30px;
        }
    }
}
</style>