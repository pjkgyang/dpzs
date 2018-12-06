<template>
  <div class="reportFilter_gc">
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :dateTitle="'费用归属月份'"
       :placeholder="'请搜索项目名称/项目编号'" :dateType="'month'" :dateFormat="'yyyy-MM'"></filterComponent>
    </div>
    <div class="reportFilter_area ">
      <tableComponent :tableData="tableData"  :Width="'120'" :widthArr="[]" 
      :rowWidth="'150'" :Height="150" @exportTable="exportTable" :pageShow="true" @handleChange="handleChange"></tableComponent>
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
        startDate: "",
        endDate: ""
      },
      filterList: ["date"]
    };
  },
  mounted() {
    this.queryProjectHumanCost();
  },
  methods: {
    handleChange(data, type) {
      if (type == "cur") {
        this.currentPage = data;
      } else {
        this.currentPage = 1;
        this.pageSize = data;
      }
      this.queryProjectHumanCost();
    },
    // 筛选条件
    handleChangeFilter(data) {
      this.filterWord = data;
      this.queryProjectHumanCost();
    },

    exportTable() {
      window.open(
        WEBPACK_CONFIG_HOST +
          "report/exportProjectHumanCost.do?qymc=" +
          this.$route.query.qy +
          "&startDate=" +
          this.filterWord.startDate +
          "&endDate=" +
          this.filterWord.endDate 
      );
    },

    queryProjectHumanCost() {
      this.$get(this.API.queryProjectHumanCost, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        qymc: this.$route.query.qy,
        startDate: this.filterWord.startDate,
        endDate: this.filterWord.endDate
        // keyword: this.filterWord.keyword
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
