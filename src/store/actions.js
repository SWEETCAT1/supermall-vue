import {
  ADDTOCART,
  ADD_COUNTER,
} from "@/store/mutation-types";

export default {
  addCart(context, payload){
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct){
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
    } else{
      payload.count = 1
      context.commit(ADDTOCART, payload)
    }
  }
}
