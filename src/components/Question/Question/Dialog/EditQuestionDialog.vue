<template>
  <el-dialog v-model="editQuestionDialogVisible" title="添加数据" @close="editQuestionDialogClose" 
  @open="editQuestionDialogOpen"
  center width="600px" :modal-append-to-body='false'>
    <el-form :model="editQuestionForm" ref="editQuestionFormRef">
      <el-form-item label="题目" label-width="80px" prop="title">
        <el-input v-model="editQuestionForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项A" label-width="80px" prop="optionA">
        <el-input v-model="editQuestionForm.optionA" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项B" label-width="80px" prop="optionB">
        <el-input v-model="editQuestionForm.optionB" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项C" label-width="80px" prop="optionC">
        <el-input v-model="editQuestionForm.optionC" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项D" label-width="80px" prop="optionD">
        <el-input v-model="editQuestionForm.optionD" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="答案" label-width="80px" prop="daan">
        <el-select v-model="editQuestionForm.daan" placeholder="请选择" transfer="true" :popper-append-to-body="false">
          <el-option label="选项A" value="A"></el-option>
          <el-option label="选项B" value="B"></el-option>
          <el-option label="选项C" value="C"></el-option>
          <el-option label="选项D" value="D"></el-option>
        </el-select>
      </el-form-item>
      <!-- {{editQuestionForm}} -->
    </el-form>  
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editQuestionDialogClose">取 消</el-button>
        <el-button type="primary" @click="comfirmeditQuestion">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref,reactive, onMounted,defineProps,defineEmits, onBeforeMount,nextTick} from 'vue'
import {getQuestionById,updateQuestion} from '@/api/question'
import { ElMessage } from 'element-plus'

let props = defineProps({
  id: String,
  editQuestionDialogVisible: Boolean
})
let emits = defineEmits(['success','close'])

let editQuestionFormRef = ref(null)
let editQuestionForm = ref({})
// let editQuestionForm = ref({
//   title: '',
//   optionA: '',
//   optionB: '',
//   optionC: '',
//   optionD: '',
//   daan: '',
// }) // 都可以，reactive({}or{titile:''}) 无效 <单元素用ref>
const editQuestionDialogOpen = async()=>{
  console.log(props.id,"props.id")
  let {data:res} = await getQuestionById({id:props.id})
  editQuestionForm.value = res.data
  console.log(res)
  // console.log(editQuestionForm.value)
  
}

const editQuestionDialogClose = ()=>{
  editQuestionFormRef.value.resetFields()
  emits('close')
}

const comfirmeditQuestion = async ()=>{

  let {data:res} =  await updateQuestion(editQuestionForm.value)
  if (res.code == 200){
    ElMessage.success('更改成功')
    emits('success')
  } else {
    ElMessage.error('更改失败')
    emits('close')
  }
  editQuestionFormRef.value.resetFields()
}

</script>

<style lang='less' scoped>

</style>
