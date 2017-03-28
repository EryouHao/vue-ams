<template>
  <div class="personal-content">
    <h2>修改信息</h2>
    <div class="content">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPass"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
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
        name: '',
        password: '',
        newPass: '',
        confirmPass: '',
      }
    }
  }
}
</script>

<style scoped>
  .personal-content {
  }
  .personal-content .content {
    width: 600px;
    margin: 50px auto;
  }
</style>
