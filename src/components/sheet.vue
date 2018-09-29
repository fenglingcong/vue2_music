<template>
  <div class="sheet">
    <mu-container>
      <mu-bottom-sheet class="playListSheet" :open.sync="playList_visible" :overlay-opacity="0" @click.stop="playList_visible = false">
        <div class="playList-header">
          播放列表
          <span>({{ playList.length }}首)</span>
          <mu-icon class="playMode_btn" :value="playMode_icon" @click.stop="playMode_visible = true"></mu-icon>
        </div>
        <mu-list class="list">
          <mu-list-item button class="list-item" v-for="(item, index) in playList" :key="index" :class="{'playing': audio.data.sound.id === item.sound.id }" @click.stop="set_audio_data(item)">
            <mu-icon v-show="audio.data.sound.id === item.sound.id" class="playing_icon mu-item-left" value="play_circle_filled"></mu-icon>
            <p class="mu-item-content">{{item.sound.name}}</p>
            <!-- 删除按钮 -->
            <mu-icon class="close_btn mu-item-right" value="close" @click.stop="deleteItem(item)"></mu-icon>
          </mu-list-item>
          <mu-list-item class="list-item list-item-nothing" v-if="playList.length === 0">
            <p class="mu-item-content">什么都没有了T~T</p>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
      <!-- 播放模式 -->
      <mu-bottom-sheet class="playModeSheet" :open.sync="playMode_visible" @close="playMode_visible = false">
        <mu-list class="list">
          <mu-list-item button class="list-item" v-for="item in playMode_item" :key="item.val" @click="playModeChange(item.val)" :class="{selected: playMode === item.val}">
            <mu-list-item-title>{{ item.title }}</mu-list-item-title>
            <mu-icon :value="item.icon"></mu-icon>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </mu-container>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      playMode_item: [
        { title: '默认', val: 'default', icon: 'more_vert' },
        { title: '随机播放', val: 'random', icon: 'all_inclusive' },
        { title: '单曲循环', val: 'singleRepeat', icon: 'repeat_one' },
        { title: '列表循环', val: 'listRepeat', icon: 'repeat' }
      ],
      playList_visible: false,
      playMode_visible: false
    }
  },
  computed: {
    ...mapState([
      'audio',
      'playMode',
      'playList'
    ]),
    // 播放模式切换
    playMode_icon () {
      switch (this.playMode) {
        case 'random': return 'all_inclusive'
        case 'singleRepeat': return 'repeat_one'
        case 'listRepeat': return 'repeat'
        default: return 'more_vert'
      }
    }
  },
  watch: {
    $route (val) {
      // 路由跳转 关闭sheet模态框
      this.playList_visible = false
      this.playMode_visible = false
    }
  },
  methods: {
    ...mapMutations([
      'set_audio_data',
      'set_playMode',
      'set_playList'
    ]),
    toggleVisible () {
      this.playList_visible = !this.playList_visible
    },
    playModeChange (val) {
      this.set_playMode(val)
      this.playMode_visible = false
    },
    deleteItem (item) {
      let index = this.playList.findIndex(n => n.sound.id === item.sound.id)
      this.playList.splice(index, 1)
      this.set_playList(this.playList)
    }
  }
}
</script>
<style lang="stylus">
.playListSheet{
  bottom: 50px;
  max-height: 188px;
  border-top: 1px solid #eee;
  .playList-header{
    margin-top: 6px;
    position: relative;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    color: #6ed56c;
    span{
      font-size: 12px;
    }
    .playMode_btn{
      position: absolute;
      top: 0;
      right: 5px;
      padding: 0;
      width: 38px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      .mu-icon{
        font-size: 20px;
      }
    }
  }
  .list{
    position: relative;
    max-height: 150px;
    overflow-x: hidden;
    .list-item{
      position: relative;
      &:before{
        content: '';
        position: absolute;
        top: 20px;
        left: 16px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #e8e8e8;
      }
      &.playing .mu-item{
        color: #333;
      }
      &:last-child .mu-item{
        border: none;
      }
      .mu-item {
        font-size: 14px;
        color: #999;
        padding: 6px 16px 6px 38px;
        border-bottom: 1px solid #f4f4f4;
        min-height: 0;
        .mu-item-content {
          padding-right: 6px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .mu-item-left {
          position: absolute;
          left: 18px;
          margin-left: -5px;
        }
      }
      .playing_icon {
        color: #6ed56c;
        font-size: 18px;
      }
      .close_btn {
        z-index: 1000;
        font-size: 16px;
        color: #bababa;
        border: 1px solid #bababa;
        border-radius: 100%;
      }
    }
    .list-item-nothing{
      font-size: 14px;
      color: #999;
      .mu-item{
        padding: 0;
      }
      .mu-item-content{
        text-align: center;
      }
      &:before{
        width: 0;
        height: 0;
      }
    }
  }
}
.playModeSheet{
  z-index: 20180926 !important;
  .list{
    .list-item{
      font-size: 14px;
      .mu-item{
        color: #888;
      }
    }
    .selected{
      .mu-item{
        color: #6ed56c;
      }
    }
  }
}
</style>
