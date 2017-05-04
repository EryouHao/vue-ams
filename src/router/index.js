import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import Login from '@/components/login/Login'
import Addasset from '@/components/asset/Addasset'
import Queryasset from '@/components/asset/Queryasset'
import QueryAllAsset from '@/components/asset/QueryAllAsset'
import Callasset from '@/components/asset/Callasset'
import CallassetCheck from '@/components/asset/CallassetCheck'
import User from '@/components/user/User'
import Resource from '@/components/resource/Resource'
import Personal from '@/components/personal/Personal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    }
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      component: Index,
      children: [{
        path: '/addasset',
        component: Addasset
      },
      {
        path: '/queryasset',
        component: Queryasset
      },
      {
        path: '/query-all-asset',
        component: QueryAllAsset
      },
      {
        path: '/callasset',
        component: Callasset
      },
      {
        path: '/callasset-check',
        component: CallassetCheck
      },
      {
        path: '/user',
        component: User,
        // meta: {requiresAuth: true}
      },
      {
        path: '/resource',
        component: Resource,
      },
      {
        path: '/personal',
        component: Personal
      },]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
})
