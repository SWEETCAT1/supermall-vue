// 首页数据请求

import {request} from "@/network/request";

export function getHomeMultidata(){
  return request(({
    url:'/home/multidata'
  }))
}
