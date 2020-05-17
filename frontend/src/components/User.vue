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
        <p class="title is-5"><a :href="data.html_url" target="_blank">{{data.name}}</a></p>
        <p v-if="data.company" class="subtitle is-6"><user-company :company="data.company"></user-company></p>
      </div>
    </div>
    <div class="content user-card">
      <table>
        <tr>
          <td class="user-card-icon"><img src="@/assets/followers.svg" /></td>
          <td class="user-card-value">{{data.followers.toLocaleString()}} followers</td>
        </tr>
        <tr>
          <td class="user-card-icon"><img src="@/assets/star.svg" /></td>
          <td class="user-card-value">{{numRepoStars.toLocaleString()}} stars</td>
        </tr>
        <tr>
          <td class="user-card-icon"><img src="@/assets/language.svg" /></td>
          <td class="user-card-value">{{topLanguages.length ? topLanguages.join(', ') : 'No languages found'}}</td>
        </tr>
        <tr>
          <td class="user-card-icon"><img src="@/assets/email.svg" /></td>
          <td class="user-card-value">
            <a v-if="hasEmail" :href="'mailto:' + data.email">{{data.email}}</a>
            <div v-else>
              <a href="" @click.prevent="$emit('locateMail')" class="button is-small">Locate e-mail</a>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import UserCompany from './UserCompany'

export default {
  name: "SearchBar",
  props: ["data"],
  components: {
    UserCompany
  },
  computed: {
    hasEmail() {
      return (this.data.email !== null)
    },
    numRepoStars() {
      return this.data.repos.reduce((total, repo) => total + repo.stargazers_count, 0)
    },
    topLanguages() {
      let dict = {}

      // Create a dictionary of all languages and the number of repositories that language is used
      // in one of the user's repositories
      this.data.repos.forEach(repo => {
        const lang = repo.language
        if (lang === null) return

        dict[lang] = dict[lang] ? dict[lang] + 1 : 1
      });
      
      // Sort the languages by frequency, return three most frequent
      const sortedLangs = Object.keys(dict).sort((first, second) => {
        return dict[second] - dict[first]
      })

      return sortedLangs.slice(0, 3)
    }
  }
};
</script>

<style scoped>
.user-card-icon {
  width: 64px;
  min-width: 64px;
  white-space: nowrap;
}

.content {
  margin-top: 0.75rem;
}
figure img {
  border-radius: 6px;
}
</style>
