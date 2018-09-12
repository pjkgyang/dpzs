<template>
    <div class="timedisplay num">
        <div class="timedisplay__wrap">
            <div class="timedisplay__date">{{date}}</div>
            <div class="timedisplay__day">{{day}}</div>
        </div>
        <div class="timedisplay__time">{{time}}</div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            now: new Date(),
            days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        }
    },
    created() {
        setInterval(() => {
            this.now = new Date();
        }, 10000);
    },
    mounted() {},
    computed: {
        date() {
            const y = this.now.getFullYear();
            const m = this.now.getMonth() + 1;
            const d = this.now.getDate();
            return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;
        },
        day() {
            return this.days[this.now.getDay()];
        },
        time() {
            const h = this.now.getHours();
            const m = this.now.getMinutes();
            return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
        }
    },
    components: {},
}
</script>
<style lang="scss">
.timedisplay {
    color: #fff;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.timedisplay__wrap {
    text-align: right;
    font-size: 1.1em;
}

.timedisplay__time {
    font-size: 3.2em;
    margin-left: 0.2em;
    line-height: 0.8em;
}
</style>