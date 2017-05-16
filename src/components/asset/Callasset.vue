<template>
  <div class="callasset">
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
          <el-button type="primary" @click="">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-content">
      <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
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
          prop="leaveNumber"
          label="出厂编号">
        </el-table-column>
        <el-table-column
          prop="brand"
          label="厂家">
        </el-table-column>
      </el-table>
      <el-form class="form2" ref="form2" :model="form2" label-width="120px">
        <el-form-item label="新使用人" props="users">
          <el-select v-model="form2.newUserId" placeholder="请选择使用人">
            <el-option v-for="(user, index) in users" :key="index" :label="user.name" :value="user.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新存放地点" props="storagePlaces">
          <el-select v-model="form2.newStoragePlace" placeholder="请选择存放地点" filterable>
            <el-option v-for="(sp, index) in storagePlaces" :key="index" :label="sp.name" :value="sp.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更改理由备注">
          <el-input type="textarea" v-model="form2.comment"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
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
      form2: {
        newUserId: '',
        newStoragePlace: '',
        comment: '',
      },
      tableData: [],
      selectList: [],
      users: [],
      storagePlaces: [],
    }
  },
  computed: {
    selectIdList() {
      let idList = []
      this.selectList.forEach((asset) => {
        idList.push(asset.id)
      })
      return idList
    },
  },
  created() {
    this.queryAssetById()
    this.queryUserList()
    this.queryStoragePlace()
  },
  methods: {
    formatDate(date) {
      return date.substring(0, 10)
    },
    handleSelectionChange(val) {
      this.selectList = val;
      console.log(this.selectList)
    },
    // 填充使用人列表
    queryUserList() {
      this.$http.get('/api/user/queryUserList')
        .then((res) => {
          if (res.status === 200) {
            res.data.forEach((item) => {
              let user = {
                id: item.id,
                name: item.user_name
              }
              this.users.push(user)
            })
          }
        })
    },
    queryStoragePlace() {
      this.$http.get('/api/resource/queryStoragePlace')
        .then((res) => {
          if (res.status === 200) {
            res.data.forEach((item) => {
              let place = {
                id: item.id,
                name: item.name
              }
              this.storagePlaces.push(place)
            })
          }
        })
    },
    queryAssetById() {
      console.log('查询了')
      this.tableData = []
      this.$http.get('/api/asset/query-uncall')
        .then((res) => {
          if (res.status === 200) {
            console.log(res)
            res.data.forEach((asset) => {
              let item = {
                id: asset.id,
                assetName: asset.asset_name,
                userName: asset.user_name,
                userId: asset.user_id,
                assetNumber: asset.asset_number,
                bill: asset.asset_bill,
                buyDate: this.formatDate(asset.buy_date),
                price: asset.asset_price,
                type: asset.asset_type,
                useDirection: asset.asset_usedirection,
                leaveNumber: asset.asset_leavenum,
                brand: asset.asset_brand,
              }
              this.tableData.push(item)
            })
            console.log(this.tableData)
          }
          console.log(this.tableData)
        }).catch((err) => {
          console.log(err)
        })
    },
    submit() {
      const form = {
        selectIdList: this.selectIdList,
        newUserId: this.form2.newUserId,
        newStoragePlace: this.form2.newStoragePlace,
        comment: this.form2.comment
      }
      console.log(form)

      // 根据 indexOf 求出所选资产的 index
      // TODO...
      const self = this
      this.$http.post('/api/call/call-asset', form)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '申请成功'
            })
            self.queryAssetById()
          } else {
            this.$message({
              type: 'success',
              message: '申请失败'
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
  .form2 {
    padding: 40px 0;
  }
</style>
