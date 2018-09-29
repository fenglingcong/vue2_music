<template>
  <div id="app" :class="{'musicBar-on': audio.data}">
    <!-- 视图层 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- 音乐控制部分 -->
    <music-bar></music-bar>
    <!-- 页面加载进度条 -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState([
      'audio'
    ])
  },
  methods: {
    ...mapMutations([
      'set_app_cache'
    ])
  },
  created () {
    this.set_app_cache()
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.musicBar-on{
  padding-bottom: 50px;
}
</style>
