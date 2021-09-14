<template>
  <header>
    <div>らくらくEC</div>
    
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <h2>
        ログイン状態:{{ $auth.loggedIn }} | {{ $auth.user }}
        <div v-if="!$auth.loggedIn">
          <nuxt-link to="/user/login">| Login | </nuxt-link>
          <nuxt-link to="/user/register">|register |</nuxt-link>
        </div>
        <div v-if="$auth.loggedIn">
          <button @click="logout()">Logout</button>
        </div>
      </h2>
    </div>
    <div class="search">
      <input v-model="searchWord" type="text" />
      <button type="submit" @click="searchItem">検索</button>
    </div>
    <div>
      <li>ログイン</li>
      <li>お気に入り</li>
      <li><nuxt-link to="/orders/cart">ショッピングカート</nuxt-link></li>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import config from '../config'

export default {
  data() {
    return {
      searchWord: '',
      searchedItems: '',
    }
  },
  methods: {
    logout() {
      confirm('本当にログアウトしますか？')
      this.$auth.logout()
    },
    searchItem() {
      const apiKey = config.RAKUTEN_API_KEY
      if (this.searchWord !== '') {
        this.searchedItems = ''
        axios
          .get(
            'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
            {
              params: {
                applicationId: apiKey,
                keyword: this.searchWord,
                hits: 30,
              },
            }
          )
          .then((response) => {
            this.searchedItems = response.data
            this['item/searchItem'](response.data.Items)
            this.$router.push('/')
          })

          .catch((err) => {
            console.log(err)
          })
      }
    },
    ...mapActions(['item/searchItem']),
  },
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: right;
  justify-items: right;
}
div.search {
  text-align: center;
}
li {
  text-align: right;
  list-style: none;
  margin-right: 20px;
}

header {
  background-color: pink;
  height: 100px;
}
input {
  margin-top: 40px;
}
</style>
