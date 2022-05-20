import instance from '../index'

export function getQuestion(){
  return instance.request({
    url: '/question',
    method: 'get',
    })
}

export function getQuestionById(params){
  return instance.request({
    url: '/question/find',
    method: 'get',
    params
    })
}

export function addQuestion(data){
  return instance.request({
    url: '/question/add',
    method: 'post',
    data,
  })
}

export function updateQuestion(data){
  return instance.request({
    url: '/question/update',
    method: 'post',
    data,
  })
}

export function deleteQuestion(data){
  return instance.request({
    url: '/question/delete',
    method: 'post',
    data,
  })
}