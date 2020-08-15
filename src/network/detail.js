import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class Goods{
  constructor(iteminfo, columns,service) {
    this.title = iteminfo.title;
    this.price = iteminfo.price;
    this.oldPrice = iteminfo.oldPrice;
    this.discount = iteminfo.discountDesc;
    this.discountBgColor = iteminfo.discountBgColor;
    this.columns = columns;
    this.services = service
  }
}


