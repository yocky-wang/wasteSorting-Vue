<template>
  <el-menu
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409BFF"
    :unique-opened="true"
    :collapse="props.isCollapse"
    :collapse-transition='false'
    router
    :default-active="activePath"
  >
    <el-sub-menu :index="item.id+''" v-for="item in props.routerData" :key="item.id">
      <!-- 一级菜单模板区 -->
      <template #title>
        <i :class="icons[item.id]"></i>
        <span>{{item.name}}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children"
      :key="subItem.id" @click="pathActive('/'+subItem.path)">
        <!-- 二级菜单模板区 -->
        <template #title>
          <i class="iconfont icon-tiaoxuanxiangmu"></i>
          <span>{{subItem.name}}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {ref,reactive,defineProps} from 'vue'

let props = defineProps({
  routerData: Array,
  isCollapse: {
    type: Boolean,
    default: false
  }
})

let activePath = ref('')

const pathActive = (path)=>{
  activePath = path
  sessionStorage.setItem('activePath',path)
}
let icons = {
  '10': 'iconfont icon-yonghu',
  '20': 'iconfont icon-laji2',
  '30': 'iconfont icon-tiku',
  '40': 'iconfont icon-01_wenzhangguanli',
  '50': 'iconfont icon-baobiao'
}
</script>

<style lang='less' scoped>
.iconfont {
  margin-right: 10px;
}
.el-menu{
  border-right: none;
}
</style>
