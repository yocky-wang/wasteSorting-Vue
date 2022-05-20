<template>
  <div class="recognition">
    <div class="btn">
      <el-button v-if="!isTrain" type="primary" size="large" plain @click="btnUpload">
        选择图片<i class="iconfont icon-ic_image_upload"></i>
        <input ref="fileInputRef" type="file" style="display:none" @change="imgUpload($event)">
      </el-button>
      <el-button v-else type="info" loading size="large">正在运算</el-button>
    </div>
    <div class="imgcontainer">
    <img v-if="isSrc" ref="imgRef"  alt="" class="view" :src="imgsrc">
     <div v-else class="default_img"></div>
    </div>
  </div>
  <canvas style="display:none" width="224" height="224" ref="canvasRef"></canvas>
</template>

<script setup>
import {ref,reactive,defineProps, onMounted, nextTick, onUnmounted} from 'vue'
import TsWorker from '@/utils/TsWorker.worker.js';

let props = defineProps({
  width: Number,
  labelUrl: String,
  modelUrl: String
})
//success
let emits = defineEmits(['success'])

// upload
let fileInputRef = ref(null)
const btnUpload = ()=>{
  fileInputRef.value.click()
}

// worker
// const createWorker = (func) => {
//   var blob = new Blob(['(' + func.toString() +')()'])
//   var url = window.URL.createObjectURL(blob)
//   var worker = new Worker(url)
//   return worker
// }
// canvas
let canvasRef = ref(null)
const getImgData = (url,width,height)=>{
  return new Promise((resolve,reject)=>{
    let ctx = canvasRef.value.getContext("2d")
    let IMG = new Image()
    IMG.src = url
    IMG.onload = ()=>{
      console.log(IMG.width,IMG.height)
      ctx.drawImage(IMG,0,0,IMG.width,IMG.height,0,0,224,224)
      let imgData = ctx.getImageData(0,0,224,224)
      resolve(imgData)
    }
  })
}


// worker
let isTrain = ref(false) //loading icon
const worker1 = new TsWorker()
worker1.onmessage = (e)=>{
      let res = e.data
      isTrain.value = false
      res.sort((a,b)=>b.result-a.result)
      emits("success",res)
      // worker1.terminate()
  }

//img
let imgsrc = ref('')
let isSrc = ref(false)
let imgRef = ref(null)
const imgUpload = async (e)=> {
  isSrc.value = true
  let file = e.target.files[0]
  imgsrc.value = URL.createObjectURL(file)
  nextTick(async ()=>{
    isTrain.value = true
    let imgData = await getImgData(imgsrc.value,imgRef.value.width,imgRef.value.clientHeight)
    // let res = await handleTensor(props.labelUrl,model,imgData)
    worker1.postMessage({labelUrl:props.labelUrl,modelUrl:props.modelUrl,imageData:imgData})
  })
}
onUnmounted(()=>{
  worker1.terminate()
})

</script>

<style lang='less' scoped>
.recognition{
  width: 500px;
  height: 450px;
}
.btn{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15%;
}
.imgcontainer{
  height: 70%;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;    
    /*height: 4px;*/
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
}
.icon-ic_image_upload{
  margin-left: 5px;
}
.default_img{
  height: 100%;
  background: rgb(221, 221, 221);
}
.view{
  width: 100%
}
canvas{
  width: 224px!important;
  height: 224px!important;
}
</style>
