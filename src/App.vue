<template>
  <div id="app">
    <div id="nav">
      <home />
      <input type="button" @click="onToggle">
    </div>
  </div>
</template>
<script>
import Home from './views/Home.vue'

export default {
  components: {
    Home,
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    onToggle() {
      this.isShow = !this.isShow
      if (this.isShow) {
        // 魔法注释，可以给打包后的js文件取名
        import(/* webpackChunkName: 'indexVue' */'./components/index.vue')
          .then(({default: data}) => console.log(data))
      } else {
        import(/* webpackChunkName: 'mainVue' */'./components/main.vue')
          .then(({default: data}) => console.log(data))
      }
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h1 {
  color: #4537c0;
}
</style>
