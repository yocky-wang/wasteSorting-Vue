<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>发布文章</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-form :model="addArticleForm" :rules="rules" ref="addArticleFormRef" size="large" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="addArticleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="addArticleForm.category" placeholder="请选择分类" transfer="true">
          <el-option :label="item.typename" :value="item.typename" v-for="item in articleType" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缩略图" prop="imgpath">
      <el-input v-model="addArticleForm.imgpath" :disabled="true"></el-input>
<!--        baseUrl+'/user/template/upload'  :auto-upload="false" 'http://localhost:3000/upload' :on-success="uploadSuccess"-->
      <el-upload ref="uploadRef"
      :action="baseUrl+'api/upload'" list-type="picture-card" name="file" :headers="headers"
      :on-change="uploadChange"  :limit="1" :on-exceed="handleExceed"  :on-success="uploadSuccess">
        <i class="iconfont icon-ic_image_upload"></i>
        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="iconfont icon-fangda"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="handleDownload(file)">
                <i class="iconfont icon-xiazai"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="iconfont icon-shanchu"></i>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
    </el-form-item>
      <el-form-item label="是否发布" prop="status">
        <el-input v-model="addArticleForm.status" type="number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文章概要" prop="introduction">
      <el-input type="textarea" v-model="addArticleForm.introduction" rows="4"></el-input>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <el-input type="textarea" v-model="addArticleForm.content" rows="20"></el-input>
    </el-form-item>
      <!-- {{addArticleForm}} -->
    </el-form>  
      <span class="dialog-footer">
        <el-button v-if="!isEdit" type="primary" @click="comfirmaddArticle" size="large">确认添加</el-button>
        <el-button v-else type="primary" @click="comfirmeditArticle" size="large">确认更新</el-button>
        <el-button type="info" @click="resetaddArticleDialog" size="large">重 置</el-button>
      </span>
  </el-card>
  <el-dialog v-model="dialogVisible">
    <img :src="previewURL" alt="">
  </el-dialog>
</template>

<script setup>
import {ref,reactive, onMounted} from 'vue'
import { genFileId } from 'element-plus'
import {getArticleType,addArticle,getArticleById,updateArticle} from '@/api/article'
import { ElMessage } from 'element-plus'
import {useRoute} from 'vue-router'
import config from '@/config.js'

let addArticleForm = ref({
  title: '',
  introduction: '',
  content: '',
  category: '',
  imgpath: 'image/default.jpg',
  status: 0
})
let addArticleFormRef = ref(null)
// init router
let route = useRoute()
let editId = route.params.id
let isEdit = ref(false)
console.log(route,'route')
let get_article_by_id = async (id)=>{
  let {data:res} = await getArticleById({id:id})
  addArticleForm.value = res.data
  console.log(addArticleForm.value,'add')
  console.log(res,'res')
}
onMounted(()=>{
  if(editId !== undefined) {
    isEdit.value = true
    get_article_by_id(editId)
  }
})
// pic upload
let uploadRef = ref(null)
let baseUrl = config.baseURL+'/'
let headers = {'Authorization': sessionStorage.getItem('token')}
let previewURL = ref('')
let dialogVisible = ref(false)
const uploadChange = (file,filelist)=>{
  // console.log(file,'file')
  // console.log(filelist,'filelist')
  // addArticleForm.value.imgpath = 'image/' + file.name
}
const handleExceed = (files) => {
  uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
  uploadRef.value.submit()
}
const handlePictureCardPreview = (file) =>{
  previewURL.value = file.url
  console.log(file)
  dialogVisible.value = true
}
const handleDownload = (file) => {
  var a = document.createElement('a')
  var event = new MouseEvent('click')
  a.download = file.name
  a.href = file.url	
  a.dispatchEvent(event)
}
const handleRemove = (file)=>{
  uploadRef.value.handleRemove(file)
  addArticleForm.value.imgpath = '/image/default.jpg'
}
// Type
let articleType = ref([])
onMounted(async ()=>{
  let {data:res} = await getArticleType()
  articleType.value = res.data
})

// rules
let rules = {
  title: [
    { required: true, message: '请输入题目', trigger: 'blur' },
    { min: 4, max: 40, message: '长度在 4 到 40 个字符', trigger: 'blur' }
  ],
  introduction: [
    { required: true, message: '请输入简介', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择文章分类', trigger: 'change' }
  ],
  status: [
    { required: true, message: '只能为0或1', trigger: 'change' }
  ]
}

// submit
const uploadSuccess = (response)=>{
  addArticleForm.value.imgpath = response.data.path
  console.log(response,'res')
  console.log(addArticleForm.value.imgpath,'res2')
}
const comfirmaddArticle = async ()=>{
  // uploadRef.value.submit()
  console.log(addArticleForm.value.imgpath)
  let {data:res} = await addArticle(addArticleForm.value)
  if(res.code == 200 ) {
    ElMessage.success('添加成功')
    resetaddArticleDialog()
  } else {
    ElMessage.error('添加失败')
  }
}
const resetaddArticleDialog = ()=>{
  addArticleFormRef.value.resetFields()
  uploadRef.value.clearFiles()
}
const comfirmeditArticle = async ()=>{
  // let r = uploadRef.value.submit()
  // console.log(r,'r')
  let {data:res} = await updateArticle(addArticleForm.value)
  if(res.code == 200 ) {
    ElMessage.success('更新成功')
    resetaddArticleDialog()
  } else {
    ElMessage.error('更新失败')
  }
}
</script>

<style lang='less' scoped>
.el-card{
  padding-right: 30px;
}
img{
  width: 400px;
}
</style>
