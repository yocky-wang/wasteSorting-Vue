import instance from '../index'

//查看所有用户
export function getuserlist(){
  return instance.request({
    url: '/frontuser',
    method: 'get'
  })
}
//id-用户信息
export function getuserbyid(params){
  return instance.request({
    url: '/frontuser/find',
    method: 'get',
    params
  })
}
//用户注册
export function adduser(data){
  return instance.request({
    url: '/frontuser/add',
    method: 'post',
    data,
  })
}
//删除用户
export function deleteuser(data){
  return instance.request({
    url: '/frontuser/delete',
    method: 'post',
    data,
  })
}
//更新用户
export function updateuser(data){
  return instance.request({
    url: '/frontuser/update',
    method: 'post',
    data
  })
}
export function updateuserstatus(data){
  return instance.request({
    url: '/frontuser/update/status',
    method: 'post',
    data
  })
}