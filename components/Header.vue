<template>
  <header>
    <h1 class="title"><nuxt-link to="/"> らくらくEC </nuxt-link></h1>

    <nav class="nav">
      <ul class="menu-group">
        <li class="menu-search">
          <input v-model="searchWord" type="text" />
          <button type="submit" @click="searchItem">
            検索 <i class="fa fa-search"></i>
          </button>
        </li>
        <!-- ログイン状態:{{ $auth.loggedIn }} | {{ $auth.user }} -->
        <li v-if="!$auth.loggedIn" class="menu-item">
          <nuxt-link to="/user/login"> ログイン </nuxt-link>
          <nuxt-link to="/user/register">ユーザー登録</nuxt-link>
        </li>
        <li v-if="$auth.loggedIn" class="menu-item">
          <button @click="logout">Logout</button>
        </li>
        <li class="menu-item">
          <nuxt-link to="/user/favorite">お気に入り</nuxt-link>
        </li>
        <li class="menu-item">
          <nuxt-link to="/orders/cart">カート </nuxt-link>
        </li>
        <li class="menu-item">
          <nuxt-link to="/orders/history">注文履歴</nuxt-link>
        </li>
      </ul>
    </nav>
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
      if (confirm('本当にログアウトしますか？')) {
        this.$auth.logout()
      }
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
            console.log(response.data)
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
header {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #eee;
  align-items: center;
}
.title {
  margin-right: auto;
}

.menu-item {
  list-style: none;
  display: inline-block;
  padding: 10px;
}
.menu-search {
  list-style: none;
  display: inline-block;
  padding: 350px;
}
</style>
