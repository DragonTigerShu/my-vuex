// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Asetes from './common/css/reset.css'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'   // 引入element-ui样式
Vue.use(Vuex)  // 创建Store 实例
import Mock from './mock'

import ElementUI from 'element-ui';
window.Asetes =Asetes

Mock.bootstrap();   // 引入bootstrap 数据

Vue.use(VueRouter)
Vue.use(ElementUI);
// Vue.prototype.$message = Message
// Vue.prototype.$loading = loading

Vue.config.productionTip = false
const store = new Vuex.Store({ // 储存状态值 stroe 至少注入两项 state 和mutation
  state:{    // 状态值改变方法，操作状态值
       count:'',
       name:'oldName',
       async:'true',
       firstName:'舒龙虎',
       lastName:'付雨婷'

  },
  mutations: {  // 提交mutations 更改VUEX状态的唯一方法 commit 改变值
      saync (state) {
         state.async = 'false'  
      },
      updateName (state) {
          state.name = 'newName'
      },
     undateCount (state,{num}) {
         state.count = num;
     },
     updateCountA (state,{num}){
        state.async = num;
       // console.log(state.asyn)
     }
  },
  getters: {  // 在store 定义gettes 接受state 作为其第一的函数
      async(){
          return this.$store.state.async;
      },
      getReverseName:state =>{
          return state.name.split('').reverse().join('')
      },
      fullName (state) {
          return `${state.firstName}+${state.lastName}`
      },
      doneTodos: state => {
        return state.todos.filter(todo => todo.done)
      }
      
  },
  actions:{ // 改变状态值只能通过提交mutations 来完成
    updateNameAsync ({commit,dispatch}){  // 执行mutations 方法 接受dispatch('方法名称');接受
        setTimeout(()=>{
            commit('updateName');
            commit('saync');
        },1000);
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
