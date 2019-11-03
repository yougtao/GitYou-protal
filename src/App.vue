<template>
  <div id="app">
    <page-header/>
    <router-view/>
  </div>
</template>

<script>
import PageHeader from './components/Header'

export default {
  name: 'App',
  components: {PageHeader},
  updated() {
    console.log('根组件(App)更新')
    PageHeader.updated()
  }
}
</script>

<style>
html {
  overflow-y: overlay;
}

body {
  margin: 0;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
