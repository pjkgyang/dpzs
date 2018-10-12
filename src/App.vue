<template>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
</template>

<script>
    import style from './style.css';
    var functions = require("./fullscreen.js");
    const owner = this;
    export default {
        data () {
            return {
                transitionName: 'slide-left',
                routerArr:['/wtgz','/gczh','/gcys','/gcwg','/gcry','/gccb'],
                // count:0
            }
        },
        mounted(){
            console.log(functions.isFullscreen())
            let _this = this;
            // setInterval(function(){
            //      window.location.href = window.location.origin+_this.routerArr[_this.count];
            //      console.log(_this.routerArr[_this.count])
            //     _this.count ++;
            //     if(_this.count == _this.routerArr.length-1) _this.count = 0;
            // },5000)
        },
         '$route' (to, from) {
            if(to.path == '/'){
                this.transitionName = 'slide-right';
            }else{
                this.transitionName = 'slide-left';
            }
        },
        methods:{
          
         }
    }
</script>
<style lang="scss">
    @import './base.scss';
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>