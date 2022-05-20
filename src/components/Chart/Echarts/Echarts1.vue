<template>
  <div ref="chart1Ref" class="chart1" style="width: 650px; height: 400px"></div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import * as echarts from "echarts"
import {getChart1} from '@/api/chart'

const chart1Ref = ref(null);

const baseOption = {
  title: {
    text: "易错题目统计",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#E9EEF3",
      },
    },
    extraCssText:
      "width:170px; word-break: break-all; white-space:pre-wrap; overflow:hidden; text-align:left",
  },
  legend: {
    data: ["A", "B", "C", "D", "错误率"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      axisLabel: {
        formatter: (value) =>
          value.length > 7 ? value.slice(0, 4) + "..." : value,
      },
    },
  ],
  yAxis: [
    {
      name: "选择次数",
      type: "value",
    },
    {
      name: "错误率",
      type: "value",
      scale: true,
      axisLabel: {
        formatter: "{value} %",
      },
    },
  ],
  emphasis: {
    focus: "series",
    blurScope: "coordinateSystem",
  },
  series: [
    {
      name: "A",
      type: "bar",
      label: {
        color: "#000000",
        show: true,
        position: "top"
      },
    },
    {
      name: "B",
      type: "bar",
      label: {
        color: "#000000",
        show: true,
        position: "top"
      },
    },
    {
      name: "C",
      type: "bar",
      label: {
        color: "#000000",
        show: true,
        position: "top"
      },
    },
    {
      name: "D",
      type: "bar",
      label: {
        color: "#000000",
        show: true,
        position: "top",
      },
    },
    { name: "错误率", type: "line", yAxisIndex: 1 },
  ],
};
const dataset = {
  dimensions: ["questionName", "A", "B", "C", "D", "rate"]
};


onMounted(async () => {
  const Chart1 = echarts.init(chart1Ref.value)
  const {data:res} = await getChart1()
  const daanList = res.data.map(item=>item.daan)
  baseOption.series = baseOption.series.map((item,index)=>{
    if(index<4){
      item.label.formatter = (params) => {
        let i = params.seriesName == daanList[params.dataIndex];
        return i ? "√" : "";
        }
    }
    return item
  })
  dataset.source = res.data.map(item=>{
    let {title:questionName, A,B,C,D,rate} = item
    return {questionName, A, B, C, D, rate}
  })
  Chart1.setOption(baseOption);
  Chart1.setOption({ dataset });
});
</script>

<style lang='less' scoped>
.chart1 {
  margin: 10px;
  border: 1px solid gray;
  box-shadow: 1px 1px 1px gray;
}
</style>
