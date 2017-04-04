<template>
  <div class="login">
    <h2 class="title">资产管理系统</h2>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="用户名">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" @keyup.native.enter="login"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sub()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import api from '../axios'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapActions({
      UserLogin: 'UserLogin',
    })
  },
  methods: {
    login() {
      console.log(this.form.username)
      console.log(this.form.password)
      this.$http.post('/api/user/login', {
        username: this.form.username,
        password: this.form.password
      }).then ((res) => {
        // console.log(res)
        console.log(res.body)
        console.log(res.config.data)
        // console.log(res.code)
        // console.log(this.$router)
        if (res.status === 200) {
          this.$router.push({ path: '/' })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    sub() {
      console.log(this.form)
      this.$store.dispatch('UserLogin', this.form)
    }
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