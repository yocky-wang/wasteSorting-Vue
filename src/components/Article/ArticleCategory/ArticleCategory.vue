<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>分类管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" size="large" @click="add">添加分类</el-button>
      </el-col>
    </el-row>
    <el-table :data="articleTypeList" border stripe>
        <el-table-column type="index" width="50" />
        <el-table-column label="分类名称" width="100" prop="typename"></el-table-column>
        <!-- 描述 -->
        <el-table-column label="内容描述" prop="content"></el-table-column>
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
  <el-dialog  v-model="editArticleTypeDialogVisible" title="编辑分类" @close="editArticleTypeDialogClose" center width="600px">
    <el-form :model="editArticleTypeForm" ref="editArticleTypeFormRef" label-width="100px">
      <el-form-item label="分类名称" label-width="80px" prop="typename" >
        <el-input disabled v-model="editArticleTypeForm.typename" ></el-input>
      </el-form-item>
      <el-form-item label="分类描述" label-width="80px" prop="content">
        <el-input type="textarea" v-model="editArticleTypeForm.content" rows="10"></el-input>
      </el-form-item>
    </el-form>  
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editArticleTypeDialogClose">取 消</el-button>
        <el-button type="primary" @click="editArticleDialogConfirm">确 定</el-button>
        <!-- <div>{{editDataform}}</div> -->
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref,reactive, onMounted} from 'vue'
import {getArticleType,getArticleTypeById,updateArticleType} from '@/api/article'
import { ElMessage } from 'element-plus'

let articleTypeList = ref([])
const get_articletype = async ()=>{
  let {data:res} = await getArticleType()
  articleTypeList.value = res.data
}
onMounted(()=>{
  get_articletype()
})
// edit
let editArticleTypeDialogVisible = ref(false)
let editArticleTypeForm = ref({})
let editArticleTypeFormRef = ref(null)
const edit = async (row)=>{
  let {data:res} = await getArticleTypeById({id:row.id})
  editArticleTypeForm.value = res.data
  editArticleTypeDialogVisible.value = true
}
const editArticleTypeDialogClose = ()=>{
  editArticleTypeDialogVisible.value = false
  editArticleTypeFormRef.value.resetFields()
}
const editArticleDialogConfirm = async ()=> {
  let {data:res} = await updateArticleType(editArticleTypeForm.value)
  if(res.code==200){
    editArticleTypeDialogVisible.value = false
    ElMessage.success('编辑成功')
    editArticleTypeFormRef.value.resetFields()
    get_articletype()
  } else {
    editArticleTypeDialogVisible.value = false
    ElMessage.error('编辑失败')
    editArticleTypeFormRef.value.resetFields()
  }
}
</script>

<style lang='less' scoped>
.el-table{
  margin-top: 15px;
}
</style>
