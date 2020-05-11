<template>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control">
        <h3 class="title is-5">API Limits</h3>
    </div>
    <div class="control">
      <limit
        type="Main"
        :remaining="limits.main.remaining"
        :resetTime="limits.main.resetTime" />
    </div>
    <div class="control">
      <limit
        type="Search" 
        :remaining="limits.search.remaining"
        :resetTime="limits.search.resetTime" />
    </div>
    <div class="">
      <p>Visit <a href="https://github.com/">TalentHub </a>project page</p>
    </div>
  </div>
</template>

<script>
import Limit from './Limit'

export default {
  name: 'SearchBar',
  props: ['limits'],
  components: {
    Limit
  }
}
</script>

<style scoped>
.field {
  margin-top: 0.75em
}
</style>
