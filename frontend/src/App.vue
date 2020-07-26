<template>
  <div id="app">
    <div class="container" style="padding-bottom: 5em">
      <div class="section">
        <h1 class="title is-2 has-text-light">
          Talent Hub
        </h1>
      </div>
      <search-bar v-model="searchText" @search="enableSearch" :enabled="!searching"></search-bar>
      <div v-if="error" class="notification">
        {{error}}
      </div>
      <div v-if="searchActive">
        <search-results :users="users"></search-results>
      </div>
      <scroll-loader :loader-method="loadNextResults" :loader-disable="!loaderEnabled">
      </scroll-loader>
    </div>
    
    <nav class="navbar is-fixed-bottom">
      <div class="container">
        <limit-status-bar v-if="apiLimits" :limits="apiLimits"></limit-status-bar>
      </div>
    </nav>
  </div>
</template>

<script>
import LimitStatusBar from './components/LimitStatusBar'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import * as githubApi from './api/github'
import bus from './event/bus'

export default {
  name: 'App',
  components: {
    LimitStatusBar,
    SearchBar,
    SearchResults
  },
  data() {
    return {
      searchText: '',
      searchCriteria: '',
      users: [],
      apiLimits: false,
      searching: false,
      searchActive: false,
      autoloadEnabled: false,
      currentPage: 1,
      error: null
    }
  },
  mounted() {
    this.updateApiLimits()
    bus.$on('locateEmail', this.locateEmail)
  },
  computed: {
    loaderEnabled() {
      return this.searchActive && this.autoloadEnabled
    }
  },
  methods: {
    enableSearch() {
      if (!this.searchActive)  this.searchActive = true

      this.searchCriteria = this.searchText
      this.currentPage = 1
      this.searching = true
      this.autoloadEnabled = true
      this.users = []
      this.error = null
    },
    loadNextResults() {
      githubApi.getUsers(this.searchCriteria, this.currentPage++)
      .then(users => {
        // Disable the auto-loader if we've run out of results
        if (!users.length) {
          this.autoloadEnabled = false

          if (!this.users.length) {
            this.error = 'No results found'
          }

          return
        }

        this.users = [...this.users, ...users]
        this.updateApiLimits()
      })
      .catch(error => {
        this.error = error.response.data.error
        this.autoloadEnabled = false
      })
      .finally(() => {
        this.searching = false
      })
    },
    updateApiLimits() {
      githubApi.getApiLimits().then(limits => {
        this.apiLimits = {
          main: {
            remaining: limits.core.remaining,
            resetTime: limits.core.reset
          },
          search: {
            remaining: limits.search.remaining,
            resetTime: limits.search.reset
          }
        }
      })
    },
    locateEmail(username) {
      githubApi.locateEmail(username)
      .then(email => {
        this.users.find(user => user.login === username).email = email
      })
      .catch(() => {
        this.error = 'Unable to locate user\'s email address'
      })
      .finally(() => {
        this.updateApiLimits()
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

/*

Disable .loader class which is imposed on us by Bulma.

.loader houses the 'loading' animation used by vue-scroll-loader, and there's currently no way
for us to override the style used. The two styles (Bulma & vue-scroll-loader) interact with each
other and cause all kinds of ugliness. The following class overrides the styling enforced by Bulma.

*/
.loader {
  -webkit-animation: none !important;
  animation: none !important;
  border: none !important;
  border-radius: none !important;
  content: none !important;
  height: auto !important;
  position: relative !important;
  width: auto !important;
}
</style>
