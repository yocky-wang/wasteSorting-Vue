<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>查看文章</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="selectArticleType" placeholder="选择分类" transfer="true"
          @change="articleTypeChange" :clearable="true">
            <el-option :label="item.typename" :value="item.typename" v-for="item in articleType" :key="item.id"></el-option>
          </el-select>
        </el-col>
    </el-row>
    <el-table :data="articlelist" border stripe>
        <el-table-column type="expand">
          <template #default="{row}">
            <article class="content">{{row.content}}</article>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" />
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="分类名称" prop="category">
          <!-- <template #default="scope">
            {{categoryName(scope.row.category)}}
          </template> -->
        </el-table-column>
        <el-table-column label="简介" prop="introduction" width="200px" show-overflow-tooltip></el-table-column>
        <el-table-column label="发布" prop="status">
          <template #default="scope">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"
              inline-prompt active-text="发布"  inactive-text="未发布"
              @change="articleStatusChange(scope.row)" size="large" :width="70"/>
            </template>
        </el-table-column>
        <el-table-column label="阅读量" prop="view" width="80px"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template #default="scope">
            <el-button type="primary" @click="editArticle(scope.row.id)"><i class="iconfont icon-icon"></i>编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button  type="danger" ><i class="iconfont icon-icon1"></i>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import {getArticle, deleteArticle, updateArticleStatus, getArticleType} from '@/api/article'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'

let articlelist = ref([])
const get_articlelist = async ()=>{
  let {data:res} = await getArticle()
  articlelist.value = res.data
}
onMounted(()=>{
  get_articlelist()
})

// edit
let router = useRouter()
const editArticle = (id)=>{
  router.push({
    name: 'articleAdd',
    params:{
      id
    }
  })
}
// delete
const handleDelete = async (id)=>{
  await deleteArticle({id:id})
  get_articlelist()
}

// statuschange
const articleStatusChange = async (row)=>{
  let {data:res} = await updateArticleStatus({id:row.id,status:row.status})
  if (res.code==200) {
    ElMessage.success("更改状态成功")
  } else {
    ElMessage.error("更改状态失败")
  }
}

// select type
const articleType = ref([])
const selectArticleType = ref(null)
onMounted(async ()=>{
  let {data:res} = await getArticleType()
  articleType.value = res.data
})
const articleTypeChange = async (val)=>{
  if(val){
    let {data:res} = await getArticle({category: val})
    articlelist.value = res.data
  } else {
    get_articlelist()
  }
}
</script>

<style lang='less' scoped>
.el-table{
  margin-top: 15px;
}
.content{
  display: flex;
  width: 100%;
  padding: 20px;
  // overflow: hidden;
  white-space:pre-wrap;
}
</style>
