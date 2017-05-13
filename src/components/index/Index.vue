<template>
  <div class="index">
    <v-header></v-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
// import vSidebar from '../common/SideBar'
import vHeader from '../common/Header'
import vFooter from '../common/Footer'

export default {
  data () {
    return {
      msg: 'Hello index'
    }
  },
  components: {
    vHeader: vHeader,
    vFooter: vFooter
  },
  created () {
//    this.$http.get('/api/user/')
//      .then((res) => {
//
//      }, (err) => {
//        this.$router.push({ path: '/login' })
//      })
  }
}
</script>

<style scoped>
  .index {
    display: flex;
    flex-flow: column;
	  min-height: 100vh;
  }
  .content {
    width: 1200px;
    flex: 1;
    margin: 10px auto;
    padding: 50px 50px 80px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 40px #eee;
  }
</style>
