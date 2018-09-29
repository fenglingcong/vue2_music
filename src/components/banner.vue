<template>
  <div id="banner">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in json" :key="index">
          <router-link :to="`/detail/${item.sound.id}`">
            <img :src="item.sound.pic_640" alt="">
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>
<script>
export default {
  props: {
    json: Array
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination'
        },
        paginationClickable: true,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }
      }
    }
  }
}

</script>
<style lang="stylus">
#banner {
  width: 100%;
  padding: 10px;
  height: 4.27rem;
  background-color: #e8e8e8;
  .swiper{
    width: 100%;
    height: 100%;
    .swiper-slide{
      img{
        width: 100%;
        height: auto;
      }
    }
    .swiper-pagination{
      width: 100%;
      left: 0;
      bottom: 6px;
      .swiper-pagination-bullet-active{
        background: #31D873;
      }
    }
  }
}
</style>
