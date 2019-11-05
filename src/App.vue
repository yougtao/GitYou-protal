<template>
  <router-view id="app"/>
</template>

<script>


export default {
  name: 'App'
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
