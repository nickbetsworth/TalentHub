<template>
  <div class="tile" style="flex-wrap: wrap;">
    <div class="tile is-1" v-for="user in users" :key="user.id">
      <user :data="user"></user>
    </div>
  </div>
</template>

<script>
import User from './User'

export default {
  name: 'SearchBar',
  props: ['users'],
  components: {
    User
  }
}
</script>

<style scoped>

</style>
