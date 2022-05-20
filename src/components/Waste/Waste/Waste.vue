<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据管理</el-breadcrumb-item>
    <el-breadcrumb-item>垃圾数据</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" size="large" @click="add">添加数据</el-button>
      </el-col>
      <el-col :span="4">
        <el-select v-model="selectCategory" placeholder="选择分类" size="large" @change="changeCategory">
          <el-option label="所有垃圾" value="0"></el-option>
          <el-option label="可回收垃圾" value="1"></el-option>
          <el-option label="有害垃圾" value="2"></el-option>
          <el-option label="厨余垃圾" value="4"></el-option>
          <el-option label="其他垃圾" value="8"></el-option>
          <el-option label="大件垃圾" value="16"></el-option>
          <el-option label="测试" value="32"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" :offset="11">
        <el-input placeholder="请输入内容" size="large" @input="changeInput" v-model="inputValue">
        <template #prefix>
          <span class="iconfont icon-sousuo"></span>
        </template>
      </el-input>
      </el-col>
    </el-row>
    <el-table :data="wastelist" border stripe>
        <!-- <el-table-column label="ID" prop="id" width="70px"></el-table-column> -->
        <el-table-column type="index" width="50" />
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="分类名称" prop="category">
          <template #default="scope">
            {{categoryName(scope.row.category)}}
          </template>
        </el-table-column>
        <el-table-column label="小程序搜索次数" prop="searchCount"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template #default="scope">
            <el-button type="primary" @click="edit(scope.row)"><i class="iconfont icon-icon"></i>编辑</el-button>
            <el-popconfirm title="确定删除吗？">
              <template #reference>
                <el-button  type="danger"><i class="iconfont icon-icon1"></i>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
  </el-card>
  <el-pagination background layout="prev, pager, next, jumper" :page-count="comouted_pageCount" 
  @current-change="changePage" v-model:currentPage="page"/>
  <AddWasteDialog :addWasteDialogVisible="addWasteDialogVisible" @message="message"></AddWasteDialog>
  <EditWasteDialog :editWasteDialogVisible="editWasteDialogVisible" @success="editsuccess" @close="editclose"
    :wasteId="wasteId"></EditWasteDialog>
</template>

<script setup>
import {ref,reactive,onMounted,computed} from 'vue'
import {getWaste,getCount,getWasteByName} from '@/api/waste'
import AddWasteDialog from './Dialog/AddWasteDialog.vue'
import EditWasteDialog from './Dialog/EditWasteDialog.vue'

// let wastelist = reactive([{"category":2,"createTime":"2021-04-16 10:18:22","id":"2","name":"阿司匹林","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"3","name":"阿尔卑斯糖","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"4","name":"艾草","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"6","name":"安全帽","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"7","name":"安全套","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"8","name":"按摩棒","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"9","name":"肮脏塑料袋","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"10","name":"A4纸","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"11","name":"阿胶","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"12","name":"A4纸包装袋","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"13","name":"安全套包装袋","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"14","name":"艾灸条","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"15","name":"艾灸贴","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"16","name":"艾灸渣","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"17","name":"奥特曼玩具","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"18","name":"奥特曼卡片","updateTime":"2021-04-16 10:18:22"},{"category":2,"createTime":"2021-04-16 10:18:22","id":"19","name":"安神补脑液瓶","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"20","name":"阿胶糕","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"21","name":"安全座椅","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"22","name":"芭蕉叶","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"23","name":"八角","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"24","name":"八宝饭","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"25","name":"八宝粥","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"26","name":"巴旦木壳","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"27","name":"白菜","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"28","name":"白纸","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"29","name":"百洁布","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"30","name":"玻璃摆件","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"31","name":"板栗","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"32","name":"棒骨","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"33","name":"蚌壳","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"34","name":"包包","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"35","name":"包子","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"36","name":"布包","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"37","name":"包装薄膜","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"38","name":"薄型塑料袋","updateTime":"2021-04-16 10:18:22"},{"category":2,"createTime":"2021-04-16 10:18:22","id":"39","name":"保健品","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"40","name":"保龄球","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"41","name":"保暖杯","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"42","name":"宝特瓶","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"43","name":"抱枕","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"44","name":"报刊","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"45","name":"报纸","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"46","name":"鲍鱼","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"47","name":"鲍鱼壳","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"48","name":"爆竹","updateTime":"2021-04-16 10:18:22"},{"category":4,"createTime":"2021-04-16 10:18:22","id":"49","name":"爆米花","updateTime":"2021-04-16 10:18:22"},{"category":8,"createTime":"2021-04-16 10:18:22","id":"51","name":"贝壳类","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"53","name":"被套","updateTime":"2021-04-16 10:18:22"},{"category":1,"createTime":"2021-04-16 10:18:22","id":"54","name":"被芯","updateTime":"2021-04-16 10:18:22"}])
// common
let wastelist = ref([])
let page = ref(1)
let total = ref({})
let pageCount = ref(0)
let comouted_pageCount = computed(()=>Math.ceil(pageCount.value/50))
let inputValue = ref('')

