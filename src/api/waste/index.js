import instance from '../index'

//params: {page, category?}
export function getWaste(params){
  return instance.request({
    url:'/waste',
    method: 'get',
    params
  })
}
export function getWasteById(params){
  return instance.request({
    url:'/waste/find',
    method: 'get',
    params
  })
}

//params: {category?}
//数量
export function getCount(params){
  return instance.request({
    url:'/waste/count',
    method: 'get',
    params
  })
}

export function addWaste(data){
  return instance.request({
    url: '/waste/add',
    method: 'post',
    data,
  })
}

// 模糊查找
//{name, category?}
export function getWasteByName(params){
  return instance.request({
    url:'/waste/getbyname',
    method: 'get',
    params
  })
}
//编辑删除
export function updateWaste(data){
  return instance.request({
    url:'/waste/update',
    method: 'post',
    data
  })
}

//分类信息
export function getWasteType(){
  return instance.request({
    url:'/waste/category',
    method: 'get'
  })
}
export function getWasteTypeById(params){
  return instance.request({
    url:'/waste/category/find',
    method: 'get',
    params
  })
}
export function updateWasteType(data){
  return instance.request({
    url:'/waste/category/update',
    method: 'post',
    data
  })
}