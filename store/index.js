import  Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)  // 创建Store 实例

const store = new Vuex.Store({ // 储存状态值 stroe 至少注入两项 state 和mutation
    state:{    // 状态值改变方法，操作状态值
         count : 1,
         name:'oldName'
    },
    mutations: {  // 提交mutations 更改VUEX状态的唯一方法
        add(state){
            state.count++;
        },
        reduce(state){
            state.count--;
        },
        updateName (state) {
            state.name = 'newName'
        }
    },
    getters: {  // 在store 定义gettes 接受state 作为其第一的函数
        getName(){
            return this.$store.state.name;
        }
    },
    actions:{ // 改变状态值只能通过提交mutations 来完成

    }
})

new Vue({
    el:'#app',
    template:'<App/>',
    components:{ App },
    store
})