// 封装axios网络库
import axios from 'axios'

export function request(config){
  // 1.创建实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout: 5000
  })
  //axios拦截器
  // 请求拦截
  instance.interceptors.request.use(aaa=>{
    // 一般config信息不符合服务器的要求
    // 每次发送网络请求时，都希望在界面中显示图标
    // 某些网路请求必须携带特殊信息，比如token
    // console.log(aaa);
    return aaa
  },error => {})

  // 响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data
  },err=>{
    console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
}
