<template>
  <div>
    <h1>お気に入り商品</h1>
    <table>
      <tr>
        <th>名前</th>
        <th>写真</th>
        <th>価格</th>
        <th></th>
      </tr>
      <tr v-for="item in favoriteItem" :key="item.index">
        <router-link :to="{ path: `/item/${item.favoriteId}` }">
          <th class="item-name">{{ item.itemName }}</th>
        </router-link>
        <th>
          <router-link :to="{ path: `/item/${item.favoriteId}` }">
            <img class="item-img" :src="item.itemImage" />
          </router-link>
        </th>
        <th>{{ [item.itemPrice].toLocaleString() }}円</th>
        <th>
          <button
            class="delete-btn"
            @click="deleteFavoriteItem(item.favoriteId, item.userId)"
          >
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

<style lang="scss" scoped>
// .item-table {
//   border-bottom: 1px solid #ddd;
// }
th {
  padding-top: 30px;
  // border-bottom: 1px solid #ddd;
}
.item-img {
  width: 124px;
  height: 124px;
}
.item-name {
  height: 100px;
  word-wrap: normal;
  vertical-align: middle;
}

.delete-btn {
  border-radius: 6px;
  padding: 5px;
  width: 90px;
  display: block;
  letter-spacing: 0.05em;
  background: #5bc8ac;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin: 0 auto;
  margin-top: 10px;
  cursor: pointer;
}
</style>
