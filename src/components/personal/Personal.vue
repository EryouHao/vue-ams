<template>
  <div class="personal-content">
    <h2>修改信息</h2>
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="form.newPass"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPass">
          <el-input v-model="form.confirmPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="babel">
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.confirmPass !== '') {
          this.$refs.form.validateField('confirmPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: JSON.parse(localStorage.user).user_name,
        mobile: JSON.parse(localStorage.user).user_mobile,
        password: '',
        newPass: '',
        confirmPass: '',
      },
      rules: {
        newPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.post('/api/user/update-user-info', this.form)
            .then((res) => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
              }
            }).catch((err) => {
              console.log(err)
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
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
