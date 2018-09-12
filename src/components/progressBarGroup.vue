<template>
    <div class="progressbargroup">
        <progress-bar v-for="(item, idx) in percents" :key="idx" :value="item.value" :percent="item.percent" :name="item.name" :color="color" />
        <div v-if="percents.length < count">
            <progress-bar name="" style="visibility: hidden;" :value="100" v-for="i in (count - percents.length)" :key="'emtpy'+i" />
        </div>
    </div>
</template>
<script type="text/javascript">
import progressBar from './progressBar.vue'

export default {

    data() {
        return {}
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
                return ['#1DC4E9', '#1DE9B6']
            },
            type: Array
        },
        real: {
            default: false,
            type: Boolean
        },
        count: {
            default: 0,
            type: Number
        },
    },
    mounted() {},
    computed: {
        percents(){
            let max = 0;
            this.data.forEach(item => item.value > max ? max = item.value : 0);
            return this.data.map(item => {
                return {
                    ...item,
                    percent: this.real ? item.value : Math.floor(Number(item.value) / max * 100)
                }
            });
        }
    },
    methods: {

    },
    components: {
        progressBar
    },
}
</script>
<style lang="scss">
.progressbargroup {
    .progressbar {
        margin-bottom: 1.2em;
    }
}
</style>