<template>
  <div class="dashboard">
    <h2>资产概览</h2>
    <div class="statistics">
      <el-row v-if="!isLab">
        <el-col :span="8">
          <div class="item">
            系统资产总数<br>
            <span class="number">{{ assetCount }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            待审申报资产<br>
            <span class="number">{{ unCheckAssetCount }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            待审调用资产<br>
            <span class="number">{{ callAssetCount }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="isLab">
        <el-col :span="8">
          <div class="item">
            实验室存放资产<br>
            <span class="number">{{ callAssetCount }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <h2>申请动态</h2>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="申请时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资产名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="state"
        label="申请状态">
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        small
        v-if="totalCount > 5"
        layout="prev, pager, next"
        :total="totalCount"
        :current-page="currentPage"
        :page-sizes="pageSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      assetCount: '0',
      unCheckAssetCount: '0',
      callAssetCount: '0',
      right: 1,
      isLab: false, // 是否是实验室人员
      tableData: [],
      pageSizeChange: [2,3,4],
      currentPage: 1,
      totalCount: 0,
    };
  },
  created() {
    this.right = JSON.parse(localStorage.user).right_id
    if (this.right === 0) { // 管理员
      this.queryAllDoing()
      this.queryAllAssetCount()

    } else if (this.right === 1) { // 普通教师
      this.queryPersonAssetCount()
      this.queryDoing()
    } else if (this.right === 2) { // 实验室
      this.isLab = true
      this.queryLabAssetCount()
    }
  },
  methods: {
    formatDate(date) {
      return date.substring(0, 10)
    },
    queryAllAssetCount() {
      this.$http.get('/api/asset/query-all-asset-count')
        .then((res) => {
          if (res.status === 200) {
            this.assetCount = res.data[0][0].assetCount
            this.unCheckAssetCount = res.data[1][0].unCheckAssetCount
            this.callAssetCount = res.data[2][0].callAssetCount
            console.log(res.data)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    queryPersonAssetCount() {
      this.$http.get('/api/asset/query-person-asset-count')
        .then((res) => {
          if (res.status === 200) {
            this.assetCount = res.data[0][0].assetCount
            this.unCheckAssetCount = res.data[1][0].unCheckAssetCount
            this.callAssetCount = res.data[2][0].callAssetCount
            console.log(res.data)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    queryLabAssetCount() {

    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.right === 0) {
        this.queryAllDoing()
      } else if (this.right === 1) {
        this.queryDoing()
      }
    },
    queryDoing() {
      this.$http.post('/api/asset/query-doing', {
        page: (this.currentPage - 1) * 10,
        size: 10
      }).then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            this.totalCount = res.data[0][0].totalCount
            this.tableData = []
            res.data[1].forEach((item) => {
              let obj = {
                date: this.formatDate(item.asset_submitdate),
                name: item.asset_name,
                type: item.asset_type,
                state: item.asset_state === 0 ? '申报审核中' : '调用审核中'
              }
              this.tableData.push(obj)
            })
          }
        })
    },
    queryAllDoing() {
      console.log('1')
      this.$http.post('/api/asset/query-all-doing', {
        page: (this.currentPage - 1) * 10,
        size: 10
      }).then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            this.totalCount = res.data[0][0].totalCount
            this.tableData = []
            res.data[1].forEach((item) => {
              let obj = {
                date: this.formatDate(item.asset_submitdate),
                name: item.asset_name,
                type: item.asset_type,
                state: item.asset_state === 0 ? '申报审核中' : '调用审核中'
              }
              this.tableData.push(obj)
            })
          }
        })
    },
  }
}
</script>

<style scoped>
  .statistics .item{
    box-shadow: 0px 0px 50px #eee;
    border-radius: 5px;
    margin: 30px;
    padding: 20px;
    font-size: 18px;
    line-height: 30px;
  }
  .number {
    color: #20a0ff;
    font-size: 28px;
  }
</style>
