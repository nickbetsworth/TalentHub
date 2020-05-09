<template>
  <div class="field is-grouped is-grouped-multiline" style="margin-top: 10px">
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

</style>
