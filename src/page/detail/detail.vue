<template>
  <div class="detail" v-if="audio.data">
    <!-- 用户 -->
    <div class="sound_user">
      <span class="user_img">
        <img :src="audio.data.sound.user.avatar_50" alt="">
        <img src="https://ws-qn-echo-image-cdn.app-echo.com/Foz1CX1MdKHnTiDV26btgAmDJ3Y-?imageMogr2/auto-orient/quality/100%7CimageMogr2/thumbnail/!100x100r/gravity/Center/crop/100x100/dx/0/dy/0" alt="" class="v-icon">
      </span>
      <span class="user_name">{{ audio.data.sound.user.name }}</span>
      <span class="user_fans">粉丝<em> {{ audio.data.sound.user.followed_count }}</em></span>
    </div>
    <!-- 封面 -->
    <div class="sound_cover">
      <!-- 弹幕 -->
      <div class="danmu_box" @click.stop="set_audio_play(!audio.play)"></div>
      <img :src="audio.data.sound.pic_500" alt="">
      <!-- 进度条 -->
      <div class="progress_bar" @click.stop="seek">
        <span :style="`width: ${$store.getters.audio_progress}`"></span>
        <em>{{ audio.currentTime | sec2his }}/{{ audio.duration | sec2his }}</em>
      </div>
      <!-- 控制 -->
      <div class="controls">
        <div class="play_btn play" :class="audio.play ? 'play' : 'pause'" @click.stop="set_audio_play(!audio.play)"></div>
        <div class="info">
          <p class="sound_name">{{ audio.data.sound.name }}</p>
          <p>
            <span class="sound_author"><em>{{ audio.data.sound.user.name }}</em></span> 发布在
            <span class="sound_channel"><em>{{ audio.data.sound.channel.name}}</em></span> 频道
          </p>
        </div>
        <!-- 弹幕按钮 -->
        <div class="danmu_btn" :class="danmu ? 'on' : 'off'" @click.stop="danmu = !danmu"></div>
      </div>
    </div>
    <!-- 信息 -->
    <div class="sound_info">
      <!-- 基本信息 -->
      <div class="info_bar">
        <div class="play_num num">{{ audio.data.sound.view_count }} 播放</div>
        <div class="like_num num">{{ audio.data.sound.like_count }} 喜欢</div>
        <div class="to_bell_btn">设为手机铃声</div>
      </div>
      <div class="info_lyric">
        <template v-if="audio.data.sound.song_info">
          <p v-if="audio.data.sound.song_info.album_name">{{ audio.data.sound.song_info.album_name.type }} : {{ audio.data.sound.song_info.album_name.name }}</p>
          <p v-if="audio.data.sound.song_info.author">{{ audio.data.sound.song_info.author.type }} : {{ audio.data.sound.song_info.author.name }}</p>
          <p v-if="audio.data.sound.song_info.name">{{ audio.data.sound.song_info.name.type }} : {{ audio.data.sound.song_info.name.name }}</p>
        </template>
        <p v-if="audio.data.sound.lyrics" v-html="audio.data.sound.lyrics">歌词</p>
        <p v-if="!audio.data.sound.song_info && !audio.data.sound.lyrics" class="no_lyric">没有相关的歌词T ~ T</p>
      </div>
    </div>
    <!-- 更多推荐 -->
    <div class="sound_more">
      <h3>相关推荐</h3>
      <div class="recommend">
        <my-list :json="otherJson"></my-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      otherJson: [],
      danmu: false
    }
  },
  computed: {
    ...mapState([
      'audio'
    ])
  },
  watch: {
    $route (to, from) {
      if (this.$route.path.includes('detail')) {
        this.init()
      }
    }
  },
  methods: {
    ...mapMutations([
      'set_audio_data',
      'set_audio_ele',
      'set_audio_play'
    ]),
    ...mapActions([
      'get_music_data',
      'get_other_data'
    ]),
    // 获取音乐数据
    get_sound () {
      this.get_music_data(this.$route.params.id)
        .then(res => {
          console.log(res)
          if (res) {
            this.set_audio_data(res)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取推荐数据
    get_recommend () {
      this.get_other_data()
        .then(res => {
          if (res.data) {
            this.otherJson = res.data
          };
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击调节进度条
    seek (e) {
      e = e || window.event
      var percent = (e.pageX / window.innerWidth).toFixed(2)
      this.audio.ele.currentTime = this.audio.ele.duration * percent
    },
    init () {
      this.get_sound()
      this.get_recommend()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="stylus">
.detail{
  position: relative;
  width: 100%;
  background: #f6f6f6;
  -webkit-overflow-scrolling: touch;
  span{
    display: inline-block;
    color: #666;
    em{
      color: #6ed56c;
      font-size: 12px;
    }
  }
  .sound_user{
    position: relative;
    padding: 0 15px;
    width: 100%;
    height: 50px;
    background: #fdfdfd;
    line-height: 50px;
    .user_img{
      position: relative;
      margin: 7px 0;
      vertical-align: top;
      width: 36px;
      height: 36px;
      overflow: hidden;
      img{
        width: 100%;
        border-radius: 50%;
      }
      .v-icon{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
      }
    }
    .user_name{
      padding-left: 10px;
      text-align: left;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .user_fans{
      float: right;
      font-size: 12px;
      em{
        color: #00ae05;
      }
    }
  }
  .sound_cover{
    position: relative;
    width: 100%;
    height: 360px;
    img{
      width: 100%;
      height: 360px;
      object-fit: cover;
    }
    .danmu_box{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 260px;
    }
    .progress_bar{
      position: absolute;
      bottom: 55px;
      width: 100%;
      height: 16px;
      background: rgba(0, 0, 0, .2);
      line-height: 16px;
      font-size: 12px;
      color: #fff;
      span{
        position: absolute;
        top: 0;
        left: 0;
        width: 20%;
        height: 100%;
        background: rgba(110, 213, 108, 0.3);
        &:after{
          position: absolute;
          top: 0;
          display: inline-block;
          content: "";
          width: 6px;
          height: 100%;
          background: #6ed56c;
        }
      }
      em{
        padding-left: 10px;
      }
    }
    .controls{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 55px;
      background: rgba(0, 0, 0, .5);
      display: flex;
      align-items: center;
      .play_btn{
        margin: 0 10px;
        width: 36px;
        height: 36px;
        background-size: cover;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        &.play{
          background-image: url(../../assets/img/play.png);
        }
        &.pause{
          background-image: url(../../assets/img/pause.png);
        }
      }
      .info{
        flex: 1;
        height: 36px;
        vertical-align: top;
        overflow: hidden;
        color: #fff;
        p{
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          line-height: 1.43;
          font-size: 12px;
        }
        .sound_name{
          font-size: 14px;
        }
      }
      .danmu_btn{
        margin: 0 12px;
        width: 55px;
        height: 25px;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 14px;
        &.on{
          background-image: url(../../assets/img/danmu_on.png);
        }
        &.off{
          background-image: url(../../assets/img/danmu_off.png);
        }
      }
    }
  }
  .sound_info{
    margin-bottom: 10px;
    width: 100%;
    background: #fff;
    .info_bar{
      padding: 0 16px;
      width: 100%;
      height: 52px;
      border-bottom: 1px solid #e8e8e8;
        line-height: 52px;
      font-size: 0;
      div{
        display: inline-block;
      }
      .num{
        margin-right: 20px;
        height: 100%;
        font-size: 12px;
        color: #a9a9a9;
        &:before{
          margin-right: 6px;
          display: inline-block;
          content: "";
          background-size: cover;
          background-repeat: no-repeat;
        }
        &.play_num:before{
          width: 8px;
          height: 9px;
          background-image: url(../../assets/img/play_num.png);
        }
        &.like_num:before{
          width: 11px;
          height: 9px;
          background-image: url(../../assets/img/like_num.png);
        }
      }
      .to_bell_btn{
        float: right;
        height: 100%;
        font-size: 13px;
        color: #6ed56c;
        &:before{
          content: "";
          display: inline-block;
          margin-right: 6px;
          position: relative;
          top: 3px;
          width: 20px;
          height: 20px;
          background-image: url(../../assets/img/bell.png);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }
    .info_lyric{
      padding: 14px 15px 8px;
      text-align: left;
      white-space: pre-wrap;
      line-height: 1.5;
      font-size: 14px;
      .no_lyric{
        text-align: center;
        color: #999;
      }
      p{
        line-height: 1.2;
      }
    }
  }
  .sound_more{
    width: 100%;
    background: #fff;
    h3{
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 14px;
      color: #6ed56c;
    }
    .recommend{
      position: relative;
      padding-top: 15px;
      width: 100%;
    }
  }
}
</style>
