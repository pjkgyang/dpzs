<template>
    <div class="progressbar">
        <div flex spacebetween class="progressbar__text">
            <span>{{name}}</span><span class="num">{{value}}</span>
        </div>
        <div class="progressbar__bar">
            <div class="progressbar__inner" :style="{width: percent + '%', 'background-image': 'linear-gradient(to right, '+color[0]+', '+color[1]+')'}"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {}
    },
    props: {
        color: {
            default: function() {
                return ['#1DC4E9', '#1DE9B6']
            },
            type: Array
        },
        name: {
            default: "",
            type: String
        },
        value: {
            default: "",
            type: String | Number
        },
        percent: {
            default: 0,
            type: Number
        },
    },
    mounted() {},
    methods: {},
    components: {

    },
}
</script>
<style lang="scss">
.progressbar {
  .num {
    font-size: 1.5em;
  }
  .progressbar__text {
    margin-bottom: 0.2em;
  }
  .progressbar__bar {
    height: 1em;
    background: rgba(234, 234, 234, 0.28);
    border-radius: 0.4em;
    overflow: hidden;
  }
  .progressbar__inner {
    background: yellow;
    border-radius: 0.4em;
    height: 100%;
  }
}
</style>