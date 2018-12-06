<template>
  <div>
    <div textright class="mg-10" v-if="exportShow">
      <el-button type="primary" size="mini" @click="exportTable">导出</el-button>
    </div>
    <div class="out-table">
     <div v-if="pageShow">
      <el-table  :data="bodyData" border class="report-ele-table" width="100%" :max-height="Height==0?'auto':tableHeight">
        <el-table-column v-for="(th,index) in tableData.head" :key="index" :label="th.zh" v-if="!th.hidden" :min-width="widthArr.includes(index)?rowWidth:th.zh=='排名'||th.zh=='姓名'||th.zh=='评分'?80:th.zh=='工号'||th.zh=='贡献人姓名'||th.zh=='贡献人工号'||th.zh=='发布人'||th.en=='gl'?100:Width" show-overflow-tooltip :fixed="indexArr.includes(index)?true:false">
          <template slot-scope="scope">
            <span v-if="!th.canRedirect">{{scope.row[index]}}</span>
            <a style="color:skyblue;text-decoration:underline" v-else href="javaScript:void(0)" @click="handleRouter(scope.row,index)">{{scope.row[index]}}</a>
          </template>
        </el-table-column>
      </el-table>
     </div>
    <div>
      <el-table v-if="!pageShow" :data="bodyData" border class="report-ele-table" width="100%" :max-height="Height==0?'auto':tableHeight"
      :span-method="objectSpanMethod">
        <el-table-column v-for="(th,index) in tableData.head" :key="index" :label="th.zh" v-if="!th.hidden" :min-width="widthArr.includes(index)?rowWidth:th.zh=='排名'||th.zh=='姓名'||th.zh=='评分'?80:th.zh=='工号'||th.zh=='贡献人姓名'||th.zh=='贡献人工号'||th.zh=='发布人'||th.en=='gl'?100:Width" show-overflow-tooltip :fixed="indexArr.includes(index)?true:false">
          <template slot-scope="scope">
            <span v-if="!th.canRedirect">{{scope.row[index]}}</span>
            <a style="color:skyblue;text-decoration:underline" v-else href="javaScript:void(0)" @click="handleRouter(scope.row,index)">{{scope.row[index]}}</a>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    <div style="text-align:right;" v-if="pageShow" class="reportPagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0,
      bodyData: [],
      tableHeight: window.innerHeight - this.Height
    };
  },
  mounted() {},
  methods: {
     objectSpanMethod({ row, column, rowIndex, columnIndex }) {
         if (columnIndex === 0) {
          if (rowIndex % (Number(new Date().getFullYear() - 2015) + 2) === 0 ) {
            return {
              rowspan: Number(new Date().getFullYear() - 2015) + 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
     },
    exportTable() {
      this.$emit("exportTable", "");
    },
    handleRouter(data, i) {
      this.$emit("handleXxwt", data, i, this.tableData.head);
    },
    handleCurrentChange(data) {
      this.$emit("handleChange", data,'cur');
    },
    handleSizeChange(data) {
      this.$emit("handleChange", data,'size');
    }
  },
  computed: {},
  props: {
    tableData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageShow: {
      type: Boolean,
      default: true
    },
    indexArr: {
      type: Array,
      default: () => {
        return [];
      }
    },
    Height: {
      type: Number,
      default: 350
    },
    widthArr: {
      type: Array,
      default: () => {
        return [2, 3, 4, 9];
      }
    },
    Width: {
      type: String,
      default: "190"
    },
    rowWidth: {
      type: String,
      default: "240"
    },
    exportShow: {
      type: Boolean,
      default: true
    },
    sfhb:{
      type: Boolean,
      default: true 
    }
  },
  watch: {
    tableData(n, o) {
      let data = n.body;
      if (!!data.rows) {
        this.bodyData = data.rows;
        this.total = data.records;
      } else {
        this.bodyData = data;
        this.total = 0;
      }
    }
  },
  components: {}
};
</script>
<style scoped>
.out-table {
  overflow-x: auto;
  width: 100%;
}
.table {
  border: 1px solid #ddd;
  margin-bottom: 10px !important;
}
.table caption {
  border: 1px solid #ddd;
  border-bottom: none;
  text-align: center;
  background: #eee;
  font-size: 18px;
  font-weight: 700;
  color: #000;
}
.table tr,
.table th {
  height: 40px;
  text-align: center;
  white-space: nowrap;
  padding: 0 10px;
}
.table td {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 10px;
}
</style>
