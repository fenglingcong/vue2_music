<template>
  <div id="index">
    <!-- banner -->
    <my-banner :json="bannerJson"></my-banner>
    <!-- recommend -->
    <div class="recommend">
      <h3 class="recommend_title">每日推荐</h3>
      <!-- 一键播放 -->
      <div class="recommend_tip" @click.stop="playAll">一键播放</div>
      <!-- 推荐列表 -->
      <my-list :json="recommendJson"></my-list>
    </div>
    <div class="loadingText">
      <div class="loading" v-if="loading === 'loading'">加载中...</div>
      <div class="nothing" v-else-if="loading === 'nothing'">没有数据啦~</div>
      <div class="nothing error" v-else-if="loading === 'error'">出错啦</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      bannerJson: [],
      recommendJson: [],
      page: 1,
      lock: false,
      loading: 'loading'
    }
  },
  computed: {
    ...mapState([
      'audio'
    ])
  },
  methods: {
    ...mapMutations([
      'set_audio_data',
      'set_playList'
    ]),
    ...mapActions([
      'get_banner_data',
      'get_recommend_data'
    ]),
    // 获取banner数据
    get_banner () {
      this.get_banner_data()
        .then(res => {
          if (res.data) {
            this.bannerJson = res.data
            // console.log(res)
          };
        })
        .catch(err => {
          console.log('get_banner', err)
        })
    },
    // 获取推荐数据
    get_recommend () {
      this.get_recommend_data(this.page)
        .then(res => {
          if (res.data.length) {
            this.recommendJson = res.data
            this.page = 2
          }
          // console.log(res)
        })
        .catch(err => {
          console.log('get_recommend', err)
        })
    },
    // 获取更多数据
    get_recommend_more () {
      this.lock = true
      this.loading = 'loading'
      this.get_recommend_data(this.page)
        .then(res => {
          if (res.data) {
            this.recommendJson.push(...res.data)
            this.page++
          } else {
            this.loading = 'nothing'
          }
          this.lock = false
        })
        .catch(err => {
          this.loading = 'error'
          this.lock = false
          console.log(err)
        })
    },
    // 一键播放
    playAll () {
      this.set_playList(this.recommendJson)
      if (this.audio.data && this.recommendJson[0].sound.id === this.audio.data.sound.id) {
        this.audio.ele.load()
        this.audio.ele.play()
      } else {
        this.set_audio_data(this.recommendJson[0])
      }
    },
    // 自行实现滚动到页面底部加载
    onScroll () {
      let timeoutRef
      if (timeoutRef) {
        clearTimeout(timeoutRef)
      }
      timeoutRef = setTimeout(() => {
        let scrollTop = $(window).scrollTop()
        let windowHeight = $(window).height()
        let docHeight = $('#index').height()
        let distance = 5
        let isBottom = scrollTop + windowHeight + distance >= docHeight
        let isLock = this.lock
        if (isBottom && !isLock && this.loading !== 'nothing' && this.recommendJson.length > 0) {
          this.get_recommend_more()
        }
      }, 150)
    },
    init () {
      this.get_banner()
      this.get_recommend()
      this.$nextTick(() => {
        $(window).on('scroll', this.onScroll)
      })
    }
  },
  mounted () {
    this.init()
  },
  // 开启keep-alive的时候进入页面钩子
  activated () {
    $(window).on('scroll', this.onScroll)
  },
  // 离开页面钩子
  beforeRouteLeave (to, from, next) {
    $(window).on('scroll', this.onScroll)
    next()
  }
}
</script>

<style lang="stylus">
.recommend {
  width: 100%;
  position: relative;
  .recommend_title {
    width: 120px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    font-weight: 400;
    color: #639E5E;
    background-color: #d6ffd6;
    text-align: center;
    border-radius: 13px;
    margin: 20px auto;
  }
  .recommend_tip{
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 22;
    padding: 0 16px;
    height: 28px;
    background-color: #6ed56c;
    background-image: url('../../assets/img/play-all.png');
    background-repeat: no-repeat;
    background-position: 10px 5px;
    background-size: 18px;
    border-radius: 14px;
    line-height: 28px;
    text-indent: 22px;
    font-size: 14px;
    color: #fff;
  }
}
.loadingText{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #999;
  .loading, .nothing{
    width: 100%;
    height: 100%;
  }
  .error{
    color: red;
  }
}
</style>
