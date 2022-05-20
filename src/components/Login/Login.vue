<template>
  <div class='login_bg'>
    <div class="login_container">
    <!-- 头像 -->
      <div class="headimg" >
        <img src="~@/assets/headlogo.jpg" alt="">
      </div>
      <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {ref,reactive,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {loginPost} from '@/api/login'
import { ElMessage } from 'element-plus'

const router = useRouter()
const ruleFormRef = ref(null)
const ruleForm = reactive({
  username: '',
  password: ''
})
onMounted(()=>{
  ruleForm.username = 'admin'
  ruleForm.password = '123456'
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ]
})
const submitForm = ()=>{
  ruleFormRef.value.validate(async valid => {
    if (!valid) return
    const {data:res} = await loginPost(ruleForm)
    if (res.code != 200) {
      ElMessage({
        showClose: true,
        message: '登录失败',
        type: 'error',
      })
    } else {
      ElMessage({
        showClose: true,
        message: '登录成功',
        type: 'success',
      })
      window.sessionStorage.setItem('token', res.data.token);
      router.push('/home')
    }
  })
}

const resetForm = () => {
  ruleFormRef.value.resetFields()
}

</script>

<style lang='less' scoped>
.login_bg{
  background:url("~@/assets/login.jpg") no-repeat;
  background-size:cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_container{
    width: 450px;
    height: 300px;
    border: 1px solid rgb(204, 204, 204);
    background: rgba(255,255,255,0.9);
    border-radius: 5px;
    box-shadow: 3px 3px 4px rgb(51, 41, 41);
    padding: 0 20px;
    .headimg{
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px;
      position: relative;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: rgba(255,255,255,0.8);
      }
    }

  }
}
.buttons{
  display: flex;
  padding-left: 70px;
}
</style>
