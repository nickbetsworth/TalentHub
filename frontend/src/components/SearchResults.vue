<template>
  <div class="content">
    <div class="content">
      <h3 class="header">{{users.length}} results</h3>
    </div>
    <div class="tile" style="flex-wrap: wrap;">
      <div class="tile" style="flex: none; padding: 5px; margin: 0" v-for="user in users" :key="user.id">
        <user :data="user"></user>
      </div>
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
