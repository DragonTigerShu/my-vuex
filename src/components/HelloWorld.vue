<template>
  <div class="hello">
    {{getName}}
    
     <button @click="changeName" value="更名">更名</button>
     <h3>中国火车售票系统{{async}}{{count}}</h3>
     <div @click="rename">click{{fullName}}</div>
     {{getAsync}}
     <!-- <div @click="Async">ture</div>
     <h3 @click="updateCountAsync">ABC</h3> -->
  </div>
</template>

<script>
 import {mapState,mapGetters,mapMutations} from 'vuex'  // 必须引用的地方 
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      num:1
    }
  },
  computed: {
    getCount(){
      return this.$store.state.count
    },
    getName(){
    //  return this.$store.state.name;
       return this.$store.getters.getReverseName
    },
    ...mapState({
        async:(state) => state.async 
    }),
    ...mapState(['count']),
    getAsync(){
      return this.$store.state.async  //  直接获取state 数据
    },
    // fullName(){
    //   return this.$store.getters.fullName;  //getters 中获取最基本的信息
    // },                       
    ...mapGetters(['fullName'])       // 通过 mapGetters获取参数 
  },
  mounted() {
    //  setInterval(()=>{
    //   this.undateCount([{num:this.num++}])
    // },1000)
  
    setInterval(()=>{
       let time = new Date();
       let fromtime =  time.getFullYear()+ '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
       this.$store.commit('undateCount',{num:fromtime});  // 把参数传给  store中的属性里面
    },1000) 
  },
  methods:{
    ...mapMutations(['undateCount']),
    changeName(){
       this.$store.commit('updateName');  //  commit 同步操作数据 this.$store.commit('mutations方法名',值)
    },
    rename (){
      this.$store.dispatch('updateNameAsync');        // 异步操作数据 想后台请求数据的时候用到  this.$store.dispatch('mutations方法名',值)
    },
    Async () {
      this.$store.dispatch('updateNameAsync');
    }
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@fontSize:32px;

.hello{
  background: #c59846;
  height: 500px;
  padding: 100px;
  h3{
     font-size: @fontSize;
    
    
  }
}
</style>
