<template>
  <header>
    <div>らくらくEC</div>
    <div class="search">
      <input v-model="searchWord" type="text" />
      <button type="submit" @click="searchItem">検索</button>
    </div>
    <div>
      <li>ログイン</li>
      <li>お気に入り</li>
      <li>カート</li>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      searchWord: '',
      searchedItems: '',
    }
  },
  methods: {
    searchItem() {
      this.searchedItems = ''
      axios
        .get(
          'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
          {
            params: {
              applicationId: '1083744313894679387',
              keyword: '筋トレ',
              hits: 20,
            },
          }
        )
        .then((response) => {
          this.searchedItems = response.data
          this['item/searchItem'](response.data.Items)
        })

        .catch((err) => {
          console.log(err)
        })
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
