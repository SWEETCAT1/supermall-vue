import {
  ADD_COUNTER,
  ADDTOCART
} from "@/store/mutation-types";

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADDTOCART](state, payload){
    state.cartList.push(payload)
  }
}
