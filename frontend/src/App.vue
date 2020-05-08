<template>
  <div id="app">
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </div>
    <search-bar v-model="searchCriteria" @search="search"></search-bar>
    <search-results :users="users"></search-results>
    <!-- <div class="columns is-mobile is-centered is-vcentered" style="height: 40vh">
      <div class="column is-narrow">
        <h1 class="title">Title</h1>
      </div>
    </div> -->
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    SearchBar,
    SearchResults
  },
  data() {
    return {
      searchCriteria: '',
      users: []
    }
  },
  methods: {
    search() {
      axios.get(`http://localhost:3000/users?location=${this.searchCriteria}`)
      .then(res => {
        this.users = res.data
      })
    }
  }
}
</script>

<style lang="css">
@import "~bulma/css/bulma.min.css";
</style>
