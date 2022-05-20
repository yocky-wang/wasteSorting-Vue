<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据管理</el-breadcrumb-item>
    <el-breadcrumb-item>分类管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" size="large" @click="add" disabled="true">添加分类</el-button>
      </el-col>
    </el-row>
    <el-table :data="wasteTypeList" border stripe>
        <el-table-column label="ID" prop="id" width="70px"></el-table-column>
        <el-table-column label="分类名称" prop="typename" width="200px"></el-table-column>
        <!-- 描述 -->
        <el-table-column label="描述" prop="content"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template #default="scope">
            <el-button type="primary" @click="edit(scope.row)"><i class="iconfont icon-icon"></i>编辑</el-button>
            <el-popconfirm title="确定删除吗？">
              <template #reference>
                <el-button  type="danger" disabled="true"><i class="iconfont icon-icon1"></i>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
  </el-card>
  <el-dialog  v-model="editWasteTypeDialogVisible" title="编辑分类" @close="editWasteTypeDialogClose" center width="600px"
  @open="editWasteTypeDialogOpen">
    <el-form :model="editWasteTypeForm" ref="editWasteFormRef" label-width="100px">
      <el-form-item label="分类名称" label-width="80px" prop="typename" >
        <el-input disabled v-model="editWasteTypeForm.typename" ></el-input>
      </el-form-item>
      <el-form-item label="分类描述" label-width="80px" prop="content">
        <el-input type="textarea" v-model="editWasteTypeForm.content" rows="10"></el-input>
      </el-form-item>
    </el-form>  
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editWasteTypeDialogClose">取 消</el-button>
        <el-button type="primary" @click="editWasteDialogConfirm">确 定</el-button>
        <!-- <div>{{editDataform}}</div> -->
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref,reactive, onMounted} from 'vue'
import {getWasteType,getWasteTypeById,updateWasteType} from '@/api/waste'
import { ElMessage } from 'element-plus'

let wasteTypeList = ref([])
const get_waste_type = async ()=>{
  let {data:res} = await getWasteType()
  wasteTypeList.value = res.data
}
onMounted(()=>{get_waste_type()})

// edit
let editWasteTypeDialogVisible = ref(false)
let editWasteFormRef = ref(null)
let editWasteTypeForm = ref({})
let wasteTypeId = ref(0)
const edit = async (row)=>{
  wasteTypeId.value = row.id
  let {data:res} = await getWasteTypeById({id:wasteTypeId.value})
  editWasteTypeForm.value = res.data
  editWasteTypeDialogVisible.value=true
}
const editWasteTypeDialogClose = ()=>{
  editWasteTypeDialogVisible.value=false
  editWasteFormRef.value.resetFields()
}
const editWasteDialogConfirm = async ()=>{
  let {data:res} = await updateWasteType(editWasteTypeForm.value)
  if(res.code==200){
    editWasteTypeDialogVisible.value=false
    ElMessage.success('更改成功')
    editWasteFormRef.value.resetFields()
    get_waste_type()
  } else {
    editWasteTypeDialogVisible.value=false
    ElMessage.success('更改失败')
    editWasteFormRef.value.resetFields()
  }
}


</script>

<style lang='less' scoped>
.el-table{
  margin-top: 15px;
}
</style>
