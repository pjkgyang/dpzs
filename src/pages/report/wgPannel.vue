<template>
  <div class="reportFilter">
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请搜索项目名称/项目编号'"></filterComponent>
    </div>
    <div class="reportFilter_area yswgReport">
      <tableComponent :tableData="tableData" :indexArr=[0] :Width="'120'" :widthArr="[0,2,3,5]" :rowWidth="'150'" :Height="140" @exportTable="exportTable" :pageShow="true" @handleChange="handleChange"></tableComponent>
    </div>
  </div>
</template>

<script>
import { getMenu } from "../../utils";
import tableComponent from "../../components/report/tableComponent.vue";
import filterComponent from "../../components/reportFilter.vue/filter";
export default {
  data() {
    return {
      rylxList: {},
      currentPage: 1,
      pageSize: 15,
      tableData: {},
      filterWord: {
        keyword: ""
      },
      filterList: ["keyword"]
    };
  },
  mounted() {
    this.queryPanelCompletionData();
  },
  methods: {
    handleChange(data, type) {
      if (type == "cur") {
        this.currentPage = data;
      } else {
        this.currentPage = 1;
        this.pageSize = data;
      }
      this.queryPanelCompletionData();
    },
    // 筛选条件
    handleChangeFilter(data) {
      this.filterWord = data;
      this.queryPanelCompletionData();
    },

    exportTable() {
      window.open(
        WEBPACK_CONFIG_HOST +
          "report/exportPanelCompletionData.do?qymc=" +
           this.$route.query.qy  +
          "&keyword=" +
          this.filterWord.keyword
      );
    },

    queryPanelCompletionData() {
      this.$get(this.API.queryPanelCompletionData, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        qymc: this.$route.query.qy,
        keyword: this.filterWord.keyword
      }).then(res => {
        if (res.data.state == "success") {
          this.tableData = res.data.data;
        } else {
         alert(res.data.msg);
        }
      });
    }
  },
  components: { tableComponent, filterComponent }
};
</script>

<style lang="scss" scoped>
.reportFilter_area {
  padding: 0 10px;
}
</style>
