<template>
  <div class="content">
    <a :href="data.html_url">
      <img :src="data.avatar_url" width="64px" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['data']
}
</script>

<style>
img {
  border-radius: 15%;
}
</style>
