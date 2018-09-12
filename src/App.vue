<template>
    <router-view></router-view>
</template>

<script>
    import style from './style.css'
    export default {
        data () {
            return {}
        },
        mounted(){
            switch (this.$route.path){
                case '/wtgz':
                document.title = '问题跟踪分析'
                break;
                case '/gczh':
                document.title = '工程综合概况'
                break;
                case '/gcys':
                document.title = '工程验收分析'
                break;
                case '/gcwg':
                document.title = '工程完工分析'
                break;
                case '/gcry':
                document.title = '工程人员概况'
                break;
                case '/gccb':
                document.title = '工程成本分析'
                break;
            }
        }
    }
</script>
<style lang="scss">
	@import './base.scss'
</style>