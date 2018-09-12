<template>
    <div class="numcardgroup">
        <div v-for="(num, idx) in numsArr" :key="idx">
            <num-card :num="num" :color="color" :bgColor="bgColor" />
        </div>
        <div class="numcardgroup__unit" v-if="unit">
            <sub>{{unit}}</sub>
        </div>
    </div>
</template>
<script type="text/javascript">
import numCard from './numCard.vue'
export default {
    data() {
        return {

        }
    },
    props: {
        num: {
            default: 0,
            type: Number
        },
        unit: {
            default: "",
            type: String
        },
        count: {
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
    computed: {
        numsArr() {
            let nums = this.num;
            const arr = [];
            while (nums > 0) {
                arr.unshift(nums % 10);
                nums = parseInt(nums / 10 + '');
            }
            if (arr.length === 0) {
                arr.push(0);
            }
            if (this.count > 0 && this.count > arr.length) {
                for (let i = arr.length; i < this.count; i++) {
                    arr.unshift(0);
                }
            }
            return arr;
        }
    },
    mounted() {},
    methods: {},
    components: {
    	numCard
    },
}
</script>
<style lang="scss">
.numcardgroup {
  display: flex;
  .numcardgroup__unit {
    align-self: flex-end;
    sub {
      display: inline-block;
      padding-bottom: 0.5em;
    }
  }
}
</style>