<template>
  <div class="resource">
    <h2>字典管理</h2>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="字典类型">
        <el-select v-model="form.type" placeholder="字典类型">
          <el-option label="存放地点" value="storage_place"></el-option>
          <el-option label="申购单位" value="organization"></el-option>
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
        prop="date"
        label=""
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        type: '',
        name: '',
      }
    }
  },
  methods: {
    submit() {

    },
  }
}
</script>

<style lang="css">

</style>
