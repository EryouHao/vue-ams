<template>
  <div class="dashboard">
    <h2>资产概览</h2>
    <div class="statistics">
      <el-row>
        <el-col :span="8">
          <div class="item">
            系统资产总数<br>
            <span class="number">1206</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            待审申报资产<br>
            <span class="number">35</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            待审调用资产<br>
            <span class="number">12</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <h2>最新动态</h2>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="申请时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="申请人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="assetName"
        label="资产名称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="申请类别">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'hello',
      tableData: [
        {
          date: '2017-05-01',
          name: '张三',
          assetName: '戴尔T430',
          type: '资产申报',
        },
        {
          date: '2017-04-27',
          name: '李四',
          assetName: '得力打印机',
          type: '资产调用',
        },
        {
          date: '2017-04-15',
          name: '张三',
          assetName: '戴尔T430',
          type: '资产申报',
        },
        {
          date: '2017-03-22',
          name: '李四',
          assetName: '圆凳',
          type: '资产申报',
        },
      ]
    };
  },
  methods: {
  }
}
</script>

<style scoped>
  .statistics .item{
    box-shadow: 0px 0px 50px #eee;
    border-radius: 5px;
    margin: 30px;
    padding: 20px;
    font-size: 18px;
    line-height: 30px;
  }
  .number {
    color: #20a0ff;
    font-size: 28px;
  }
</style>
