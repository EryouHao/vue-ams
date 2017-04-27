<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <span class="logo">资产管理系统</span>
      </el-col>
      <el-col :span="16">
        <el-menu :router="true" :default-active="this.$router.currentRoute.path" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/addasset" v-if="addasset">资产申报</el-menu-item>
          <el-menu-item index="/queryasset">资产查询</el-menu-item>
          <el-menu-item index="/callasset" v-if="callasset">资产调用</el-menu-item>
          <el-menu-item index="/user" v-if="isAdmin">用户管理</el-menu-item>
          <el-menu-item index="/resource" v-if="isAdmin">字典管理</el-menu-item>
          <el-menu-item index="/personal">个人设置</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-menu mode="horizontal">
          <el-menu-item index="7">{{ username }}</el-menu-item>
          <el-button class="logout" :plain="true" type="danger" @click="logout">退出系统</el-button>
        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { types, auth } from '../../lib/auth'

export default {
  data () {
    return {
      username: JSON.parse(localStorage.user).user_name,
      isAdmin: auth.checkAuth(types.isAdmin),
      addasset: auth.checkAuth(types.addasset),
      callasset: auth.checkAuth(types.callasset)
    }
  },
  created() {
    // isAdmin = localStorage.getItem('right')
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      console.log('执行了')
      this.$http.get('/api/user/logout')
        .then ((res) => {
          console.log('登出了')
          if (res.status === 200) {
            // this.delCookie('hellocookie')
            localStorage.removeItem('user')
            this.$router.push({ path: '/login' })
          }
        })
    },

  }
}
</script>

<style scoped>
  .header {
    box-shadow: 0px 1px 10px #eee;
  }
  .el-menu {
    background: #fff;
  }
  .el-menu-item {
    font-size: 16px;
  }
  .logo {
    display: block;
    height: 60px;
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    background: #fff;
  }
  .logout {
    margin-top: 10px;
  }
</style>
