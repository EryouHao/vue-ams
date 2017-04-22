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
        prop="leaveNumber"
        label="出厂编号">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="厂家">
      </el-table-column>
    </el-table>
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
      }]
    }
  },
  created() {
    this.queryAssetById()
  },
  methods: {
    formatDate(date) {
      return date.substring(0, 10)
    },
    queryAssetById() {
      console.log('查询了')
      this.$http.get('/api/asset/queryAsset')
        .then((res) => {
          if (res.status === 200) {
            res.data.forEach((asset) => {
              let item = {
                id: asset.id,
                assetName: asset.asset_name,
                userName: '',
                assetNumber: asset.asset_number,
                buyDate: this.formatDate(asset.buy_date),
                price: asset.asset_price,
                type: asset.asset_type,
                useDirection: asset.asset_usedirection,
                leaveNumber: asset.asset_leavenum,
                brand: asset.asset_brand
              }
              this.tableData.push(item)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    },
  }
}
</script>

<style scoped>
  .query-content {
    text-align: center;
  }
</style>
