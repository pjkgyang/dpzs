<template>
  <div class="reportFilter">
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter"
       :placeholder="'请搜索项目名称/项目编号'" :dateTitle="'报销申请日期'"></filterComponent>
    </div>
    <div class="reportFilter_area dpReport">
      <tableComponent :tableData="tableData" :indexArr="[0]" :Width="'120'" :widthArr="[]" 
      :rowWidth="'150'" :Height="210" @exportTable="exportTable" :pageShow="true" @handleChange="handleChange"></tableComponent>
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
        keyword: "",
        kfxz: "",
        fwlx: "",
        startDate: "",
        endDate: ""
      },
      filterList: ["keyword", "djzt",  "date"]
    };
  },
  mounted() {
    this.queryExpenseAccount();
  },
  methods: {
    handleChange(data, type) {
      if (type == "cur") {
        this.currentPage = data;
      } else {
        this.currentPage = 1;
        this.pageSize = data;
      }
      this.queryExpenseAccount();
    },
    // 筛选条件
    handleChangeFilter(data) {
      this.filterWord = data;
      this.queryExpenseAccount();
    },

    exportTable() {
      window.open(
        WEBPACK_CONFIG_HOST +
          "report/exportPanelAcceptanceData.do?qymc=" +
           this.$route.query.qy  +
          "&djzt=" +
          this.filterWord.djzt +
          "&startDate=" +
          this.filterWord.startDate +
          "&endDate=" +
          this.filterWord.endDate +
          "&keyword=" +
          this.filterWord.keyword
      );
    },

    queryExpenseAccount() {
      this.$get(this.API.queryExpenseAccount, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        qymc: this.$route.query.qy,
        djzt: this.filterWord.djzt,
        startDate: this.filterWord.startDate,
        endDate: this.filterWord.endDate,
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
