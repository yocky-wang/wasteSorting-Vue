import instance from '../index'

//acticle 更改
export function getChart1(){
  return instance.request({
    url: '/chart/1',
    method: 'get'
    })
}
export function getChart2(){
  return instance.request({
    url: '/chart/2',
    method: 'get'
    })
}