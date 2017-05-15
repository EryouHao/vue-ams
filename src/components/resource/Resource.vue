<template>
  <div class="resource">
    <h2>字典管理</h2>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="字典类型">
        <el-select v-model="form.typeId" placeholder="字典类型" props="typeList">
          <el-option label="存放地点" v-for="(type, index) in typeList" :key="index" :label="type.name" :value="type.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字典名称">
        <el-input v-model="form.name" placeholder="字典名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">增加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="type"
        label="字典类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="字典名称">
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
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        typeId: '',
        name: '',
      },
      tableData: [],
      pageSizeChange: [2,3,4],
      currentPage: 1,
      totalCount: 0,
      typeList: [],
    }
  },
  created() {
    this.queryCurrentPageResourceList()
    this.queryResourceTypeList()
  },
  methods: {
    submit() {
      this.$http.post('/api/resource/add', this.form)
        .then((res) => {
          if (res.status === 200) {
            console.log('增加成功')
          }else {
            console.info('增加失败')
          }
        })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryCurrentPageResourceList()
    },
    queryCurrentPageResourceList() {
      this.$http.post('/api/resource/query-resource-list', {
        page: (this.currentPage - 1) * 10,
        size: 10
      }).then((res) => {
        if (res.status === 200) {
          this.totalCount = res.data[0][0].totalCount
          this.tableData = []
          res.data[1].forEach((item) => {
            let obj = {
              id: item.id,
              type: item.type,
              name: item.name
            }
            this.tableData.push(obj)
          })
        }
      })
    },
    queryResourceTypeList() {
      this.$http.get('/api/resource/type-list')
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            res.data.forEach((item) => {
              let obj = {
                id: item.id,
                name: item.name
              }
              this.typeList.push(obj)
            })
          }
        })
    }
  }
}
</script>

<style lang="css">

</style>
