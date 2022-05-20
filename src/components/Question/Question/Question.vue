<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>题库管理</el-breadcrumb-item>
    <el-breadcrumb-item>查看题库</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" size="large" @click="clickbtn">前往添加题目</el-button>
      </el-col>
    </el-row>
    <el-table :data="questionList" border stripe>
        <!-- <el-table-column label="ID" prop="id" width="70px"></el-table-column> -->
        <el-table-column type="index" width="50" />
        <el-table-column label="题目" prop="title" min-width="250px"></el-table-column>
        <el-table-column label="选项A" prop="optionA" >
          <template #default="scope">
            <span>{{scope.row.optionA}}</span>
            <span v-show="scope.row.daan=='A'" class="iconfont icon-zhengque1"> </span>
          </template>
        </el-table-column>
        <el-table-column label="选项B" prop="optionB" >
          <template #default="scope">
            <span>{{scope.row.optionB}}</span>
            <span v-show="scope.row.daan=='B'" class="iconfont icon-zhengque1"> </span>
          </template>
        </el-table-column>
        <el-table-column label="选项C" prop="optionC" >
          <template #default="scope">
            <span>{{scope.row.optionC}}</span>
            <span v-show="scope.row.daan=='C'" class="iconfont icon-zhengque1"> </span>
          </template>
        </el-table-column>
        <el-table-column label="选项D" prop="optionD" >
          <template #default="scope">
            <span>{{scope.row.optionD}}</span>
            <span v-show="scope.row.daan=='D'" class="iconfont icon-zhengque1"> </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template #default="scope">
            <el-button type="primary" @click="editQuestion(scope.row.id)"><i class="iconfont icon-icon"></i>编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button  type="danger"><i class="iconfont icon-icon1"></i>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
  </el-card>
  <EditQuestionDialog :editQuestionDialogVisible="editQuestionDialogVisible"
  :id="scopeId" @close="editQuestionDialogClose" @success="success"></EditQuestionDialog>
</template>

<script setup>
import {ref,reactive, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {getQuestion,deleteQuestion} from '@/api/question'
import EditQuestionDialog from './Dialog/EditQuestionDialog'
import { ElMessage } from 'element-plus'

let questionList = ref([])
const getQuestionList = async ()=>{
  let {data:res} = await getQuestion()
  questionList.value = res.data
}
onMounted(()=>{getQuestionList()})

// router btn
let router = useRouter()
const clickbtn = ()=>{
  router.push('/question/add')
}
// edit btn
let scopeId = ref(null)
let editQuestionDialogVisible = ref(false)
const editQuestion = (id)=>{
  editQuestionDialogVisible.value = true
  scopeId.value = id
  console.log(id)
  
}
const editQuestionDialogClose = ()=>{
  editQuestionDialogVisible.value = false
}
const success = ()=>{
  editQuestionDialogVisible.value = false
  getQuestionList()
}
//delete
const handleDelete = async (id)=>{
  let {data:res} = await deleteQuestion({id})
  if (res.code) {
    ElMessage.success('删除成功')
    getQuestionList()
  } else {
    ElMessage.error('删除失败')
  }
}

</script>

<style lang='less' scoped>
.el-table{
  margin-top: 15px;
}
.icon-zhengque1{
  color: #11aa66;
  margin-left: 5px;
}
</style>
