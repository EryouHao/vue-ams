<template>
  <el-table-column type="expand" class="demo-table">
    <template scope="props">
      <el-form label-position="left" inline class="table-expand">
        <el-form-item label="资产名称">
          <span>{{ props.row.assetName }}</span>
        </el-form-item>
        <el-form-item label="使用人">
          <span>{{ props.row.userName }}</span>
        </el-form-item>
        <el-form-item label="资产编号">
          <span>{{ props.row.assetNumber }}</span>
        </el-form-item>
        <el-form-item label="发票">
          <span>{{ props.row.bill }}</span>
        </el-form-item>
        <el-form-item label="购置日期">
          <span>{{ props.row.buyDate }}</span>
        </el-form-item>
        <el-form-item label="单价">
          <span>{{ props.row.price }}</span>
        </el-form-item>
        <el-form-item label="型号">
          <span>{{ props.row.type }}</span>
        </el-form-item>
        <el-form-item label="规格">
          <span>{{ props.row.standard }}</span>
        </el-form-item>
        <el-form-item label="出厂日期">
          <span>{{ props.row.leaveDate }}</span>
        </el-form-item>
        <el-form-item label="使用方向">
          <span>{{ props.row.useDirection }}</span>
        </el-form-item>
        <el-form-item label="出厂编号">
          <span>{{ props.row.leaveNumber }}</span>
        </el-form-item>
        <el-form-item label="厂家">
          <span>{{ props.row.brand }}</span>
        </el-form-item>
        <el-form-item label="存放地点">
          <span>{{ props.row.storagePlace }}</span>
        </el-form-item>
        <el-form-item label="申购单位">
          <span>{{ props.row.buyer }}</span>
        </el-form-item>
        <el-form-item label="购买人">
          <span>{{ props.row.purchaser }}</span>
        </el-form-item>
        <el-form-item label="附件数">
          <span>{{ props.row.attachNum }}</span>
        </el-form-item>
        <el-form-item label="附件金额">
          <span>{{ props.row.attachAmount }}</span>
        </el-form-item>
        <el-form-item label="经费来源">
          <span>{{ props.row.funds }}</span>
        </el-form-item>
        <el-form-item label="经办人">
          <span>{{ props.row.signature }}</span>
        </el-form-item>
        <el-form-item label="采购组织形式">
          <span>{{ props.row.organization }}</span>
        </el-form-item>
        <el-form-item label="资产图片">
          <img :src="props.row.imgUrl" class="asset-img" alt="资产图片">
        </el-form-item>
      </el-form>
    </template>
  </el-table-column>

</template>

<script lang="babel">
export default {
  data () {
    return {
    }
  },
}
</script>

<style scoped>
  .query-content {
    text-align: center;
  }
  .page {
    margin: 20px auto 40px;
    text-align: right;
  }
  .asset-img {
    width: 300px;
    height: 200px;
  }
</style>

<style>
  .el-table__expanded-cell .table-expand {
    font-size: 0;
  }
  .el-table__expanded-cell .table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .el-table__expanded-cell .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
