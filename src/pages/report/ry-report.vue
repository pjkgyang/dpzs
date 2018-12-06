<template>
    <div class="reportFilter">
        <div class="reportFilter_area">
            <reportFilter :placeholder="'请输入人员工号 / 姓名'" @handleChangeFilter="handleChangeFilter" :sfhb="false"></reportFilter>
        </div><br>
        <div class="reportFilter_area reportPersonal">
            <tableComponent :tableData="tableData" :indexArr="[0,1]" :Width="'120'" :widthArr="[7,8,9]" :Height="280" :rowWidth="'200'"
            @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" @exportTable="exportTable"></tableComponent>
        </div>
    </div>
</template>

<script>
import { getMenu } from "../../utils";
import tableComponent from "../../components/report/tableComponent.vue";
import reportFilter from "../../components/reportFilter.vue/filter.vue";

export default {
  data() {
    return {
      rylxList: {},
      currentPage: 1,
      pageSize: 15,
      tableData: {},
      filterWord: {
        keyword: "",
        rylx: [],
        ryzt: ""
      }
    };
  },
  mounted() {
    this.panelPersonnel();
  },
  methods: {
    handleChangeFilter(data) {
        this.filterWord = data;
        this.currentPage = 1;
        this.panelPersonnel();
    },
    exportTable() {
      window.open(
        WEBPACK_CONFIG_HOST +
          "report/exportPanelPersonnel.do?keyword=" +
          this.filterWord.keyword +
          "&rylx=" +
          this.filterWord.rylx +
          "&ryzt=" +
          this.filterWord.ryzt +
          "&bm=" +
          this.$route.query.qy
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.panelPersonnel();
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.panelPersonnel();
    },
    panelPersonnel() {
      this.$get(this.API.panelPersonnel, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.filterWord.keyword,
        bm: this.$route.query.qy,
        ryxz: this.filterWord.rylx.join(','),
        ryzt: this.filterWord.ryzt
      }).then(res => {
        if (res.data.state == "success") {
          this.tableData = res.data.data;
        }
      });
    }
  },
  components: {  reportFilter, tableComponent }
};
</script>

<style lang="scss" scoped>
.reportFilter {
  padding: 0 10px;
}
.reportFilter_area {
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 0;
}

</style>
