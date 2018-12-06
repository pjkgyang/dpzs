<template>
 <div  class="header" flex spacebetween colcenter>
    <section>
      <img class="headerImg" src="static/assets/logo.png" alt="">
    </section>
    <h2 >{{title}}</h2>
    <section>
      <p>截止：{{time}}</p>
    </section>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   props:{
     title:{
       type:String,
       default:'工程综合概况'
     },
      time:{
       type:String,
       default:'2018/08/08'
     }
   },
   components: {}
 }
</script>

<style lang="scss" scoped>
@import '../../static/css/sass/resources/tools.scss';
@import '../../static/css/sass/resources/settings.scss';
.header{
  padding: 0 1em;
  height:40px;
  img{
    height: 35px;
  }
  h2{
    font-size:26px;
    @include gradient(#FFFFFF,rgb(165, 164, 164));
  }
  p{
    line-height: 20px;
    font-weight: 700;
    font-size: 20px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.30);
    @include gradient(#FFFFFF,rgb(165, 164, 164));
  }
}
 
</style>
