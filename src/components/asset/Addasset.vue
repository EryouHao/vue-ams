<template>
  <div class="assetadd">
    <el-form ref="form" :model="form" label-width="120px" enctype="multipart/form-data">
      <el-row>
        <el-col :span="12">
          <el-form-item label="资产名称">
            <el-input v-model="form.assetName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用人" props="users">
            <el-select v-model="form.userId" placeholder="请选择使用人">
              <el-option v-for="(user, index) in users" :key="index" :label="user.name" :value="user.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!--<el-col :span="12">
          <el-form-item label="资产编号">
            <el-input v-model="form.assetNumber"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="使用方向">
            <el-input v-model="form.useDirection"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票号">
            <el-input v-model="form.bill"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="购置日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.buyDate"
                style="width: 100%;">
              </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单价">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="型号">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格">
            <el-input v-model="form.standard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出厂日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.leaveDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建账日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.submitDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="出厂编号">
            <el-input v-model="form.leaveNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="厂家">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="存放地点" props="storagePlaces">
            <el-select v-model="form.storagePlace" placeholder="请选择存放地点" filterable>
              <el-option v-for="(sp, index) in storagePlaces" :key="index" :label="sp.name" :value="sp.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申购单位" props="buyers">
            <el-select v-model="form.buyer" placeholder="请选择申购单位">
              <el-option v-for="(buyer, index) in buyers" :key="index" :label="buyer.name" :value="buyer.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购买人">
            <el-input v-model="form.purchaser"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="附件数">
            <el-input v-model="form.attachNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="附件金额">
            <el-input v-model="form.attachAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经费来源" props="funds">
            <el-select v-model="form.fundId" placeholder="请选择经费来源">
              <el-option v-for="(fund, index) in funds" :key="index" :label="fund.name" :value="fund.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经办人签名">
            <el-input v-model="form.signature"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购组织形式" props="organization">
            <el-select v-model="form.orgId" placeholder="请选择采购组织形式">
              <el-option v-for="(org, index) in organization" :key="index" :label="org.name" :value="org.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input v-model="form.mark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="数量">
            <el-input v-model="form.count"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="资产图片">
            <el-upload
              ref="upload"
              action="http://localhost:4001/api/upload/upload-img"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              name="avatar"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="form.imgUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="show">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      form: {
        assetName: '',
        userId: '',
        assetNumber: '',
        bill: '',
        buyDate: '',
        price: '',
        type: '',
        standard: '',
        leaveDate: '',
        submitDate: '',
        useDirection: '',
        leaveNum: '',
        brand: '',
        storagePlace: '',
        buyer: '',
        purchaser: '',
        attachNum: '',
        attachAmount: '',
        signature: '',
        fundId: '',
        orgId: '',
        mark: '',
        count: '',
        imgUrl: '',
        state: 0, // 资产状态，申请中为0
        calling: 0 // 是否正在调用，默认为否
      },
      users: [], // 使用人列表
      storagePlaces: [],
      funds: [],
      organization: [],
      buyers: [],
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  created() {
    this.queryUserList()
    this.queryStoragePlace()
    this.queryFunds()
    this.queryOrganization()
    this.queryBuyer()
  },
  methods: {
    show() {
      console.log(this.form)
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file)
      // this.form.imgUrl = file.url;
      this.dialogVisible = true;

    },
    uploadSuccess(res, file, fileList) {
      console.log(res)
      console.log('file对象为')
      console.log(file)
      this.form.imgUrl = res.path
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
              let obj = {
                id: item.id,
                name: item.name
              }
              this.storagePlaces.push(obj)
            })
          }
        })
    },
    queryFunds() {
      this.$http.get('/api/resource/query-funds')
        .then((res) => {
          if (res.status === 200) {
            res.data.forEach((item) => {
              let obj = {
                id: item.id,
                name: item.name
              }
              this.funds.push(obj)
            })
          }
        })
    },
    queryOrganization() {
      this.$http.get('/api/resource/query-organization')
        .then((res) => {
          if (res.status === 200) {
            res.data.forEach((item) => {
              let obj = {
                id: item.id,
                name: item.name
              }
              this.organization.push(obj)
            })
          }
        })
    },
    queryBuyer() {
      this.$http.get('/api/resource/query-buyer')
        .then((res) => {
          if (res.status === 200) {
            res.data.forEach((item) => {
              let obj = {
                id: item.id,
                name: item.name
              }
              this.buyers.push(obj)
            })
          }
        })
    },
    // 测试中文注释
    submit() {
      this.form.buyDate = this.formatDate(this.form.buyDate)
      this.form.leaveDate = this.formatDate(this.form.leaveDate)
      this.form.submitDate = this.formatDate(this.form.submitDate)
      if (this.form.count > 1) {
        console.log(this.form.count)
      }
      console.log(this.form)
      // this.$refs.upload.submit() // 上传图片
      this.$http.post('/api/asset/add', this.form)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '资产添加成功！'
            })
          } else {
            this.$message({
              type: 'info',
              message: '资产添加失败！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '资产添加失败了!'
          })
        })
    }
  }
}
</script>

<style scoped>
  .assetadd {
    width: 800px;
    margin: 0 auto;
  }
  .el-select {
    width: 100%;
  }
</style>
