<template>
  <div class="user">
    <div class="title-content">
      <h2 class="title">用户列表</h2>
      <el-button class="btn-add" type="default" @click="toggleAddUser" >新增用户</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="account"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="right"
        label="权限">
      </el-table-column>
      <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          icon="edit"
          @click=""></el-button>
        <el-button
          size="small"
          type="danger"
          icon="delete"
          @click="confirmMsg"></el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="add-content" v-show="showAddUser">
      <div class="header">
        <span class="title">新增用户</span>
        <el-button class="btn-close" type="text" icon="close" @click="toggleAddUser"></el-button>
      </div>
      <div class="body">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="账户名">
            <el-input v-model="form.accountName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirmpass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="default" @click="toggleAddUser">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mask" v-show="showAddUser"></div>
  </div>
</template>

<script lang="babel">
export default {
  data () {
    return {
      form: {
        name: '',
        mobile: '',
        accountName: '',
        password: '',
        confirmpass: '',
      },
      showAddUser: false,
      tableData: [{
        account: 'haoeryou@qq.com',
        name: '张三',
        mobile: '15733296572',
        right: '管理员',
      }, {
        account: 'fehey@qq.com',
        name: '李四',
        mobile: '15733296577',
        right: '老师',
      }],
    }
  },
  methods: {
    addUser() {

    },
    toggleAddUser () {
      this.showAddUser = !this.showAddUser;
    },
    confirmMsg() {
      this.$confirm('您确定要删除此用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>

<style scoped>
  .title {
    float: left;
  }
  .btn-add {
    float: right;
    margin-top: 15px;
  }
  .add-content {
    width: 600px;
    min-height: 400px;
    border-radius: 5px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -200px;
    margin-left: -300px;
    z-index: 1000;
  }
  .add-content .header {
    height: 60px;
    line-height: 60px;
    padding: 10px 20px;
    position: relative;
  }
  .add-content .header .title {
    font-size: 18px;
  }
  .add-content .header .btn-close {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .add-content .body {
    padding: 20px 60px;
  }
  .mask {
    display: block;
    content: '';
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
</style>
