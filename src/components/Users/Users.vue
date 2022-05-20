<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="1">
                <el-button type="primary" size="large" @click="addDialogVisible=true">添加角色</el-button>
            </el-col>
        </el-row>
        <el-table :data="userlist" border stripe>
          <!-- <el-table-column label="ID" prop="id" width="50px"></el-table-column> -->
          <el-table-column type="index" width="50" />
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="密码" prop="password"></el-table-column>
          <el-table-column label="手机号" prop="mobile"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="身份" prop="role">
            <template #default="scope">
              <span v-if="scope.row.role==1">管理员</span>
              <span v-else>普通用户</span>
            </template>
          </el-table-column>
          <el-table-column label="账号状态" prop="status">
            <template #default="scope">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"
              inline-prompt active-text="正常"  inactive-text="冻结"
              @change="userStatusChange(scope.row)" size="large" :width="70"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="200px">
            <template #default="scope">
                <el-button @click="clickEdit(scope.row)" type="primary"><i class="iconfont icon-icon"></i>编辑</el-button>
                <el-popconfirm title="确定删除吗？" @confirm="deletebtn(scope.row)">
                  <template #reference>
                    <el-button  type="danger"><i class="iconfont icon-icon1"></i>删除</el-button>
                  </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <AddDialog :addDialogVisible="addDialogVisible" @close="addDialogClose" @addSuccess="addSuccess"></AddDialog>
    <!-- <Test></Test> -->
    <EditDialog :editDialogVisible="editDialogVisible" @close="editDialogClose" @editSuccess="editSuccess"
    :userId="userId"></EditDialog>
    
  </div>
</template>

<script setup>
import {ref,reactive,onMounted, nextTick} from 'vue'
import {getuserlist, deleteuser,updateuserstatus} from '@/api/users'
import AddDialog from './Dialog/AddDialog'
import EditDialog from './Dialog/EditDialog'
import { ElMessage } from 'element-plus'
//.................
let userlist = ref([])
let userId = ref(null)
const editDataform = ref({
  username: '',
  password: '',
  mobile: '',
  email: '',
  status: '',
  role: ''
})
let addDialogVisible = ref(false)
let editDialogVisible = ref(false)
//...............
const get_userlist = async ()=>{
  let {data: res} = await getuserlist()
  userlist.value = res.data
}

onMounted(get_userlist())

//adddialog
const addDialogClose = ()=>{
  addDialogVisible.value = false
}
const addSuccess = ()=>{
  get_userlist()
}

//editdialog
const editSuccess = ()=>{
  get_userlist()
}
const editDialogClose = ()=>{
  editDialogVisible.value = false
}
const clickEdit = (row)=>{
  editDialogVisible.value = true
  userId.value = row.id
}
// status
const userStatusChange = async (row)=>{
  let {data:res} = await updateuserstatus({id:row.id,status:row.status})
  if (res.code==200) {
    ElMessage.success("更改状态成功")
  } else {
    ElMessage.error("更改状态失败")
  }
}

// delete
const deletebtn = async (row)=>{
  console.log(row,'row')
  let {data:res} = await deleteuser({id: row.id})
  if(res.code == 200){
    ElMessage({
        showClose: true,
        message: '删除成功',
        type: 'success',
      })
    get_userlist() 
  } else {
    ElMessage.error('删除失败')
  }
}



</script>

<style lang='less' scoped>
.el-card{
  min-height: 70vh;
}
.el-row{
  margin-bottom: 20px;
}
.iconfont{
  margin-right: 5px;
}
</style>
