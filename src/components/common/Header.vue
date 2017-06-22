<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <span class="logo"><img class="logo-img" src="/static/images/logo.png" alt="">资产管理系统</span>
      </el-col>
      <el-col :span="16">
        <el-menu :router="true" :default-active="this.$router.currentRoute.path" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/dashboard">首页</el-menu-item>
          <el-menu-item index="/query-all-asset" v-if="isAdmin">资产总览</el-menu-item>
          <el-menu-item index="/queryasset" v-if="isAdmin">申报审核</el-menu-item>
          <el-menu-item index="/queryasset" v-if="!isAdmin">资产查询</el-menu-item>
          <el-menu-item index="/addasset" v-if="addasset">资产申报</el-menu-item>
          <el-menu-item index="/callasset" v-if="callasset">资产调用</el-menu-item>
          <el-menu-item index="/callasset-check" v-if="isAdmin">调用审核</el-menu-item>
          <el-menu-item index="/user" v-if="isAdmin">用户管理</el-menu-item>
          <el-menu-item index="/resource" v-if="isAdmin">字典管理</el-menu-item>
          <el-menu-item index="/personal">个人设置</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-menu mode="horizontal">
          <el-menu-item index="7" class="is-active">{{ username }}</el-menu-item>
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
    },
    logout() {
      this.$http.get('/api/user/logout')
        .then ((res) => {
          if (res.status === 200) {
            // this.delCookie('hellocookie')
            localStorage.removeItem('user')
            this.$router.push({ path: '/login' })
            this.$message({
              type: 'success',
              message: '登出成功，祝您工作愉快！'
            })
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
    vertical-align: center;
    position: relative;
  }
  .logo-img {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 26px;
    top: 13px;
  }
  .logout {
    margin-top: 10px;
  }
</style>
