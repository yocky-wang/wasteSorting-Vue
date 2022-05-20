// import * as tf from '@tensorflow/tfjs'
// importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js')
importScripts('https://cdn.staticfile.org/tensorflow/2.6.0/tf.min.js')

const img_tensor = (imageData)=>{
  return tf.tidy(()=>{
    let imgTensor = tf.browser.fromPixels(imageData)
    // let newImgTensor = tf.image.resizeBilinear(imgTensor, [224,224])
    return tf.reshape(imgTensor.toFloat().sub(255/2).div(255/2), [1,224,224,3])
  })
}
const handleTensor = async (labelUrl,modelUrl, imageData)=>{
  let labels = await fetch(labelUrl).then((res)=>res.json()).catch((err)=>{console.log(err)})
  let imgTs = img_tensor(imageData)
  let model = await tf.loadLayersModel(modelUrl)
  let res = model.predict(imgTs).arraySync()[0].map((item,index)=>{return {
    label: labels[index],
    result: item
  }})
  return res
}

self.onmessage = async (e)=>{
  let res = await handleTensor(e.data.labelUrl,e.data.modelUrl,e.data.imageData)
  self.postMessage(res)
  // self.close()
}