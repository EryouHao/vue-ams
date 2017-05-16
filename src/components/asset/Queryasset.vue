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
        <el-table-column
          v-if="right === 'TEACHER'"
          prop="state"
          label="状态">
        </el-table-column>
        <el-table-column
          v-if="right === 'ADMIN'"
          prop="id"
          label="操作">
          <template scope="id">
            <el-button-group>
              <el-button :plain="true" type="primary" size="small" icon="check" @click="beforePass(id.$index, id.row.id)"></el-button>
              <el-button :plain="true" type="danger" size="small" icon="close" @click="confirmReject(id.$index, id.row.id,2)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="资产编号"
        :visible.sync="dialogVisible"
        size="tiny">
        <el-input v-model="form2.assetNumber" placeholder="请输入资产编号"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="pass">确 定</el-button>
        </span>
      </el-dialog>
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
        assetName: '',
        address: '',
      },
      form2: {
        id: '',
        assetNumber: '',
        state: 1,
      },
      tableData: [],
      index: '',
      dialogVisible: false,
      pageSizeChange: [2,3,4],
      currentPage: 1,
      totalCount: 0,
    }
  },
  components: {
    Expand,
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
    if (this.right === 'TEACHER') {
      this.requestPersonForCurrentPage()
    } else if (this.right === 'ADMIN') {
      this.requestUncheckForCurrentPage()
    }
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
      if (this.right === 'TEACHER') {
        this.requestPersonForCurrentPage()
      } else if (this.right === 'ADMIN') {
        this.requestUncheckForCurrentPage()
      }
    },
    requestPersonForCurrentPage() {
      this.$http.post('/api/asset/query-person-current-page', {
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
    requestUncheckForCurrentPage() {
      this.$http.post('/api/asset/query-uncheck-current-page', {
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
    confirmReject(id, rejectNum) {
      this.$confirm('您确定要拒绝此申报申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id, rejectNum)
        this.check(id, rejectNum, 2)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消拒绝操作'
        });
      });
    },
    check(index, id, state) {
      this.index = index
      this.$http.post('/api/asset/check-asset', {id: id,state: state})
        .then((res) => {
          if (res.status === 200) {
            this.tableData.splice(this.index, 1);
            this.$message({
              type: 'success',
              message: '拒绝操作成功'
            })
          } else {
            this.$message({
              type: 'danger',
              message: '操作失败'
            })
          }
        })
    },
    beforePass(index,id) {
      this.dialogVisible = true
      this.form2.id = id
      this.index = index
    },
    pass() {
      this.$http.post('/api/asset/check-asset-pass', this.form2)
        .then((res) => {
          if (res.status === 200) {
            this.tableData.splice(this.index, 1);
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '通过操作成功'
            })
          } else {
            this.$message({
              type: 'danger',
              message: '操作失败'
            })
          }
        })
    }
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
    width: 120px;
    color: #99a9bf;
  }
  .el-table__expanded-cell .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
