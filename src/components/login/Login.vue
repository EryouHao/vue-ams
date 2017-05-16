<template>
  <div class="login-wrapper">
    <div class="login">
      <img class="logo" src="/static/images/logo.png" alt="">
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
    <div class="bg"></div>
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
    width: 220px;
    padding: 50px;
    border-radius: 10px;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-left: -160px;
    margin-top: -220px;
    box-shadow: 2px 8px 31px 0 #dbdbdb;
  }
  .title {
    text-align: center;
    margin-bottom: 40px;
  }
  .el-button {
    width: 100%;
  }
  .logo {
    width: 80px;
    height: 80px;
  }
  .bg {
    background: linear-gradient(to bottom, #e9f2f9, #f3eee8);
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>
