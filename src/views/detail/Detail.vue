<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info :detail-info="detailInfo"></detail-image-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailImageInfo from "@/views/detail/childComps/DetailImageInfo";

  import Scroll from "@/components/common/scroll/Scroll";

  import {getDetail, Goods} from "@/network/detail";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo,
      DetailImageInfo,
    },
    data(){
      return {
        iid:null,
        topImages:[],
        goodsInfo:{},
        shopInfo:{},
        detailInfo:{},

      }
    },
    created() {
      //传入的id
      this.iid = this.$route.params.iid
      // 根据iid请求详细数据
      getDetail(this.iid).then(res =>{
        const data = res.result;
        //获取顶部的轮播数据
        this.topImages = data.itemInfo.topImages;
        // 创建商品的对象
        this.goodsInfo = new Goods(data.itemInfo,data.columns, data.shopInfo.services);
        // 取出店铺的信息
        this.shopInfo = data.shopInfo;
        // 取出详情的信息
        this.detailInfo = data.detailInfo;
      })

    }
  }
</script>

<style scoped>
  .detail{
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>
