<template>
  <div class="assetadd">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="资产名称">
            <el-input v-model="form.assetName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用人">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="资产编号">
            <el-input v-model="form.assetNumber"></el-input>
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用方向">
            <el-input v-model="form.useDirection"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出厂编号">
            <el-input v-model="form.leaveNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="厂家">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="存放地点">
            <el-input v-model="form.storagePlace"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申购单位">
            <el-select v-model="form.organization" placeholder="请选择申购单位">
              <el-option label="单位一" value="1"></el-option>
              <el-option label="单位二" value="2"></el-option>
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
          <el-form-item label="附件金额">
            <el-input v-model="form.attachAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经费来源">
            <el-select v-model="form.fundId" placeholder="请选择经费来源">
              <el-option label="来源一" value="1"></el-option>
              <el-option label="来源二" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经办人签名">
            <el-input v-model="form.signature"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购组织形式">
            <el-select v-model="form.orgId" placeholder="请选择采购组织形式">
              <el-option label="形式一" value="1"></el-option>
              <el-option label="形式二" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.mark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="数量">
            <el-input v-model="form.count"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="资产图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
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
        assetName: '戴尔T430',
        userName: '郝二优',
        assetNumber: 1,
        bill: 'FP001',
        buyDate: '2017-01-01',
        price: 4999,
        type: '',
        standard: '',
        leaveDate: '2017-01-01',
        submitDate: '2017-01-01',
        useDirection: '',
        leaveNum: '',
        brand: '',
        storagePlace: '',
        organization: '',
        purchaser: '',
        attachNum: 10,
        attachAmount: 2.3,
        signature: '',
        fundId: 3,
        orgId: 1,
        mark: '',
        count: '',
        imgUrl: '',
        state: 0 // 资产状态，申请中为0
      },
      dialogImageUrl: '',
      dialogVisible: false
    };
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
      this.imgUrl = file.url;
      this.dialogVisible = true;
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
      this.$http.post('/api/asset/addAsset', this.form)
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
</style>
