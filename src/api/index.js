import axios from "axios";
import config from '@/config.js'
const instance = axios.create({
  baseURL: config.baseURL+'/api',
  timeout: 5000,
  headers:{
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
instance.interceptors.request.use(function (config) {
  config.headers.Authorization = window.sessionStorage.getItem('token') || ''
  return config;
})

export default instance