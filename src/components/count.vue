<template>
   <div>
     <h2>{{msg}}</h2>    
     <hr/>
     <h3>{{$store.state.count}}</h3>
   </div>   
   <div>
     <button @click="$store.commit('add')">+</button>
     <button @click="$store.commit('reduce')">-</button>         
  </div> 
</template>
<script>
  import store from '@/store/index'
  import  {mapState} from 'vuex'
  export default {
      data(){
          return {
              msg:'hello vuex'
          }
      },
     computed:mapState({
         count:state =>state.count
     })
  }
</script>