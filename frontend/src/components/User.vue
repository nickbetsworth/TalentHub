<template>
  <div class="content user">
    <a :href="data.html_url" target="_blank">
      <img :src="data.avatar_url" width="77px" />
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
.user img {
  border-radius: 15%;
  -webkit-box-shadow: 10px 10px 15px -10px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 15px -10px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 15px -10px rgba(0,0,0,0.75);
}
</style>
