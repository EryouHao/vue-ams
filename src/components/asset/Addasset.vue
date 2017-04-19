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
            <el-input v-model="form.id"></el-input>
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
              <el-date-picker type="date" placeholder="选择日期" v-model="form.buyDate" style="width: 100%;"></el-date-picker>
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
            <el-input v-model="form.standard"></el-input>
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
            <el-input v-model="form.organization"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申购单位">
            <el-select v-model="form.organization" placeholder="请选择申购单位">
              <el-option label="单位一" value="shanghai"></el-option>
              <el-option label="单位二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购买人">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="附件金额">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经费来源">
            <el-select v-model="form.region" placeholder="请选择申购单位">
              <el-option label="单位一" value="shanghai"></el-option>
              <el-option label="单位二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经办人签名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购组织形式">
            <el-select v-model="form.region" placeholder="请选择申购单位">
              <el-option label="形式一" value="shanghai"></el-option>
              <el-option label="形式二" value="beijing"></el-option>
            </el-select>
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
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="saveForm">保存</el-button>
        <el-button @click="show">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        count: ''
      },
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    show() {
      console.log(this.form)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 测试中文注释
    saveForm() {
      if (this.form.count > 1) {
        console.log(this.form.count)
      }
      console.log(this.form)
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
