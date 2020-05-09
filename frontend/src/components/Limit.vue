<template>
  <div class="tags has-addons">
    <span class="tag is-dark">{{type}}</span>
    <span class="tag is-info">{{remaining}} remaining</span>
    <span class="tag">Resets {{resetString}}</span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SearchBar',
  props: ['type', 'remaining', 'resetTime'],
  data () {
    return {
      resetString: moment.unix(this.resetTime).fromNow()
    }
  },
  mounted() {
    this.intervalId = setInterval(this.updateResetString, 500)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    updateResetString() {
      let newResetString = moment.unix(this.resetTime).fromNow()
      if (newResetString !== this.resetString) {
        this.resetString = newResetString
      }
    }
  }
}
</script>

<style scoped>

</style>
