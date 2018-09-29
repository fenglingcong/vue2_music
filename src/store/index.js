import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '@/utils/request.js'
import cache from '@/utils/cache.js'

Vue.use(Vuex)
const state = {
  audio: {
    ele: null, // audio元素
    data: null, // 音乐数据
    play: false, // 播放状态
    duration: 0, // 总时长
    currentTime: 0 // 当前秒数
  },
  playMode: 'default', // 播放模式
  playList: [], // 播放列表
  listJson: {} // 模拟数据存储
}
const getters = {
  // 播放进度
  audio_progress: state => {
    return (state.audio.currentTime / state.audio.duration * 100).toFixed(2) + '%'
  }
}
const mutations = {
  set_audio_ele (state, val) {
    state.audio.ele = val
  },
  set_audio_data (state, val) {
    state.audio.data = val
  },
  set_audio_play (state, val) {
    state.audio.play = val
  },
  set_audio_duration (state, val) {
    state.audio.duration = val
  },
  set_audio_currentTime (state, val) {
    state.audio.currentTime = val
  },
  set_playMode (state, val) {
    state.playMode = val
    cache.setSession('playMode', val)
  },
  set_playList (state, val) {
    state.playList = val.slice()
    cache.setSession('playList', val)
  },
  set_listJson (state, val) {
    state.listJson = val
    cache.setSession('listJson', val)
  },
  // 获取应用缓存
  set_app_cache (state, val) {
    let listJson = JSON.parse(cache.getSession('listJson'))
    let playList = JSON.parse(cache.getSession('playList'))
    let playMode = cache.getSession('playMode')
    if (listJson) {
      state.listJson = listJson
    }
    if (playList) {
      state.playList = playList
    }
    if (playMode) {
      state.playMode = playMode
    }
  }
}
const actions = {
  // 获取banner数据
  async get_banner_data ({ dispatch }) {
    let res = await request('GET', 'banner')
    dispatch('pushTolist', res)
    return res
  },

  // 获取recommend数据
  async get_recommend_data ({ dispatch }, page = 1) {
    let params = {
      page
    }
    let res = await request('GET', 'recommend', params)
    dispatch('pushTolist', res)
    return res
  },

  // 获取其他推荐数据
  async get_other_data ({ dispatch }) {
    let res = await request('GET', 'other')
    dispatch('pushTolist', res)
    return res
  },

  // 获取音乐数据
  // 此处数据是从listJson里获取对应id得到sound数据（真实数据应用axios获取）
  async get_music_data ({ state, commit, dispatch }, id) {
    if (!state.listJson[id]) {
      await dispatch('get_banner_data')
      await dispatch('get_recommend_data')
    }
    let res = state.listJson[id]
    return res
  },

  // 数组转换成以id为属性的对象
  pushTolist ({ state, commit }, res) {
    if (res.data) {
      let list = {}
      res.data.forEach(item => {
        list[item.sound.id] = item
      })
      list = { ...state.listJson, ...list }
      commit('set_listJson', list)
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
