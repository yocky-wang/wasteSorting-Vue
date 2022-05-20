<template>
   <el-dialog v-model="addWasteDialogVisible" title="添加数据" @close="addWasteDialogClose" center width="600px" :modal-append-to-body='false'>
    <el-form :model="addWasteForm" ref="addWasteFormRef" :rules="rules">
      <el-form-item label="垃圾名称" label-width="80px" prop="name">
        <el-input v-model="addWasteForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" label-width="80px" prop="category">
        <el-select v-model="addWasteForm.category" placeholder="请选择" :popper-append-to-body="false">
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
        <el-button @click="addWasteDialogClose">取 消</el-button>
        <el-button type="primary" @click="comfirmAddWaste(addWasteFormRef)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref,reactive,defineProps,defineEmits} from 'vue'
import {addWaste} from '@/api/waste'
import { ElMessage } from 'element-plus'
let props = defineProps({
  addWasteDialogVisible: Boolean
})
let emits = defineEmits(['message'])
let addWasteFormRef = ref(null)
const addWasteForm = reactive({
  name: '',
  category: ''
})
const rules = reactive({
  name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
  category: [{ required: true, message: '请输入分类', trigger: 'blur' }],
})
const addWasteDialogClose = ()=>{
  addWasteFormRef.value.resetFields()
  emits('message')
}
const comfirmAddWaste = async (FormEl)=>{
  if(!FormEl) return
  await FormEl.validate(async (valid)=>{
    if(valid){
      let {data:res} = await addWaste(addWasteForm)
      if (res.code == 200){
        ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success',
          })
      } else {
        ElMessage({
            showClose: true,
            message: '添加失败',
            type: 'error',
          })
      }
      addWasteFormRef.value.resetFields()
      emits('message')
    } else {
      console.log('err')
    }
  })
}

</script>

<style lang='less' scoped>

</style>
