import instance from '../index'


export function loginPost(data){
  return instance.request({
    url: '/login',
    method: 'post',
    data,
  })
}