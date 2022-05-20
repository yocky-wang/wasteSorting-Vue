import instance from '../index'

//acticle 更改
//params:{category?}
export function getArticle(params){
  return instance.request({
    url: '/article',
    method: 'get',
    params
    })
}
export function getArticleById(params){
  return instance.request({
    url: '/article/find',
    method: 'get',
    params
    })
}

export function addArticle(data){
  return instance.request({
    url: '/article/add',
    method: 'post',
    data,
  })
}

export function updateArticle(data){
  return instance.request({
    url: '/article/update',
    method: 'post',
    data,
  })
}

export function updateArticleStatus(data){
  return instance.request({
    url: '/article/update/status',
    method: 'post',
    data,
  })
}
// {id}
export function deleteArticle(data){
  return instance.request({
    url: '/article/delete',
    method: 'post',
    data,
  })
}

export function getArticleType(){
  return instance.request({
    url: '/article/category',
    method: 'get'
    })
}
export function getArticleTypeById(params){
  return instance.request({
    url: '/article/category/find',
    method: 'get',
    params
    })
}
export function updateArticleType(data){
  return instance.request({
    url: '/article/category/update',
    method: 'post',
    data,
  })
}