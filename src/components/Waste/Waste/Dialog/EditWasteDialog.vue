<template>
  <el-dialog v-model="editWasteDialogVisible" title="编辑数据" @close="editWasteDialogClose" center width="600px"
  @open="editWasteDialogOpen">
    <el-form :model="editWasteform" ref="editWasteFormRef" label-width="100px" :rules="rules">
      <el-form-item label="垃圾名称" label-width="80px" prop="name">
        <el-input v-model="editWasteForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" label-width="80px" prop="category">
        <el-select v-model="editWasteForm.category" placeholder="请选择" :popper-append-to-body="false">
          <el-option label="可回收垃圾" :value="1"></el-option>
          <el-option label="有害垃圾" :value="2"></el-option>
          <el-option label="厨余垃圾" :value="4"></el-option>
          <el-option label="其他垃圾" :value="8"></el-option>
          <el-option label="大件垃圾" :value="16"></el-option>
          <el-option label="测试" :value="32"></el-option>
        </el-select>
      </el-form-item>
    </el-form>  
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editWasteDialogClose">取 消</el-button>
        <el-button type="primary" @click="editWasteDialogConfirm">确 定</el-button>
        <div>{{editDataform}}</div>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref,reactive,defineProps,defineEmits} from 'vue'
import {updateWaste, getWasteById} from '@/api/waste'
import { ElMessage } from 'element-plus'

let props = defineProps({
  editWasteDialogVisible: Boolean,
  wasteId: Number
})
let emits = defineEmits(['success','close'])
let editWasteFormRef = ref(null)
const editWasteForm = ref({
  name: '',
  category: ''
})
const rules = reactive({
  name:[{ required: true, message: '请输入名称', trigger: 'blur' }]
})
// init
const editWasteDialogOpen = async ()=>{
  console.log(props.wasteId,'props.wasteId')
  let {data:res} = await getWasteById({id:props.wasteId})
  editWasteForm.value = res.data
}


const editWasteDialogClose = ()=>{
  editWasteFormRef.value.resetFields()
  emits('close')
}
const editWasteDialogConfirm = async ()=>{
  await editWasteFormRef.value.validate(async(valid)=>{
    if(valid){
      let {data:res} = await updateWaste(editWasteForm.value)
      if (res.code == 200){
        ElMessage({
            showClose: true,
            message: '更改成功',
            type: 'success',
          })
        editWasteFormRef.value.resetFields()
        emits('success')
      } else {
        ElMessage({
            showClose: true,
            message: '更改失败',
            type: 'error',
          })
        editWasteFormRef.value.resetFields()
        emits('close')
      }
    }
  })
}


</script>

<style lang='less' scoped>

</style>
