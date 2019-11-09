<template>
  <div>
    <home-header/>
    <router-view/>
  </div>
</template>

<script>
import HomeHeader from '@/components/Header'

export default {
  name: 'HomeFrame',
  components: {HomeHeader}
}
</script>

<style scoped>

</style>