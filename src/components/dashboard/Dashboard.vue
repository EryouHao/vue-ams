<template>
  <div class="dashboard">
    <h2>资产概览</h2>
    <div class="statistics">
      <el-row v-if="!isLab">
        <el-col :span="8">
          <div class="item">
            系统资产总数<br>
            <span class="number">{{ assetCount }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            待审申报资产<br>
            <span class="number">{{ unCheckAssetCount }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            待审调用资产<br>
            <span class="number">{{ callAssetCount }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="isLab">
        <el-col :span="8">
          <div class="item">
            实验室存放资产<br>
            <span class="number">{{ callAssetCount }}</span>
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
      assetCount: '0',
      unCheckAssetCount: '0',
      callAssetCount: '0',
      right: 1,
      isLab: false, // 是否是实验室人员
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
  created() {
    this.right = JSON.parse(localStorage.user).right_id
    if (this.right === 0) { // 管理员
      this.queryAllAssetCount()
    } else if (this.right === 1) {
      this.queryPersonAssetCount()
    } else if (this.right === 2) {
      this.isLab = true
      this.queryLabAssetCount()
    }
  },
  methods: {
    queryAllAssetCount() {
      this.$http.get('/api/asset/query-all-asset-count')
        .then((res) => {
          if (res.status === 200) {
            this.assetCount = res.data[0][0].assetCount
            this.unCheckAssetCount = res.data[1][0].unCheckAssetCount
            this.callAssetCount = res.data[2][0].callAssetCount
            console.log(res.data)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    queryPersonAssetCount() {
      this.$http.get('/api/asset/query-person-asset-count')
        .then((res) => {
          if (res.status === 200) {
            this.assetCount = res.data[0][0].assetCount
            this.unCheckAssetCount = res.data[1][0].unCheckAssetCount
            this.callAssetCount = res.data[2][0].callAssetCount
            console.log(res.data)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    queryLabAssetCount() {

    }
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
