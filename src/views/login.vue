<template>
  <div class="login-container">
      <transition name="form-fade" mode="in-out">
           <div class="login-form" v-show="showLogin">
               <div class="login-logo">
                    <img src="../assets/logo.png" width="32" height="32"><span>soco-cu</span>
               </div>
               <el-form :model="formLogin" :rules="rulesLogin" ref="formLogin">
                   <el-form-item prop="username" >
                      <el-input type="text" v-model="formLogin.username" auto-complete="off"></el-input>  <!-- 登录 -->
                   </el-form-item>
                  <el-form-item prop="password">
                        <el-input type="password" v-model="formLogin.password" auto-complete="off" ></el-input> <!-- 注册 -->
                   </el-form-item>
                     <el-form-item>
                          <el-button type="primary" @click.native.prevent="submitForm('formLogin')">登录</el-button>
                          <el-button  @click="resetForm()">重置</el-button>
                     </el-form-item>
               </el-form>
               <div class="login-account">
                    <span>账号:socout</span><span>密码:sosout</span>
               </div>
           </div>
      </transition>
      <div id="loginThree">

      </div>
  </div>
</template>

<script>
//  import {mapState,mapGetters,mapMutations} from 'vuex'  // 必须引用的地方
import { Form, FormItem, Input, Button } from 'element-ui' 
import { requestLogin } from '../api/api'
import THREE from '../libs/three/three';
import UserApi from '../api/user';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showLogin: false,
      formLogin:{
        username :'admin',
        password :'123456'
      },
      rulesLogin:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'}
        ],
        password:[
          {
            required:true,
            message:'请输入密码',
            trigger:'blur'
          }
        ]
      }
    }
  },
  created () {
     const that = this;
  
  },
  components: {
     ElForm:Form,
     ElFormItem:FormItem,
     ElInput: Input,
     ElButton: Button
  },
  mounted() {
    const that = this;
    that.showLogin = true;
    that.init3D();
  },
  methods:{
    submitForm(name){  // 登录
      const that = this;
       
      that.$refs[name].validate((valid) => {
         if(valid) {
          
           this.showLogin = true
           var loginParams = {
             username:this.formLogin.username,
             password:this.formLogin.password
           };
           requestLogin(loginParams).then(data =>{
              
              //this.logining = false;
              let {msg,code,user} = data;
              console.log(user);
              if(code !==200) {
                 this.$message ({
                   message:msg,
                   type:'error'
                 })
              } else  {
                 sessionStorage.setItem('user',JSON.stringify(user));  // 存储用户信息
                
                this.$router.push({ path: '/table' });  // 跳转到table 
              }
           });

         } else {
           console.log('error submit!');
           return false;
         }
      });
    },
    
    init3D (){  // 初始化3D动画
     var SCREEN_WIDTH = window.innerWidth;
      var SCREEN_HEIGHT = window.innerHeight;
      var SEPARATION = 90;
      var AMOUNTX = 50;
      var AMOUNTY = 50;
      var container;
      var particles, particle;
      var count;
      var camera;
      var scene;
      var renderer;
      var mouseX = 0;
      var mouseY = 0;
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
      init();
      this.interval = setInterval(loop, 1000 / 60);
      function init() {
        container = document.createElement( 'div' );
        container.style.position = 'relative';
        container.style.top = '200px';
        document.getElementById('loginThree').appendChild( container );
        camera = new THREE.Camera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
        camera.position.z = 1000;
        scene = new THREE.Scene();
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        particles = new Array();
        var i = 0;
        var material = new THREE.ParticleCircleMaterial(0x67c23a , 1 );
        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
                particle = particles[ i ++ ] = new THREE.Particle( material );
                particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                scene.add( particle );
            }
        }
        count = 0;
        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      }
      function onDocumentMouseMove( event ) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }
      function onDocumentTouchMove( event ) {
        if ( event.touches.length == 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
      }
      function loop() {
          camera.position.x += ( mouseX - camera.position.x ) * .05;
          camera.position.y = 364;
          var i = 0;
          for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
              for (var iy = 0; iy < AMOUNTY; iy++) {
                particle = particles[ i++ ];
                particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;
              }
          }
          renderer.render(scene, camera);
          count += 0.1;
      }
    }
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
     .login-container {
       width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      text-align: center;
      background-color: #141a48;
      background-image: url(../assets/login-bg.png);
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
     }
     #loginThree {
       position: absolute;
       width: 100%;
       top:0;
       bottom:0;
       overflow: hidden;
     }
     .login-form {
            position: absolute;
          top: 50%;
          left: 50%;
          margin: -230px 0 0 -180px;
          width: 350px;
          height: 300px;
          padding: 25px;
          -webkit-box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
          box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
          background-color: #fff;
          border-radius: 4px;
          z-index: 3;
        .login-logo {
          text-align: center;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          margin-bottom: 24px;
          img{
            width: 40px;
            margin-right: 8px;
          }
          span{
            vertical-align: text-bottom;
            font-size: 16px;
            text-transform: uppercase;
            display: inline-block;
          }
         
        }
       .login-account {
            color: #999;
            text-align: center;
            margin-top: -15px;
            color: #fff;
            span {
              font-size: 12px;
              &:first-child {
                margin-right: 16px;
              }
            }
        }

     }
     .form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
   	  }
	   .form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	   }

</style>
