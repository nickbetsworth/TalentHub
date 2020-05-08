<template>
  <div class="content">
    <img :src="data.avatar_url" width="64px" />
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
  border-radius: 10%;
}
</style>
