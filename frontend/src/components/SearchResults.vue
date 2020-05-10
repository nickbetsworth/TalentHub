<template>
  <div>
    <div class="content has-text-light">
      {{users.length}} results
    </div>
    <div class="tile is-ancestor" v-for="users in chunkedUsers" :key="users[0].id">
      <div class="tile is-parent" v-for="user in users" :key="user.id">
        <div class="tile is-child is-mobile box">
          <user :data="user"></user>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from './User'
import chunk from 'chunk'

export default {
  name: 'SearchBar',
  props: ['users'],
  components: {
    User
  },
  computed: {
    chunkedUsers() {
      return chunk(this.users, 3)
    }
  }
}
</script>

<style scoped>

</style>
