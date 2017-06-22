<template>
  <div class="callasset-check">
    <h2>待审列表</h2>
    <div class="result-content">
      <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="资产名称">
                <span>{{ props.row.assetName }}</span>
              </el-form-item>
              <el-form-item label="原使用人">
                <span>{{ props.row.oldUserName }}</span>
              </el-form-item>
              <el-form-item label="新使用人">
                <span>{{ props.row.newUserName }}</span>
              </el-form-item>
              <el-form-item label="原存放地点">
                <span>{{ props.row.oldStoragePlace }}</span>
              </el-form-item>
              <el-form-item label="新存放地点">
                <span>{{ props.row.newStoragePlace }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="assetName"
          label="资产名称">
        </el-table-column>
        <el-table-column
          prop="oldUserName"
          label="原使用人">
        </el-table-column>
        <el-table-column
          prop="newUserName"
          label="新使用人">
        </el-table-column>
        <el-table-column
          prop="oldStoragePlace"
          label="原存放地点">
        </el-table-column>
        <el-table-column
          prop="newStoragePlace"
          label="新存放地点">
        </el-table-column>
        <el-table-column
          prop="id"
          label="操作">
          <template scope="id">
            <el-button-group>
              <el-button :plain="true" type="primary" size="small" icon="check" @click="check(id.$index, id.row.id, 'PASS')"></el-button>
              <el-button :plain="true" type="danger" size="small" icon="close" @click="confirmReject(id.$index, id.row.id, 'REJECT')"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          small
          v-if="totalCount > 10"
          layout="prev, pager, next"
          :total="totalCount"
          :current-page="currentPage"
          :page-sizes="pageSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
export default {
  data () {
    return {
      form: {
        assetName: '',
        address: '',
      },
      tableData: [],
      pageSizeChange: [2,3,4],
      currentPage: 1,
      totalCount: 0,
    }
  },
  created() {
    this.queryCallList()
  },
  methods: {
    formatDate(date) {
      return date.substring(0, 10)
    },
    formatState(state) {
      if (state === 0) {
        return '在审'
      } else if (state === 1) {
        return '已通过'
      } else {
        return '未通过'
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryCallList()
    },
    queryCallList() {
      this.$http.post('/api/call/query-call-list', {
        page: (this.currentPage - 1) * 10,
        size: 10
      }).then((res) => {
          if (res.status === 200) {
            this.totalCount = res.data[0][0].totalCount
            this.tableData = []

            res.data[1].forEach((item) => {
              let tableItem = {
                assetName: item.asset_name,
                oldUserName: item.old_user,
                newUserName: item.new_user,
                oldStoragePlace: item.old_place,
                newStoragePlace: item.new_place,
                comment: item.comment,
                id: item.id
              }
              this.tableData.push(tableItem)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    check(index, id, state) {
      this.$http.post('/api/call/check-call', {id: id, state: state})
        .then((res) => {
          if (res.status === 200) {
            this.tableData.splice(index, 1);
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          } else {
            this.$message({
              type: 'danger',
              message: '操作失败'
            })
          }
        })
    },
    confirmReject(index, id, state) {
      this.$confirm('您确定要拒绝此调用申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.check(index, id, state)
        this.$message({
          type: 'success',
          message: '已拒绝调用申请'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    },
  }
}
</script>

<style scoped>
  .query-content {
    text-align: center;
  }
  .page {
    margin: 20px auto 40px;
    text-align: center;
  }
  .asset-img {
    width: 300px;
    height: 200px;
  }
</style>
<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
