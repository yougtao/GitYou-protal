<template>
  <div>
    <user-header/>
    <router-view/>
  </div>
</template>

<script>
import UserHeader from '@/components/Header'

export default {
  name: 'User',
  components: {UserHeader}
}
</script>

<style scoped>

</style>