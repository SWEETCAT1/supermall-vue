<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <detail-params-info ref="params" :param-info="itemParams"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" @goCart="goCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailImageInfo from "@/views/detail/childComps/DetailImageInfo";
  import DetailParamsInfo from "@/views/detail/childComps/DetailParamsInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail, Goods, getRecommend} from "@/network/detail";
  import {itemListenerMixin} from "@/common/mixin";
  import {debounce} from "@/common/utils/utils";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    mixins: [itemListenerMixin,],
    data(){
      return {
        iid:null,
        topImages:[],
        goodsInfo:{},
        shopInfo:{},
        detailInfo:{},
        itemParams:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0
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
        // 取出详情参数的信息
        this.itemParams = data.itemParams;
        // 取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
        // 回调函数，虽然dom渲染完了但是图片没有加载完成
        this.$nextTick(()=>{

        })

      })
      // 请求推荐数据
      getRecommend().then(res =>{
        // console.log(res)
        this.recommends = res.data.list
      })
      //给getThemeTopY赋值
      this.getThemeTopY = debounce(()=>{
        // this.themeTopYs = [];
        this.themeTopYs.push(0);
        if (this.$refs.params.$el.offsetTop){
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        }
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)
      })
    },

    activated() {
      this.$refs.scroll.refresh()
    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    updated() {

    },
    methods:{
      detailImageLoad(){
        this.newRefresh()
        //等图片加载完
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      // 滚动内容对应标题
      contentScroll(position){
        const positionY = -position.y

        let length = this.themeTopYs.length
        for (let i=0;i<length;i++){
          if (this.currentIndex !== i && ((i<length-1 && positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1])
            ||(i===length-1 && positionY >= this.themeTopYs[i]))){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart(){
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid = this.goodsInfo.iid
        // console.log(product)
        // 将商品添加到购物车
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart', product)
      },
      goCart(){
        this.$router.push('/cart')
      }
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
    height: calc(100% - 44px - 49px);
  }
</style>
