<template>
  <div class="callasset-check">
    <h2>调用审核待审列表</h2>
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
              <el-form-item label="原使用人">
                <span>{{ props.row.oldUserName }}</span>
              </el-form-item>
              <el-form-item label="新使用人">
                <span>{{ props.row.newUserName }}</span>
              </el-form-item>
              <el-form-item label="原存放地点">
                <span>{{ props.row.oldStoragePlace }}</span>
              </el-form-item>
              <el-form-item label="新存放地点">
                <span>{{ props.row.newUserName }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="assetName"
          label="资产名称">
        </el-table-column>
        <el-table-column
          prop="oldUserName"
          label="原使用人">
        </el-table-column>
        <el-table-column
          prop="newUserName"
          label="新使用人">
        </el-table-column>
        <el-table-column
          prop="oldStoragePlace"
          label="原存放地点">
        </el-table-column>
        <el-table-column
          prop="newStoragePlace"
          label="新存放地点">
        </el-table-column>
        <el-table-column
          prop="id"
          label="操作">
          <template scope="id">
            <el-button
              size="mini"
              @click="check(id.row.id, 1)">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="check(id.row.id, 2)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
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
      tableData: []
    }
  },
  created() {
    this.queryCallList()
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
    queryCallList() {
      console.log('查询了')
      this.$http.get('/api/call/query-call-list')
        .then((res) => {
          if (res.status === 200) {
            console.log('返回的数据是')
            console.log(res.data)

            res.data.forEach((item) => {
              let tableItem = {
                assetName: item.asset_name,
                oldUserName: item.old_user,
                newUserName: item.new_user,
                oldStoragePlace: item.old_place,
                newStoragePlace: item.new_place,
                comment: item.comment,
              }
              console.log(tableItem)
              this.tableData.push(tableItem)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    queryAssetUncheck() {
      console.log('查询了')
      this.$http.get('/api/asset/query-asset-uncheck')
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
              }
              this.tableData.push(item)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    check(id, state) {
      this.$http.post('/api/asset/check-asset', {id: id, state: state})
        .then((res) => {
          if (res.status === 200) {
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
    text-align: center;
  }
  .asset-img {
    width: 300px;
    height: 200px;
  }
</style>
<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
