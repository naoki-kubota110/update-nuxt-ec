<template>
  <div>
    <input v-model="searchWord" type="text" />
    <button type="submit" @click="searchItem">検索</button>
    <div v-show="searchedItems">表示</div>
    <!-- {{ serchedItems }} -->
  </div>
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
          console.log(response.data.Items)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ...mapActions([
      'item/searchItem',
      // , this.searchedItems
    ]),
  },
}
</script>

<style lang="scss" scoped>
h1 {
  background-color: red;
}
</style>
