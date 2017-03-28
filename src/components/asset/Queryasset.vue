<template>
  <div class="query-asset">
    <div class="query-content">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="资产名称">
          <el-input v-model="form.assetName"></el-input>
        </el-form-item>
        <el-form-item label="存放地点">
          <el-select v-model="form.address" placeholder="存放地点">
            <el-option label="C1-202" value="shanghai"></el-option>
            <el-option label="C1-209" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-content">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="assetName"
        label="资产名称">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="使用人">
      </el-table-column>
      <el-table-column
        prop="zcbh"
        label="资产编号">
      </el-table-column>
      <el-table-column
        prop="gzrq"
        label="购置日期">
      </el-table-column>
      <el-table-column
        prop="dj"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="xh"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="syfx"
        label="使用方向">
      </el-table-column>
      <el-table-column
        prop="ccbh"
        label="出厂编号">
      </el-table-column>
      <el-table-column
        prop="cj"
        label="厂家">
      </el-table-column>
    </el-table>
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
      tableData: [{
        assetName: '联想笔记本',
        userName: '张三',
        zcbh: '23123214124',
        gzrq: '2017-03-23',
        dj: '4999',
        xh: '小新700',
        syfx: '教学',
        ccbh: 'DB789787797',
        cj: '上海联想科技有限公司',
      }, {
        assetName: '联想笔记本',
        userName: '张三',
        zcbh: '23123214124',
        gzrq: '2017-03-23',
        dj: '4999',
        xh: '小新700',
        syfx: '教学',
        ccbh: 'DB789787797',
        cj: '上海联想科技有限公司',
      }, {
        assetName: '联想笔记本',
        userName: '张三',
        zcbh: '23123214124',
        gzrq: '2017-03-23',
        dj: '4999',
        xh: '小新700',
        syfx: '教学',
        ccbh: 'DB789787797',
        cj: '上海联想科技有限公司',
      }]
    }
  }
}
</script>

<style scoped>
  .query-content {
    text-align: center;
  }
</style>
