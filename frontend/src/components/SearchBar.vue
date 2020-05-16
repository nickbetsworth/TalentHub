<template>
  <div class="field has-addons search-bar">
    <div class="control is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Enter a location"
        @input="changeInput"
        @keypress.enter="$emit('search')"
        :disabled="!enabled" />
    </div>
    <div class="control">
      <a @click="$emit('search')" class="button" :disabled="!enabled">
        <img src="@/assets/search.svg"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['value', 'enabled'],
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

<style>
.search-bar {
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
}
</style>
