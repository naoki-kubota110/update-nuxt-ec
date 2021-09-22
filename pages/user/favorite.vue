<template>
  <div>
    <!-- <p>{{ favoriteItem }}</p> -->
    <h1>お気に入り商品</h1>
    <table>
      <tr>
        <th>名前</th>
        <th>写真</th>
        <th>価格</th>
        <!-- <th>お気に入り</th> -->
      </tr>
      <tr v-for="item in favoriteItem" :key="item.index">
        <router-link :to="{ path: `/item/${item.favoriteId}` }">
          <th>{{ item.itemName }}</th>
        </router-link>
        <!-- <router-link :to="{ path: `/item/${item.favoriteId}` }"> -->
        <th><img :src="item.itemImage" /></th>
        <!-- </router-link> -->
        <th>{{ [item.itemPrice].toLocaleString() }}円</th>
        <th>
          <button @click="deleteFavoriteItem(item.favoriteId, item.userId)">
            お気に入り解除
          </button>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware({ store, redirect }) {
    if (!store.$auth.loggedIn) {
      redirect('/user/login')
    }
  },
  computed: {
    favoriteItem() {
      return this.$store.state.users.favoriteItem
    },
  },
  created() {
    if (this.$auth.loggedIn) {
      this['users/getFavoriteItem']({ id: this.$auth.user.id })
    }
  },
  methods: {
    deleteFavoriteItem(favoriteId, userId) {
      const deleteData = {
        favoriteId,
        userId,
      }
      if (confirm('お気に入りを解除しますか？')) {
        this['users/deleteFavoriteItem'](deleteData)
      }
    },
    ...mapActions(['users/deleteFavoriteItem', 'users/getFavoriteItem']),
  },
}
</script>
