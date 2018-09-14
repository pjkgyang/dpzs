<template>
    <div class="top5" flex>
        <div col="2" center flex><span class="num fontsize60 sum">{{clzwts}}</span></div>
        <div col="3" class="top5__items">
            <div v-for="item in percents" class="top5__item" col="1">
                <div class="top5__bar" :style="{height: item.percent + '%', background: item.color}">
                    <div class="num">{{item.value}}</div>
                </div>
                <div class="intro">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            sortedData: []
        }
    },
    props: {
        data: {
            default: function() {
                return []
            },
            type: Array
        },
        color: {
            default: function() {
                return ['#E6B03F', '#E3544C', '#419EF8', '#9A7DD1', '#3AC868', '#A13588', '#E6783F', '#58BDA5', '#979797']
            },
            type: Array
        },
        clzwts:{
            type:Number,
            default:0
        }
        
    },
    computed: {
        percents() {
            let max = 0;
            this.sortedData = JSON.parse(JSON.stringify(this.data))
            this.sortedData.forEach(item => item.value > max ? max = Number(item.value) : null);
            return this.sortedData.map((item, idx) => {
                return {
                    ...item,
                    percent: Math.floor(Number(item.value) / max * 100),
                    color: this.color[idx % this.color.length]
                }
            })
        }
    },
    mounted() {},
    methods: {
       
        
    },
    components: {},
}
</script>
<style lang="scss">
@import '../../static/css/sass/resources/tools.scss';
.top5 {
    flex: 1 !important;
    .top5__listwrap {
        flex: 2 !important;
    }
    .sum {
        @include gradient(#FFAF91, #F71C1C);
    }
    .top5__items {
        display: flex;
        justify-content: center;
        padding-top: 2em;
        padding-bottom: 2em;
        flex: 2 !important;
    }
    .top5__item {
        text-align: center;
        position: relative;
        margin-top: 2em;
        flex: 1 !important;
        .top5__bar {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 1.2em;
            margin-left: -0.5em;
            border-radius: 0.5em;
            .num {
                position: absolute;
                font-size: 1.5em;
                left: 50%;
                transform: translate(-50%, -150%);
            }
        }
        .intro {
            position: absolute;
            font-size: 1em;
            left: 0;
            width: 100%;
            bottom: -30px;
        }
    }
}
</style>