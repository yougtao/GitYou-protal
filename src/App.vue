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
  components: {PageHeader}
}
</script>

<style>
html {
  overflow-y: overlay;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
