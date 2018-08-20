import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/404.vue'
import Login from '@/views/login'
import Table from '@/views/nav1/Table.vue'
import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'
import Form from '@/views/nav1/Form.vue'
import user from '@/views/nav1/user.vue'
import Page4 from '@/views/nav2/Page4.vue'
import Page5 from '@/views/nav2/Page5.vue'
import Page6 from '@/views/nav3/Page6.vue'
import Charts from '@/views/charts/Charts.vue'

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
           path:'/main',component:Main,name:'主页',hidden:true
         },
         {
           path:'/table',component:Table,name:'Table'
         },
         {
          path: '/form', component: Form, name: 'Form'
         },{
           path: '/user', component: user, name: 'user'
         }
      ]
    },
    {
      path:'/',
      component:Home,
      name:'导航二',
      iconCls:'fa fa-id-card-o',
      children:[
        {path:'/page4',component:Page4, name :'页面4'},
        {path:'/page5',component:Page5,name:'页面5'}
      ]
    },
    {
      path:'/',
      component:Home,
      name:'导航三',
      iconCls:'fa fa-address-card',
      leaf:true, // 只有一个节点
      children:[
        {
          path:'/page6',component:Page6,name:'导航三'
        }
      ]
    },{
      path:'/',
      component:Home,
      name:'Charts',
      iconCls:'fa fa-bar-char',
      children:[{
        path:'/charts',component:Charts,name:'echarts'
      }]
    },
    {
      path:'*',
      hidden:true,
      redirect: {
        path:'/404'
      }
    }

  ]
})
