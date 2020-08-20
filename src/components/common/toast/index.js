import Toast from './Toast'

const obj = {}

obj.install = function (Vue){
  // 创建一个组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 创建一个组件对象
  const toast = new toastContrustor()

  // 把组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // toast.$el对应的就是div了
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj
