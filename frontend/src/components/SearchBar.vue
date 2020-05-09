<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Enter a location"
        @input="changeInput" />
    </div>
    <div class="control">
      <a @click="$emit('search')" class="button is-dark">
        Search
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['value'],
  data() {
    return {
      content: this.value
    }
  },
  methods: {
    changeInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
/* input[type=text] {
  width: 200px;
} */
</style>
