<template>
  <div id="app">
    <div class="container">
      <div class="section">
        <h1 class="title is-2 has-text-light">
          Talent Hub
        </h1>
      </div>
      <search-bar v-model="searchCriteria" @search="search" :enabled="searchEnabled"></search-bar>
      <search-results :users="users"></search-results>
    </div>
    <nav class="navbar is-fixed-bottom">
      <div class="container">
        <limit-status-bar v-if="limits" :limits="limits"></limit-status-bar>
      </div>
    </nav>
  </div>
</template>

<script>
import LimitStatusBar from './components/LimitStatusBar'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    LimitStatusBar,
    SearchBar,
    SearchResults
  },
  data() {
    return {
      searchCriteria: '',
      users: [],
      searchEnabled: true,
      limits: false
    }
  },
  mounted() {
    this.updateLimits()
  },
  methods: {
    search() {
      this.searchEnabled = false

      axios.get(`http://localhost:3000/users?location=${this.searchCriteria}`)
      .then(res => {
        this.users = res.data
        this.updateLimits()
      })
      .finally(() => {
        this.searchEnabled = true
      })
    },
    updateLimits() {
      axios.get('http://localhost:3000/apiLimits')
      .then(res => {
        const limitData = res.data[3].resources
        this.limits = {
          main: {
            remaining: limitData.core.remaining,
            resetTime: limitData.core.reset
          },
          search: {
            remaining: limitData.search.remaining,
            resetTime: limitData.search.reset
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');
@import "~bulma/css/bulma.min.css";

h1.title {
  font-weight: 100;
  // font-style: italic;
}

.section {
  padding: 2rem 0;
}

body {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #ffffff;
  min-height: 100vh;
  background: #b24592; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #b24592, #f15f79); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #b24592, #f15f79); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
