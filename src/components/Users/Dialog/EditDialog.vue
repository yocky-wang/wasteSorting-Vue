<template>
  <el-dialog v-model="editDialogVisible" title="编辑用户" @close="editDialogClose" center width="600px"
  @open="editUserDialogOpen">
    <el-form :model="editDataform" ref="editFormRef" label-width="100px" :rules="rules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="editDataform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input v-model="editDataform.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="80px" prop="mobile">
        <el-input v-model="editDataform.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="editDataform.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份" label-width="80px" prop="role">
        <el-select v-model="editDataform.role" placeholder="请选择" :popper-append-to-body="false">
          <el-option label="管理员" :value="1"></el-option>
          <el-option label="普通用户" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号状态" label-width="80px" prop="status">
        <el-select v-model="editDataform.status" placeholder="请选择" :popper-append-to-body="false">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="冻结" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>  
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
        <!-- <div>{{editDataform}}</div> -->
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref,reactive,toRef,defineProps,defineEmits} from 'vue'
import {getuserbyid, updateuser} from '@/api/users'
import { ElMessage } from 'element-plus'

let props = defineProps({
  editDialogVisible:{
    type: Boolean,
    default: false
  },
  userId: {
    type: Number,
    default: {}
  }
})
// let neweditDataform = toRef(props,'editDataform')
let editDataform = ref([])
let params
let editFormRef = ref(null)
let emits = defineEmits(['close','editSuccess'])
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
const editUserDialogOpen = async ()=>{
  let {data: res} = await getuserbyid({id: props.userId})
  editDataform.value = res.data
}
const editDialogClose = ()=>{
  editFormRef.value.resetFields()
  emits('close')
}
const editUser = async ()=>{
  await editFormRef.value.validate(async (valid)=>{
    if(valid){
      emits('close')
      let res = await updateuser(editDataform.value)
      console.log(res)
      if(res.code==200){
        ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success',
      }) } else {
        ElMessage({
        showClose: true,
        message: '修改失败',
        type: 'error',
      })
      }
      // console.log(neweditDataform.value.score)
      emits('editSuccess')
      editFormRef.value.resetFields()
    }
  })
}
  

</script>