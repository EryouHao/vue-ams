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
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="accountName"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="right"
        label="角色">
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
          <el-form-item label="角色">
            <el-select v-model="form.right" placeholder="请选择角色">
              <el-option label="管理员" value="0"></el-option>
              <el-option label="老师" value="1"></el-option>
              <el-option label="实验室" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirmPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">保存</el-button>
            <el-button type="default" @click="toggleAddUser">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mask" v-show="showAddUser"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        mobile: '',
        accountName: '',
        right: '',
        password: '',
        confirmPass: '',
      },
      showAddUser: false,
      tableData: [],
    }
  },
  created() {
    this.queryAllUser();
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
    },
    addUser() {
      console.log('执行了添加用户')
      this.$http.post('/api/user/addUser', {
        username: this.form.name,
        mobile: this.form.mobile,
        accountName: this.form.accountName,
        right: this.form.right,
        password: this.form.password,
      }).then ((res) => {
        if (res.status === 200) {
          this.$router.push({ path: '/' })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    queryAllUser() {
      console.log('执行了查询所有用户')
      this.$http.get('/api/user/queryAllUser')
        .then((res) => {
          if (res.status === 200) {
            console.log('查询成功了')
            res.data.forEach((user) => {
              let tmp = {
                name: user.user_name,
                accountName: user.user_account,
                mobile: user.user_mobile,
                right: user.right_id
              }
              this.tableData.push(tmp)
            })
//            this.tableData = res.data;
            console.log(this.tableData)
//            console.log(res)
          }
        }).catch((err) => {
          console.log(err)
      })
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
