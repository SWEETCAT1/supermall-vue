<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" ref="tabControl1" class="tab-control"
                 @tabClick="tabClick" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="Loadmore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" ref="tabControl2"
                  @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods" @goodsitemLoad="goodsitemLoad"></goods-list>
    </scroll>
    <!--native为自定义标签绑定原生Dom事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "@/views/home/childComps/FeatureView";

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";

  import {
    getHomeMultidata,
    getHomeGoods
  } from "@/network/home";
  import {itemListenerMixin} from "@/common/mixin";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    // 创建时立刻请求
    created() {
      // 这里是异步操作！！！
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // const newRefresh = debounce(this.$refs.scroll.refresh, 100)
      // // 监听item中图片加载完成
      // this.$bus.$on('itemImageLoad',()=> {
      //   newRefresh()
      // })

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 保存y值
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY)
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      //事件监听
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop';break
          case 1:
            this.currentType = 'new';break
          case 2:
            this.currentType = 'sell';break
        }

        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        this.isShowBackTop = (position.y) < -1000

        this.isTabFixed = -(position.y) > this.tabOffsetTop
      },

      //网络请求
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          // console.log(res)
          // ...的意思是解构遍历res
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },
      Loadmore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.$refs.tabControl.$el.offsetTop)
      },
      goodsitemLoad(){
        this.newRefresh()
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;

    /*原生滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content{
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    /*margin-top: 44px;*/

    position: absolute;
    top: 44px;
    bottom:49px;
    left:0;
    right:0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
