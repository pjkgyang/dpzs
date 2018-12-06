<template>
    <div class="reportFilter">
        <div class="reportFilter_area dpReport">
            <tableComponent :tableData="tableData" :indexArr="[0]" :Width="'130'"
            :rowWidth="'130'" :widthArr="[0]" :Height="100" @exportTable="exportTable" :pageShow="false"
            @handleXxwt="handleXxwt"></tableComponent>
        </div>
    </div>
</template>

<script>
import { getMenu } from "../../utils";
import tableComponent from "../../components/report/tableComponent.vue";

export default {
  data() {
    return {
      rylxList: {},
      currentPage: 1,
      pageSize: 999,
      tableData: {},
      filterWord: {
        keyword: "",
        rylx: "",
        ryzt: ""
      }
    };
  },
  mounted() {
    this.panelCompletion();
  },
  methods: {
    // 跳转
    handleXxwt(data,i,params){
      let routeData = this.$router.resolve({
        path: this.$route.name == "wgReport"?"/wg":"/ys",
        query: {qy:data[i]}
      });
      window.open(routeData.href, "_blank");
    },
    // 导出
    exportTable() {
      let wglx = this.$route.name == "wgReport" ? 1 : 2;
      window.open(
        WEBPACK_CONFIG_HOST + "report/exportPanelCompletion.do?wglx=" + wglx
      );
    },
    
    panelCompletion() {
      this.$get(this.API.panelCompletion, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        wglx: this.$route.name == "wgReport" ? 1 : 2
      }).then(res => {
        if (res.data.state == "success") {
          this.tableData = res.data.data;
        }
      });
    }
  },
  components: { tableComponent }
};
</script>

<style lang="scss" scoped>
.reportFilter_area {
  padding: 0 10px;
}
</style>
