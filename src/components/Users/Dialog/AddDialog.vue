<template>
  <el-dialog v-model="addDialogVisible" title="添加用户" @close="addDialogClose" center width="600px">
    <el-form :model="addDataform" ref="addFormRef" :rules="rules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="addDataform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input v-model="addDataform.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="80px" prop="mobile">
        <el-input v-model="addDataform.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="addDataform.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份" label-width="80px" prop="role">
        <el-select v-model="addDataform.role" placeholder="请选择" :popper-append-to-body="false">
          <el-option label="管理员" :value="1"></el-option>
          <el-option label="普通用户" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号状态" label-width="80px" prop="status">
        <el-select v-model="addDataform.status" placeholder="请选择" :popper-append-to-body="false">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="冻结" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>  
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref,reactive,defineProps,defineEmits, toRef} from 'vue'
import {adduser} from '@/api/users'
import { ElMessage } from 'element-plus'

let props = defineProps({
  addDialogVisible:{
    type: Boolean,
    default: false
  }
})
// form init
const addDataform = ref({
  username: '',
  password: '',
  mobile: '',
  email: '',
  status: 1,
  role: 0
})
// form rule
const rules = reactive({
  username:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
  { min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  status: [{ required: true, message: '请输入状态', trigger: 'blur' }],
  role: [{ required: true, message: '请输入角色', trigger: 'blur' }]
})
let addFormRef = ref(null)
let emits = defineEmits(['close','addSuccess'])
const addDialogClose = ()=>{
  addFormRef.value.resetFields()
  emits('close')
}
const addUser = async ()=>{
  await addFormRef.value.validate(async (valid, fields)=>{
    if(valid) {
      const {data:res } = await adduser(addDataform.value)
      addFormRef.value.resetFields()
      emits('close')
      if (res.code == 200) {
          ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success',
          })
          emits('addSuccess')
        } else {
          ElMessage({
            showClose: true,
            message: '添加失败',
            type: 'error',
          })
        }
    }
  })
}

</script>

<style lang='less' scoped>

</style>
