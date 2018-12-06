<template>
    <div class="noproblem" flex-column center>
        <div>
            <img :src="img" />
            <div>{{title}}</div>
        </div>
    </div>
</template>
<script type="text/javascript">
import img from '../../static/assets/temp_no_problem.png'
export default {
    data() {
        return {
        	img
        }
    },
    props: {
        title: {
            default:'暂无数据',
            type: String
        },
    },
    mounted() {},
    methods: {},
    components: {},
}
</script>
<style lang="scss" scoped>
.noproblem {
  text-align: center;
}
</style>