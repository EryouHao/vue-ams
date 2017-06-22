<template>
  <div class="query-asset">
    <div class="query-content">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="资产编号">
          <el-input v-model="form.assetNumber"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="exportExcel">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-content">
      <el-table
      :data="tableData"
      style="width: 100%">
        <expand></expand>
        <el-table-column
          prop="assetName"
          label="资产名称">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="使用人">
        </el-table-column>
        <el-table-column
          prop="assetNumber"
          label="资产编号">
        </el-table-column>
        <el-table-column
          prop="buyDate"
          label="购置日期">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="type"
          label="型号">
        </el-table-column>
        <el-table-column
          prop="useDirection"
          label="使用方向">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          small
          v-if="totalCount > 10"
          layout="prev, pager, next"
          :total="totalCount"
          :current-page="currentPage"
          :page-sizes="pageSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
import Expand from './expand/Expand'

export default {
  data () {
    return {
      form: {
        assetNumber: ''
      },
      tableData: [],
      pageSizeChange: [2,3,4],
      currentPage: 1,
      totalCount: 0,
    }
  },
  components: {
    Expand
  },
  computed: {
    right() {
      const rightId = JSON.parse(localStorage.user).right_id
      if (rightId === 0) {
        return 'ADMIN' // 管理员
      } else if (rightId === 1) {
        return 'TEACHER' // 老师
      } else {
        return '' // 实验室
      }
    }
  },
  created() {
    this.requestForCurrentPage()
  },
  methods: {
    formatDate(date) {
      return date.substring(0, 10)
    },
    formatState(state) {
      if (state === 0) {
        return '在审'
      } else if (state === 1) {
        return '已通过'
      } else {
        return '未通过'
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.requestForCurrentPage()
    },
    requestForCurrentPage() {
      this.$http.post('/api/asset/query-current-page', {
        page: (this.currentPage - 1) * 10,
        size: 10
      }).then((res) => {
        if (res.status === 200) {
          this.totalCount = res.data[0][0].totalCount
          this.tableData = []
          res.data[1].forEach((asset) => {
            let item = {
                id: asset.id,
                assetName: asset.asset_name,
                userName: asset.user_name,
                assetNumber: asset.asset_number,
                bill: asset.asset_bill,
                buyDate: this.formatDate(asset.buy_date),
                price: asset.asset_price,
                type: asset.asset_type,
                standard: asset.asset_standard,
                leaveDate: asset.asset_leavedate,
                submitDate: asset.asset_submitdate,
                useDirection: asset.asset_usedirection,
                leaveNumber: asset.asset_leavenum,
                brand: asset.asset_brand,
                storagePlace: asset.storagePlace,
                buyer: asset.buyer,
                purchaser: asset.asset_purchaser,
                attachNum: asset.asset_attachnum,
                attachAmount: asset.asset_attachamount,
                funds: asset.funds,
                signature: asset.asset_signature,
                organization: asset.organization,
                state: this.formatState(asset.asset_state),
                imgUrl: asset.asset_imgurl,
              }
            this.tableData.push(item)
          })
        }
      })
    },
    // 导出Excel
    exportExcel() {
      this.$http.get('/api/export/export-excel')
        .then((res) => {
          if (res.status === 200) {
            window.location = 'http://localhost:8090/api/export/export-excel'
          }
        })
    },
    search() {
      if (this.form.assetNumber === '') {
        this.requestForCurrentPage()
      } else {
        this.$http.post('/api/search/search', this.form)
        .then((res) => {
          if (res.status === 200) {
            this.tableData = []
            this.totalCount = 0

            const asset = res.data[0]

            let item = {
              id: asset.id,
              assetName: asset.asset_name,
              userName: asset.user_name,
              assetNumber: asset.asset_number,
              bill: asset.asset_bill,
              buyDate: this.formatDate(asset.buy_date),
              price: asset.asset_price,
              type: asset.asset_type,
              standard: asset.asset_standard,
              leaveDate: asset.asset_leavedate,
              submitDate: asset.asset_submitdate,
              useDirection: asset.asset_usedirection,
              leaveNumber: asset.asset_leavenum,
              brand: asset.asset_brand,
              storagePlace: asset.storagePlace,
              buyer: asset.buyer,
              purchaser: asset.asset_purchaser,
              attachNum: asset.asset_attachnum,
              attachAmount: asset.asset_attachamount,
              funds: asset.funds,
              signature: asset.asset_signature,
              organization: asset.organization,
              state: this.formatState(asset.asset_state),
              imgUrl: asset.asset_imgurl,
            }
            this.tableData.push(item)
          }
        })
      }
    },
  }
}
</script>

<style scoped>
  .query-content {
    text-align: center;
  }
  .page {
    margin: 20px auto 40px;
    text-align: right;
  }
  .asset-img {
    width: 300px;
    height: 200px;
  }
</style>
<style>
  .el-table__expanded-cell .table-expand {
    font-size: 0;
  }
  .el-table__expanded-cell .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .el-table__expanded-cell .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
