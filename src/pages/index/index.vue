<template>
 <div class="dp-menu">
     <ul flex spacearound wrap align-start>
         <li v-for="(menu,index) in menulist" :key="index" :style="{'background':menu.color}" flex colcenter @click="handleCheck(menu.url)">
             <div textcenter>
                <img :src="menu.img" alt="">
                <p>{{menu.text}}</p>
             </div>
         </li>
     </ul>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         menulist:[{
             text:'工程综合概况',
             img:'static/assets/gczh.png',
             color:'#4586FF',
             url:'/gczh'
         },{
             text:'问题跟踪分析',
             img:'static/assets/wtgz.png',
             color:'#37CCBD',
             url:'/wtgz'
         },{
             text:'工程验收分析',
             img:'static/assets/gcys.png',
             color:'#46CC37',
             url:'/gcys'
         },{
             text:'工程完工分析',
             img:'static/assets/gcwg.png',
             color:'#FF8F45',
             url:'/gcwg'
         },{
             text:'工程人员概况',
             img:'static/assets/gcry.png',
             color:'#FF4586',
             url:'/gcry'
         },{
             text:'工程成本分析',
             img:'static/assets/gccb.png',
             color:'#B441F2',
             url:'/gccb'
         }]
     }
   },
   mounted(){
     
   },
   methods:{
       handleCheck(param){
        let routeData = this.$router.resolve({
            path:param,
            query: {}
        });
        window.open(routeData.href, "_blank");
       }
   },
   components: {}
 }
</script>

<style lang="scss" scoped>
.dp-menu{
    width: 100%;
    height: 100%;
    background: #fff;
    ul{
        width: 100%;
        height: 100%;   
        img{
            margin-bottom: 10px;
        }
    }
    ul>li:hover{
        cursor: pointer;
        box-shadow: 0 0 16px #ccc;
    }
    ul>li{
            width: 26%;
            height: 30%;
            min-height:260px;
            font-size: 30px;
            text-align: center;
            line-height: 30px;
            margin-top:40px;
        div{
            margin: auto;
            
        } 
    }
}
 
</style>
