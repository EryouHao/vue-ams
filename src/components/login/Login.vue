<template>
  <div class="login">
    <h2 class="title">资产管理系统</h2>
    <el-form ref="form" :model="form" label-width="">
      <el-form-item label="">
        <el-input type="text" v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="password" v-model="form.password" placeholder="密码" @keyup.native.enter="login"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      login() {
        this.$http.post('/api/user/login', {
          username: this.form.username,
          password: this.form.password
        }).then ((res) => {
          if (res.status === 200 && res.data.status !== 404) {
            console.log(res)
            localStorage.setItem('user', JSON.stringify(res.data[0]))
            this.$router.push({ path: '/dashboard' })
            this.$message({
              type: 'success',
              message: '登录成功，欢迎您！'
            })
          } else {
            this.$message({
              type: 'error',
              message: '登录失败，请检查用户名或密码！'
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
  .login {
    width: 400px;
    padding: 50px;
    border-radius: 5px;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -180px;
    box-shadow: 0 0 40px #eee;
  }
  .title {
    text-align: center;
    margin-bottom: 40px;
  }
  .el-button {
    width: 100%;
  }
</style>
