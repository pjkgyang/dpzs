<template>
    <div class="numcard" :style="{height: size + 'em'}">
        <div v-for="n in 10" :key="n" class="numcard__item" flex :style="{backgroundColor: bgColor, transform:'translateY(-'+(num)*100+'%)'}">
            <div class="numcard__num num" :style="{fontSize: size + 'em', 'background-image': 'linear-gradient(to bottom, '+color[0]+', '+color[1]+')'}">
                {{n-1}}
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {}
    },
    props: {
        num: {
            default: 0,
            type: Number
        },
        size: {
            default: 5,
            type: Number
        },
        bgColor: {
            default: "rgba(0, 0, 0, 0.4)",
            type: String
        },
        color: {
            default: function() {
                return ['#f1f1f1', '#adadad']
            },
            type: Array
        },
    },
    mounted() {},

    methods: {},
    components: {},
}
</script>
<style lang="scss">
.numcard {
  text-align: center;
  margin: 0.5em;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .numcard__item {
    flex: 1 0 100%;
    padding: 0 0.5em;
    transition: all 0.5s;
  }
  .numcard__num {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1em;
  }
}

</style>