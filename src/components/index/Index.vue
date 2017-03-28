<template>
  <div class="index">
    <v-header></v-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import vSidebar from '../common/SideBar'
import vHeader from '../common/Header'

export default {
  data () {
    return {
      msg: 'Hello index'
    }
  },
  components: {
    vHeader: vHeader
  }
}
</script>

<style scoped>
  .content {
    max-width: 1200px;
    margin: 10px auto;
    padding: 50px 50px 80px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 40px #eee;
  }
</style>
