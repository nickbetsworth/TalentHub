<template>
  <span v-html="hyperlinkedCompany">
  </span>
</template>

<script>
export default {
  name: "UserCompany",
  props: ["company"],
  computed: {
    hyperlinkedCompany() {
      return this.company.replace(/@([^\s,]+)/g, '<a href="https://github.com/$1" target="_blank">@$1</a>')
    }
  }
};
</script>

<style scoped>
</style>
