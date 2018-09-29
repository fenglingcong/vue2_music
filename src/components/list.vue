<template>
  <div>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in json" :key="index">
        <router-link :to="url(item.sound.id)">
          <div class="pic_wrap">
            <img :src="item.sound.pic_500" alt="">
            <span class="fire" v-if="item.sound.is_hot" :class="hotClass(item.sound.is_hot)"></span>
          </div>
        </router-link>
        <!-- 名字 -->
        <h4>{{ item.sound.name }}</h4>
        <p class="channel">
          <a>{{ item.sound.channel.name }}</a>
          频道
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    json: {
      type: Array,
      default: () => [
        {
          sound: {
            pic_500: 'https://al-qn-echo-image-cdn.app-echo.com/Fkqz-FBIuQmsv99Zw1sV2KFu6gqj?imageMogr2/auto-orient/quality/100%7CimageView2/0/w/500/q/100',
            is_hot: 1,
            id: 315433,
            name: '革命哥哥民歌手大两房',
            channel: {
              name: '频道名字名字'
            }
          }
        }
      ]
    }
  },
  methods: {
    url (id) {
      return `/detail/${id}`
    },
    // 热度
    hotClass (hot) {
      switch (hot) {
        case 1: return 'fire-red'
        case 3: return 'fire-yellow'
        case 4: return 'fire-blue'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.list{
  font-size: 0;
  .list-item{
    display: inline-block;
    padding: 0 10px 6px;
    width: 50%;
    a{
      text-decoration: none;
    }
    .pic_wrap{
      position: relative;
      width: 100%;
      overflow-y: hidden;
      img{
        width: 100%;
      }
      .fire{
        position: absolute;
        top: 15px;
        right: 15px;
        display: block;
        width: 22px;
        height: 22px;
        background-image: url(../assets/icon/echo_mobile_sprites@3_8.png);
        background-repeat: no-repeat;
        background-size: 320px;
        &.fire-red{
          background-position: -162px -215px;
        }
        &.fire-yellow{
          background-position: 0 -215px;
        }
        &.fire-blue{
          background-position: -299px  -215px;
        }
      }
    }
    h4{
      padding-top: 5px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: #666;
    }
    .channel{
      font-size: 12px;
      color: #999;
      a{
        display: inline-block;
        width: 75%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: middle;
        color: #7dd97f;
      }
    }
  }
}
</style>
