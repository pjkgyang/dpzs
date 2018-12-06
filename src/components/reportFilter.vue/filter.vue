<template>
  <div>
    <div class="query-condition">
      <div v-if="filterList.includes('keyword')">
        <p>
          <p class="query-title">
            高级搜索:</p>
          <el-input v-model="filterWord.keyword" size="mini" style="width:348px;" :placeholder="placeholder" @change="handleSearch"></el-input>&#x3000;
          <el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button>
        </p>
      </div>

      <div v-if="filterList.includes('rylx')">
        <p class="query-title">人员类型:</p>
        <p>
          <el-checkbox-group v-model="filterWord.rylx" @change="handleChecked">
            <el-checkbox style="color:#fff" v-for="(value,key,index) in rylxList" :label="key" :key="index">{{value}}</el-checkbox>
          </el-checkbox-group>
          <!-- <span data-type="" :class="{'bg-active':filterWord.rylx == ''}">全部</span>
                    <span v-for="(value,key,index) in rylxList" :data-index="index" :data-type="key" :key="index" :class="{'bg-active':filterWord.rylx == key}">{{value}}</span> -->
        </p>
      </div>

      <div v-if="filterList.includes('ryzt')">
        <p class="query-title">人员状态:</p>
        <p class="query-list" @click="handleRyzt">
          <span data-type="" :class="{'bg-active':filterWord.ryzt == ''}">全部</span>
          <span v-for="(value,key,index) in ryztList" :data-index="index" :data-type="key" :key="index" :class="{'bg-active':filterWord.ryzt == key}">{{value}}</span>
        </p>
      </div>

      <div v-if="filterList.includes('date')">
        <p class="query-title">{{dateTitle}}:</p>
        <p>
          <el-date-picker size="mini" @change="changeDate" v-model="filterWord.startDate" :type="dateType" placeholder="选择开始日期" :format="dateFormat" :value-format="dateFormat">
          </el-date-picker>
          &#x3000;至&#x3000;
          <el-date-picker size="mini" @change="changeDate" v-model="filterWord.endDate" :type="dateType" placeholder="选择结束日期" :format="dateFormat" :value-format="dateFormat">
          </el-date-picker>
        </p>
      </div>

      <div v-if="filterList.includes('kfxz')">
        <p class="query-title">开发性质:</p>
        <p class="query-list" @click="handleKfxz">
          <span data-type="" :class="{'bg-active':filterWord.kfxz == ''}">全部</span>
          <span v-for="(value,key,index) in kfxzList" :data-index="index" :data-type="key" :key="index" :class="{'bg-active':filterWord.kfxz == key}">{{value}}</span>
        </p>
      </div>

      <div v-if="filterList.includes('fwlx')">
        <p class="query-title">服务类型:</p>
        <p class="query-list" @click="handleFwlx">
          <span data-type="" :class="{'bg-active':filterWord.fwlx == ''}">全部</span>
          <span v-for="(value,key,index) in fwlxList" :data-index="index" :data-type="key" :key="index" :class="{'bg-active':filterWord.fwlx == key}">{{value}}</span>
        </p>
      </div>

      <div v-if="filterList.includes('djzt')">
        <p class="query-title">单据状态:</p>
        <p class="query-list" @click="handleDjzt">
          <span data-type="" :class="{'bg-active':filterWord.djzt == ''}">全部</span>
          <span v-for="(value,key,index) in djztList" :data-index="index" :data-type="key" :key="index" :class="{'bg-active':filterWord.djzt == key}">{{value}}</span>
        </p>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rylxList: {},
      ryztList: {},
      kfxzList: {}, //开发性质
      fwlxList: {}, //服务类型
      djztList: {}, //单据状态
      filterWord: {
        keyword: "",
        rylx: [],
        ryzt: "",
        kfxz: "",
        fwlx: "",
        djzt: "",
        startDate: "",
        endDate: ""
      }
    };
  },
  props: {
    filterList: {
      type: Array,
      default: () => {
        return ["keyword", "rylx", "ryzt"];
      }
    },
    placeholder: {
      type: String,
      default: ""
    },
    dateTitle: {
      type: String,
      default: "日期范围"
    },
    dateType: {
      type: String,
      default: "date"
    },
    dateFormat: {
      type: String,
      default: "yyyy-MM-dd"
    }
  },
  methods: {
    handleSearchBtn() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleSearch() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleChecked() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    // 日期切换
    changeDate(val) {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleRyzt(e) {
      let zt = e.target.getAttribute("data-type");
      if (zt == null) return;
      this.filterWord.ryzt = zt;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    // 开发性质
    handleKfxz(e) {
      let xz = e.target.getAttribute("data-type");
      if (xz == null) return;
      this.filterWord.kfxz = xz;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    // 服务类型
    handleFwlx(e) {
      let lx = e.target.getAttribute("data-type");
      if (lx == null) return;
      this.filterWord.fwlx = lx;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    // 单据状态
    handleDjzt(e) {
      let zt = e.target.getAttribute("data-type");
      if (zt == null) return;
      this.filterWord.djzt = zt;
      this.$emit("handleChangeFilter", this.filterWord);
    },

    getDictEnum(type) {
      if (!!sessionStorage.getItem(type)) return;
      this.$get(this.API.getDictEnum, {
        name: type,
        isInterface: ""
      }).then(res => {
        if (res.data.state == "success") {
          if (type == "EmployeeType") {
            this.rylxList = res.data.data;
          } else if (type == "EmployeeStatus") {
            this.ryztList = res.data.data;
          } else if (type == "DevelopmentType") {
            this.kfxzList = res.data.data;
          } else if (type == "DevelopmentServiceType") {
            this.fwlxList = res.data.data;
          } else if (type == "DocumentStatus") {
            this.djztList = res.data.data;
          }
        }
        sessionStorage.setItem(type, JSON.stringify(res.data.data));
      });
    }
  },
  mounted() {
    if (
      this.filterList.includes("rylx") &&
      !sessionStorage.getItem("EmployeeType")
    ) {
      this.getDictEnum("EmployeeType"); // 人员类型
    } else {
      this.rylxList = JSON.parse(sessionStorage.getItem("EmployeeType"));
    }

    if (
      this.filterList.includes("ryzt") &&
      !sessionStorage.getItem("EmployeeStatus")
    ) {
      this.getDictEnum("EmployeeStatus"); // 人员状态
    } else {
      this.ryztList = JSON.parse(sessionStorage.getItem("EmployeeStatus"));
    }

    if (
      this.filterList.includes("kfxz") &&
      !sessionStorage.getItem("DevelopmentType")
    ) {
      this.getDictEnum("DevelopmentType"); // 开发性质
    } else {
      this.kfxzList = JSON.parse(sessionStorage.getItem("DevelopmentType"));
    }

    if (
      this.filterList.includes("fwlx") &&
      !sessionStorage.getItem("DevelopmentServiceType")
    ) {
      this.getDictEnum("DevelopmentServiceType"); // 服务类型
    } else {
      this.fwlxList = JSON.parse(
        sessionStorage.getItem("DevelopmentServiceType")
      );
    }

    if (
      this.filterList.includes("djzt") &&
      !sessionStorage.getItem("DocumentStatus")
    ) {
      this.getDictEnum("DocumentStatus"); // 单据状态
    } else {
      this.djztList = JSON.parse(sessionStorage.getItem("DocumentStatus"));
    }
  },
  activated() {},
  watch: {},
  components: {}
};
</script>
<style lang="scss" scope>
.query-condition > div {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  font-size: 13px;
}
.query-title {
  display: inline-block;
  font-size: 14px;
  width: 100px;
  white-space: nowrap;
  text-align: right !important;
  margin-right: 10px !important;
  padding: 3px 0 !important;
  font-weight: 700;
}
.query-list {
  display: inline-block;
  width: 95%;
  span {
    display: inline-block;
    padding: 0px 5px;
    border-radius: 3px;
    margin: 5px 10px 0 0;
    font-size: 14px;
  }
}
.query-list span:hover {
  cursor: pointer;
}
.bg-active {
  //   background: #1997d7;
  background: linear-gradient(
    to left bottom,
    rgb(8, 88, 209),
    rgb(238, 241, 243)
  );
  color: #fff !important;
}
</style>
