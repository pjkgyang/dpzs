<template>
    <section class="card" ref="card">
        <h3 class="card__heading" v-if="title" spacebetween>
          <span><span class="border-front" v-if="show"></span><span class="card__heading-title" v-html>{{title}}</span></span>
          <span class="" v-html="subtitle"></span>
        </h3>
        <div class="card__body" :flex="row" :flex-column="!row">
            <slot></slot>
        </div>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {}
    },
    props: {
        title: {
            default: "",
            type: String
        },
        subtitle: {
            default: "",
            type: String
        },
        row: {
            default: false,
            type: Boolean
        },
        gradient:{
            default:function(){
                return []
            },
            type:Array,
        },
        show:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
        if (this.gradient.length>0){
                this.$refs.card.style.background = '-webkit-gradient(linear, 0 0, 0 bottom, from('+this.gradient[0]+'), to('+this.gradient[1]+'))'
            }
    },
    methods: {},
    components: {},
}
</script>
<style lang="scss">
@import '../../static/css/sass/resources/tools.scss';
@import '../../static/css/sass/resources/settings.scss';
.card {
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
    margin: $paddingHalf / 2 + 0.05  $paddingHalf / 2;
    display: flex;
    flex-direction: column;
    .card__heading {
        margin: 0;
        flex-shrink: 0;
        font-weight: normal;
        padding: 1em;
        padding-bottom: 0;
        display: flex;
        align-items: flex-end;
        .card__heading-title {
            @include gradient;
            font-size: 1.1em;
            font-weight: bold;
            white-space: nowrap;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.30);
        }
        .border-front{
            border-left: 5px solid #da8920;
            margin-right:5px; 
        }
        sub {
            @include gradient;
            font-size: 0.8em;
            font-weight: bold;
        }
        .card__heading-desc {
            flex: 1;
            font-size: $fontSizeSmall;
            color: #d5d5d5;
            text-align: right;
            white-space: nowrap;
        }
    }
    .card__body {
        padding: 1em;
        flex: 1 0 0;
        >div {
            flex: 1 0 0;
        }
    }
}
</style>