<template>
  <div id="app">
    <div class="container">
      <div class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              TalentHub
            </h1>
          </div>
        </div>
      </div>

      <limit-status-bar v-if="limits" :limits="limits"></limit-status-bar>
      <search-bar v-model="searchCriteria" @search="search"></search-bar>
      <search-results :users="users"></search-results>
      <!-- <div class="columns is-mobile is-centered is-vcentered" style="height: 40vh">
        <div class="column is-narrow">
          <h1 class="title">Title</h1>
        </div>
      </div> -->
    </div>
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
      limits: false
    }
  },
  mounted() {
    this.updateLimits()
  },
  methods: {
    search() {
      axios.get(`http://localhost:3000/users?location=${this.searchCriteria}`)
      .then(res => {
        this.users = res.data
        this.updateLimits()
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

<style lang="css">
@import "~bulma/css/bulma.min.css";

body {
  min-height: 100vh;
  background: #b24592; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #b24592, #f15f79); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #b24592, #f15f79); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