// table
const get_waste = async (page)=>{
  let {data:res} = await getWaste({page})
  wastelist.value = res.data
}
const categoryName = (category)=>{
  switch (category){
    case 1:
      return '可回收垃圾'
    case 2:
      return '有害垃圾'
    case 4:
      return '厨余垃圾'
    case 8:
      return '其他垃圾'
    case 16:
      return '大件垃圾'
    case 32:
      return '测试'
  }
}
onMounted(async ()=>{
  get_waste(1)

})
//selectCategory
let selectCategory = ref(null)
const changeCategory = async (value)=>{
  page.value = 1
  if (value == 0){
    get_waste(page.value)
    let {data:res} = await getCount()
    pageCount.value = res.data.count
  } else {
    let {data:res1} = await getWaste({page:page.value,category:value})
    wastelist.value = res1.data
    let {data:res2} = await getCount({category:value})
    pageCount.value = res2.data.count
  }
  inputValue.value = '' // ...
}

// pagination

onMounted(async ()=>{
  let {data:res} = await getCount()
  pageCount.value = res.data.count
})
const changePage = async (newpage) => {
  page.value = newpage
  // console.log(selectCategory.value,'selectCategory')
  // console.log(newpage,'newpage')
  if(selectCategory.value == 0 || selectCategory.value == null){
    get_waste(newpage)
    let {data:res} = await getCount()
    pageCount.value = res.data.count
  } else {
    let {data:res} = await getWaste({page:newpage,category:selectCategory.value})
    wastelist.value = res.data
  }
}

//addwaste
let addWasteDialogVisible = ref(false)
const add = ()=>{
  addWasteDialogVisible.value =  true
}
const message = async ()=>{
  addWasteDialogVisible.value =  false
  page.value = 1
  get_waste(page.value)
  let {data:res} = await getCount()
  pageCount.value = res.data.count
}
// editwaste
let editWasteDialogVisible = ref(false)
let wasteId = ref(0)
const edit = (row)=>{
  wasteId.value = row.id
  console.log(wasteId,'id')
  editWasteDialogVisible.value =  true
}
const editsuccess = async ()=>{
  editWasteDialogVisible.value =  false
  page.value = 1
  get_waste(page.value)
  let {data:res} = await getCount()
  pageCount.value = res.data.count
}
const editclose = ()=>{
  editWasteDialogVisible.value =  false
}
// input
const changeInput = async (value) => {
  page.value = 1
  selectCategory.value = null
  if (value.trim() == ''){
    get_waste(page.value)
    let {data:res} = await getCount()
    pageCount.value = res.data.count
  } else {
    let {data:res} = await getWasteByName({name:value.trim()})
    pageCount.value = 1
    wastelist.value = res.data
  }
}


</script>

<style lang='less' scoped>
.iconfont{
  font-size: 1.5em;
  position: relative;
  left: -5px
}
.el-table{
  margin-top: 15px;
}
.el-pagination{
  justify-content: center;
  margin-top: 15px;
}
</style>
