<template>
  <div ref="chart2Ref" class="chart2" style="width: 500px; height: 400px"></div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import * as echarts from "echarts";
import {getChart2} from '@/api/chart'

const chart2Ref = ref(null)
const colorMap = {
  '可回收垃圾': '#00adff',
  '厨余垃圾': '#11be71',
  '其他垃圾': '#c4c4c4',
  '有害垃圾': '#bb0000'
}
const baseOption = {
  title: {
    text: "分类搜索统计",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#E9EEF3",
      },
    },
  },
  legend: {
    data: ["搜索次数"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "5%",
    containLabel: true,
  },
  xAxis: [{ type: "value", name: "搜索次数", nameLocation: 'center' }],
  yAxis: [{ type: "category", scale: true }],
  series: [
    {
      name: "搜索次数",
      type: "bar",
      label:{
              // color: '#000000',
              show: true,
              // formatter: (params)=>{return 1}
            },
      itemStyle: {
        // borderRadius: [0, 10, 10, 0], //（顺时针左上，右上，右下，左下）
        borderRadius: [0, 5, 5, 0],
        // color: function (params) {
        //   return colorList[params.dataIndex];
        // },
      },
      encode: {
        x: "count",
        y: "wasteName",
      }
    },
  ],
};
const dataset = {
  dimensions: ["wasteName", "count"],
  // source: [
  //   { wasteName: "name11111", count: 150 },
  //   { wasteName: "name2222", count: 120 },
  //   { wasteName: "name3", count: 100 },
  //   { wasteName: "name4", count: 80 },
  //   { wasteName: "name555515", count: 20 },
  //   { wasteName: "name555155", count: 20 },
  //   { wasteName: "name155555", count: 20 },
  // ],
};
onMounted(async () => {
  const Chart2 = echarts.init(chart2Ref.value)
  const {data: res} = await getChart2()
  const typenameList = res.data.map(item=>item.typename)
  baseOption.series[0].itemStyle.color = (param)=>colorMap[typenameList[param.dataIndex]]
  baseOption.series[0].label.formatter = (param)=>typenameList[param.dataIndex]
  dataset.source = res.data.map(item=>{
    return {wasteName: item.name, count: item.count}
  })
  Chart2.setOption(baseOption);
  Chart2.setOption({ dataset });
});
</script>

<style lang='less' scoped>
.chart2 {
  margin: 10px;
  border: 1px solid gray;
  box-shadow: 1px 1px 1px gray;
}
</style>
