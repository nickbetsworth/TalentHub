<template>
  <div id="app">
    <div class="container" style="padding-bottom: 5em">
      <div class="section">
        <h1 class="title is-2 has-text-light">
          Talent Hub
        </h1>
      </div>
      <search-bar v-model="searchCriteria" @search="search" :enabled="!searching"></search-bar>
      <div v-if="!searching && hasSearched">
        <search-results :users="users"></search-results>
      </div>
      <div v-else-if="searching" class="columns is-centered is-vcentered is-mobile" style="height: 30vh">
        <div class="column is-1">
          <self-building-square-spinner
              :animation-duration="2000"
              :size="80"
              color="#f5f5f5"/>
        </div>
      </div>
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
import { SelfBuildingSquareSpinner  } from 'epic-spinners'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    LimitStatusBar,
    SearchBar,
    SearchResults,
    SelfBuildingSquareSpinner
  },
  data() {
    return {
      searchCriteria: '',
      users: [],
      searching: false,
      limits: false,
      hasSearched: false
    }
  },
  mounted() {
    this.updateLimits()
  },
  methods: {
    search() {
      if (!this.hasSearched)  this.hasSearched = true

      this.searching = true
      this.users = []

      axios.get(`http://localhost:3000/users?location=${this.searchCriteria}`)
      .then(res => {
        this.users = res.data
        this.updateLimits()
      })
      .finally(() => {
        this.searching = false
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
}

body {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  min-height: 100vh;
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
}
</style>
