<template>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item"
             :class="{active:index === navcurrentIndex}" @click="titleClick(index)" :key="index">
          {{item}}
        </div>
      </div>
    </nav-bar>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        navcurrentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.navcurrentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 13px;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>
