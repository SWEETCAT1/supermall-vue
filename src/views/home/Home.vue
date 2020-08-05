<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import {getHomeMultidata} from "@/network/home";

  export default {
    name: "Home",
    components:{
      NavBar
    },
    data(){
      return {
        banners:[],
        recommends:[]
      }
    },
    // 创建时立刻请求
    created() {
      // 这里是异步操作！！！
      getHomeMultidata().then(res =>{
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      })}
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }

</style>
