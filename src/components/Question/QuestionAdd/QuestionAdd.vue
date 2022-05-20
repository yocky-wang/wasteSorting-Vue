<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>题库管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加题目</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-form :model="addQuestionForm" ref="addQuestionFormRef" size="large">
      <el-form-item label="题目" label-width="80px" prop="title">
        <el-input v-model="addQuestionForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项A" label-width="80px" prop="optionA">
        <el-input v-model="addQuestionForm.optionA" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项B" label-width="80px" prop="optionB">
        <el-input v-model="addQuestionForm.optionB" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项C" label-width="80px" prop="optionC">
        <el-input v-model="addQuestionForm.optionC" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项D" label-width="80px" prop="optionD">
        <el-input v-model="addQuestionForm.optionD" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="答案" label-width="80px" prop="daan">
        <el-select v-model="addQuestionForm.daan" placeholder="请选择" transfer="true" :popper-append-to-body="false">
          <el-option label="选项A" value="A"></el-option>
          <el-option label="选项B" value="B"></el-option>
          <el-option label="选项C" value="C"></el-option>
          <el-option label="选项D" value="D"></el-option>
        </el-select>
      </el-form-item>
      <!-- {{addQuestionForm}} -->
    </el-form>  
      <span class="dialog-footer">
        <el-button type="primary" @click="comfirmaddQuestion" size="large">确认添加</el-button>
        <el-button type="info" @click="resetaddQuestionDialog" size="large">重 置</el-button>
      </span>
  </el-card>
</template>

<script setup>
import {ref,reactive, onMounted} from 'vue'
import {addQuestion} from '@/api/question'
import { ElMessage } from 'element-plus'

let addQuestionForm = ref({})
let addQuestionFormRef = ref(null)

const comfirmaddQuestion = async ()=>{
  let {data:res} = await addQuestion(addQuestionForm.value)
  if(res.code==200){
    ElMessage({
    showClose: true,
    message: '添加成功',
    type: 'success',
  })
  } else {
    ElMessage.error('添加失败')
  }
  addQuestionFormRef.value.resetFields()
}

const resetaddQuestionDialog =()=>{
  addQuestionFormRef.value.resetFields()
}

</script>

<style lang='less' scoped>
.el-form{
  margin-top: 30px;
  margin-left: 60px;
}
.el-form-item{
  width: 60vw;
}
</style>
