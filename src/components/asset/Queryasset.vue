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
          <el-button type="primary" @click="queryAssetById">查询</el-button>
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
            <el-button
              size="mini"
              @click="check(id.row.id, 1)">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="check(id.row.id,2)">不通过</el-button>
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
      tableData: [{
        assetName: '联想笔记本',
        userName: '张三',
        assetNumber: '23123214124',
        buyDate: '2017-03-23',
        price: '4999',
        type: '小新700',
        useDirection: '教学',
        leaveNumber: 'DB789787797',
        brand: '上海联想科技有限公司',
        state: 0,
      }, {
        assetName: '联想笔记本',
        userName: '张三',
        assetNumber: '23123214124',
        buyDate: '2017-03-23',
        price: '4999',
        type: '小新700',
        useDirection: '教学',
        leaveNumber: 'DB789787797',
        brand: '上海联想科技有限公司',
        state: 0,
      }, {
        assetName: '联想笔记本',
        userName: '张三',
        assetNumber: '23123214124',
        buyDate: '2017-03-23',
        price: '4999',
        type: '小新700',
        useDirection: '教学',
        leaveNumber: 'DB789787797',
        brand: '上海联想科技有限公司',
        state: 1,
      }]
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
    if (this.right === 'TEACHER') {
      this.queryAssetById()
    } else if (this.right === 'ADMIN') {
      this.queryAssetUncheck()
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
    queryAssetById() {
      console.log('查询了')
      this.$http.get('/api/asset/queryAsset')
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
      this.$http.post('/api/asset/check-asset', {id: id,state: state})
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
