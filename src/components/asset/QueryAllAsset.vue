<template>
  <div class="query-asset">
    <div class="query-content">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="资产名称">
          <el-input v-model="form.assetName"></el-input>
        </el-form-item>
        <el-form-item label="存放地点">
          <el-select v-model="form.address" placeholder="存放地点">
            <el-option label="C1-202" value="shanghai"></el-option>
            <el-option label="C1-209" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
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
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="资产名称">
                <span>{{ props.row.assetName }}</span>
              </el-form-item>
              <el-form-item label="使用人">
                <span>{{ props.row.userName }}</span>
              </el-form-item>
              <el-form-item label="资产编号">
                <span>{{ props.row.assetNumber }}</span>
              </el-form-item>
              <el-form-item label="发票">
                <span>{{ props.row.bill }}</span>
              </el-form-item>
              <el-form-item label="购置日期">
                <span>{{ props.row.buyDate }}</span>
              </el-form-item>
              <el-form-item label="单价">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="型号">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="使用方向">
                <span>{{ props.row.useDirection }}</span>
              </el-form-item>
              <el-form-item label="资产图片">
                <img :src="props.row.imgUrl" class="asset-img" alt="资产图片">
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
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
export default {
  data () {
    return {
      form: {
        assetName: '',
        address: '',
      },
      tableData: [],
      pageSizeChange: [2,3,4],
      currentPage: 1,
      totalCount: 0,
    }
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
    // this.queryAllAsset()
    this.currentPage = 1
    this.requestForCurrentPage()
    console.log(this.tableData)
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
    queryAllAsset() {
      console.log('查询了')
      this.$http.get('/api/asset/query-all-asset')
        .then((res) => {
          if (res.status === 200) {
            console.log(res)
            res.data.forEach((asset) => {
              let item = {
                id: asset.id,
                assetName: asset.asset_name,
                userName: asset.user_name,
                assetNumber: asset.asset_number,
                bill: asset.asset_bill,
                buyDate: this.formatDate(asset.buy_date),
                price: asset.asset_price,
                type: asset.asset_type,
                useDirection: asset.asset_usedirection,
                leaveNumber: asset.asset_leavenum,
                brand: asset.asset_brand,
                state: this.formatState(asset.asset_state),
                imgUrl: asset.asset_imgurl,
              }
              this.tableData.push(item)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    handleCurrentChange(val) {
      console.log(val)
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
          console.log('totalCount' + this.totalCount)
          this.tableData = []
          console.log(res.data[1])
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
              useDirection: asset.asset_usedirection,
              leaveNumber: asset.asset_leavenum,
              brand: asset.asset_brand,
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
            console.log('ｄａｏｃｈｕ')
            window.location = 'http://localhost:8090/api/export/export-excel'
          }
        })
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
