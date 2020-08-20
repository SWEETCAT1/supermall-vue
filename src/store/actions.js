import {
  ADDTOCART,
  ADD_COUNTER,
} from "@/store/mutation-types";

export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct){
        // oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1！')
      } else{
        payload.count = 1
        context.commit(ADDTOCART, payload)
        resolve('成功添加新的商品！')
      }
    })
  }
}
