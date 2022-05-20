<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    <el-breadcrumb-item>查看图表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <div class="charts">
      <Echart1></Echart1>
      <Echart2></Echart2>
    </div>
  </el-card>
</template>

<script setup>
import { ref, reactive } from "vue"
import Echart1 from './Echarts/Echarts1.vue'
import Echart2 from './Echarts/Echarts2.vue'

</script>

<style lang='less' scoped>
.charts{
  display: flex;
  flex-wrap: wrap;
}

</style>
