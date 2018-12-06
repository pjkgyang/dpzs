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
                time:0,
                timer:null
                // count:0
            }
        },
        mounted(){
            this.$get(this.API.getLoginUser).then(res=>{
                if(res.data.state == 'success'){
                    sessionStorage.setItem('userInfo',JSON.stringify(res.data.data.userGroupTag))
                }
            })

            let THIS = this;
            if(!!functions.isFullscreen()){
                setInterval(THIS.countDown,480000);
            }
        },
         '$route' (to, from) {
            
            if(to.path == '/'){
                this.transitionName = 'slide-right';
            }else{
                this.transitionName = 'slide-left';
            }
        },
        watch:{
            'time':function(newVal,oldVal){
                this.$router.push({path:this.routerArr[newVal]});
            }
        },
        methods:{
            countDown(){
                let THIS = this;
                THIS.time++;
                if(THIS.time == THIS.routerArr.length){
                   THIS.time = 0 
                }
            }
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