<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据管理</el-breadcrumb-item>
    <el-breadcrumb-item>分类测试</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <div class="rec_main">
      <Recognition @success="recognitionSuccess"
      :labelUrl="config.baseURL+'/tensorflow/wasteName.json'"
      :modelUrl="config.baseURL+'/tensorflow/model.json'">
      </Recognition>
      <div class="show_res" v-if="isShow">
        <el-row class="content">
          <el-col :span="8">
            <img :src="imgSrc" alt="">
          </el-col>
          <el-col :span="16">
            <h3>{{resView[0].category}}</h3>
            <p>{{resView[0].content}}</p>
          </el-col>
        </el-row>
        <div class="demo-progress">
          <el-row :gutter="20" v-for="item in resView" :key="item.label">
            <el-col :span="18">
              <el-progress
                :text-inside="true"
                :stroke-width="24"
                :percentage="item.value"
                :color="item.color"
              >
              </el-progress>
            </el-col>
            <el-col :span="6" style="fontsize:20px">
              <i :class="item.icon"></i><span>{{item.label}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {ref,reactive} from 'vue'
import Recognition from './Recognition'
import config from '@/config.js'

// 分类组件
let imgSrc = ref(require('@/assets/可回收垃圾.png'))
let resView = ref([])
let isShow = ref(false)
let data = {
  '可回收垃圾': {color: 'blue',icon: 'iconfont icon-kehuishouwu',content: '是指在日常生活中或者为日常生活提供服务的活动中产生的，已经失去原有全部或者部分使用价值，回收后经过再加工可以成为生产原料或者经过整理可以再利用的物品，包括废纸类、塑料类、玻璃类、金属类、织物类等。'},
  '其他垃圾': {color: 'gray',icon: 'iconfont icon-qitalaji', content: '是指除可回收物、有害垃圾和厨余垃圾之外的，混杂、污染、难分类的其他生活垃圾。'},
  '厨余垃圾': {color: 'green',icon: 'iconfont icon-chuyulaji', content: '是指居民日常生活中产生的有机易腐垃圾，包括菜叶、剩菜、剩饭、果皮、蛋壳、茶渣、骨头等。'},
  '有害垃圾': {color: 'red',icon: 'iconfont icon-zyouhai', content: '是指生活垃圾中对人体健康或者自然环境造成直接或者潜在危害的物质，包括废充电电池、废扣式电池、废灯管、弃置药品、废杀虫剂(容器)、废油漆(容器)、废日用化学品、废水银产品、废旧电器以及电子产品等。'}
}
const recognitionSuccess = (res)=>{
  resView.value = res.slice(0,4).map((item,index)=>{return {
    label: item.label.split('-')[1],
    category: item.label.split('-')[0],
    value: (item.result*100).toFixed(2),
    color: data[item.label.split('-')[0]].color,
    icon: data[item.label.split('-')[0]].icon,
    content: data[item.label.split('-')[0]].content
  }})
  console.log(resView.value)
  console.log(resView.value[0])
  imgSrc.value = require(`@/assets/${resView.value[0].category}.png`)
  isShow.value = true
}

// 展示


</script>

<style lang='less' scoped>
.rec_main {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.show_res {
  width: 550px;
  margin-left: 10px;
  height: 500px;
}
.content{
  margin-bottom: 100px;
}
img {
  margin-top: 10px;
}
.el-row {
  margin-top: 20px;
}

</style>
