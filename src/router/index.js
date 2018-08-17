import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/404.vue'
import Login from '@/views/login'
import Table from '@/views/nav1/Table.vue'
import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '',
      component: Login,
      hidden: true
    },
    {
      path:'/404',
      component:NotFound,
      name:'',
      hidden: true
      
    },
    {
      path:'/',
      component:Home,
      name:'导航一',
      iconCls: 'el-icon-message',//图标样式class
      children:[
         {
           path:'/main',component:Main,name:'主页'
         },
         {
           path:'/table',component:Table,name:'Table'
         }
      ]
    }
  ]
})
