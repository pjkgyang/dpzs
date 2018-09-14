<template>
    <div class="arrowBar">
        <!-- <div flex>
            <div class="bar-contanier" flex colcenter>
                <div class="bar-outter"  flex>
                    <div class="bar-inner" :style="{width:scale,background:color}"><span class="num">{{done}}</span></div>
                    <div class="num" rowcenter flex :class="{fullWidth:true}" :style="{width:'100%' - scale}">{{total}}</div>
                </div>
            </div>
            <div class="triangel-box" flex colcenter>
                <div class="triangel"></div>
            </div>
        </div> -->
        <div  :class="{outer:true}"><span>目标:{{total}}</span></div>
        <div class="inner" :style="{backgroundSize:scale+'100%'}">完成:{{done}}</div>
        <div rowcenter flex>基线目标</div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {}
    },
    props: {
        done: {
            type: Number,
            default: 40
        },
        total: {
            type: Number,
            default: 100
        },
        color:{
          type:String,
          default:'#3AC868'
        },
        imgUrl:{
          type:String,
          default:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536838122609&di=90ee05f8393d2a4beb0d1e827fd53812&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140524%2Fbkp-20140524053455-906678672.jpg'   
        }
    },
    computed: {
        scale() {
            if (this.total == 0) { return 0 }
            return Math.floor(this.done / this.total * 100)  +'%'
        }
    },
    mounted() {},
    methods: {},
    components: {},
}
</script>
<style lang="scss" scope>

.arrowBar {
    width: 100%;
    padding-left:20px;
    position: relative;
    .outer{
        position: relative;
        padding:25px 90px 25px 0;
        width:100%;
        background: rgba(234,234,234,0.28);
        clip-path:polygon(0% 35%, 90% 35%, 90% 20%, 100% 50%, 90% 80%, 90% 65%, 0% 65%);
        z-index: 200;
        text-align: right;
    }
    .inner{
        position: absolute;
        top: 0;
        width:calc(100% - 20px);
        padding:25px 20px;
        background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536838122609&di=90ee05f8393d2a4beb0d1e827fd53812&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140524%2Fbkp-20140524053455-906678672.jpg');
        background-repeat: no-repeat;
        clip-path:polygon(0% 35%, 90% 35%, 90% 20%, 100% 50%, 90% 80%, 90% 65%, 0% 65%);
    }
    .bar-contanier {
        flex: 1 0 0;
        font-size: 19px;
        .bar-outter {
            width: 100%;
            height: 22px;
            background: rgba(234,234,234,0.28);
            line-height: 22px;
            position: relative;
        }
        .bar-inner {
            height: 100%;
            text-align: center;
        }
        .num{
            border: 1px solid #000;
        }

    }
    .triangel-box {
        width: 60px;
        flex: 60px 0 0;
        .triangel {
            width: 0px;
            height: 0px;
            border-top: 20px solid rgba(0, 0, 0, 0);
            border-right: 20px solid rgba(0, 0, 0, 0);
            border-left: 40px solid rgba(234,234,234,0.28);
            border-bottom: 20px solid rgba(0, 0, 0, 0);
        }
    }

}
</style>