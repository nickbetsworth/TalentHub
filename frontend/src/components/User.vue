<template>
  <div>
    <div class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <a :href="data.html_url" target="_blank">
            <img :src="data.avatar_url" />
          </a>
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-5">{{data.name}}</p>
        <p class="subtitle is-6"><a :href="data.html_url" target="_blank">@{{data.login}}</a></p>
      </div>
    </div>
    <div class="content">
      <table>
        <tr>
          <td><img src="@/assets/followers.svg" /></td>
          <td>{{data.followers}} followers</td>
        </tr>
        <tr>
          <td><img src="@/assets/star.svg" /></td>
          <td>{{numRepoStars}} stars</td>
        </tr>
        <tr>
          <td><img src="@/assets/email.svg" /></td>
          <td>{{emailString}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: ["data"],
  computed: {
    emailString() {
      if (!this.data.email) {
        return 'Locate'
      }

      return this.data.email
    },
    numRepoStars() {
      return this.data.repos.reduce((total, repo) => total + repo.stargazers_count, 0)
    }
  }
};
</script>

<style scoped>
.list {
  box-shadow: none;
}
.content {
  margin-top: 0.75rem;
}
</style>
