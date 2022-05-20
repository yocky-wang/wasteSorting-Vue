<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="logobox" v-show="!isCollapse">
          <div class="imgbox">
            <img class="logoimg" src="@/assets/headlogo.jpg" alt="">
          </div>
          <p v-if="!isCollapse">Admin</p>
        </div>
        <Menu :routerData="menuData" :isCollapse="isCollapse"></Menu>
      </el-aside>
      <el-container id="right">
        <el-header>
          <div @click="isCollapse=!isCollapse" class="collapse"><span class="iconfont icon-shousuo" :class="{rotate:isCollapse}"></span></div>
          <el-button type="info" @click="logout">退出登录</el-button>
        </el-header>
        <el-main @scroll="mainScroll" class="mainBox" ref="main_box">
          <router-view/>
          <div class="scroll" v-show="isScroll" @click="toTop">
            <span class="iconfont icon-fanhuidingbu" > </span>
          </div>
        </el-main>
        
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import {ref,reactive} from 'vue'
import {useRouter} from 'vue-router'
import {routerData} from './data/routerData.js'
import Menu from './Menu'

let router = useRouter()
let menuData = reactive(routerData)
let isCollapse = ref(false)
const logout = ()=>{
  sessionStorage.clear();
  router.push("/login");
}

let isScroll = ref(false)
let main_box = ref(null)
const mainScroll = (e)=>{
  let dis = e.srcElement.scrollTop
  // console.log(dis)
  if(dis>100){
    isScroll.value = true
  } else {
    isScroll.value = false
  }
}
const toTop = ()=>{
  main_box.value.$el.scrollTop = 0
}

</script>

<style lang='less' scoped>
.el-aside{
  padding-top: 30px;
  min-height: 400px;
  height: 100vh;
  background: #333744;
  border-right: 1px solid #fff;
  overflow-x: hidden;
  
}
.el-header{
  color: #fff;
  background: #333744;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  .collapse{
    height: 100%;
    width: 70px;
    padding-top: 10px;
    background: #4A5064;
    cursor: pointer;
    .iconfont {
    font-size: 30px;
    }
    .rotate{
      display: inline-block;
      transform: rotate(180deg);
    }
  }
  
}
.logobox{
  height: 200px;
  color: #9d9d9d;
  font-size: 20px;
  padding: 40px 0px;
  .imgbox {
    width: 80px;
    height: 80px;
    margin: auto;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
    
  }
  p {
      margin-top: 20px;
      color: #fff;
  }
}
.scroll{
  position: fixed;
  right: 2vw;
  bottom: 10vh;
  z-index: 4000;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 2px 2px 2px #000;
  padding-top: 12px;
}
.icon-fanhuidingbu{
  color: rgb(75, 138, 255);
  font-size: 1.5em;
}
.mainBox{
  &::-webkit-scrollbar {
    width: 4px;    
    /*height: 4px;*/
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
}
</style>
