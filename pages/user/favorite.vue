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
        <th class="item-name">
          <router-link :to="{ path: `/item/${item.favoriteId}` }"
            >
            <p>{{ item.itemName }}</p>
          </router-link>
        </th>

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
  middleware: 'direct-login',
  computed: {
    favoriteItem() {
      return this.$store.state.users.favoriteItem
    },
  },
  // created() {
  //   if (this.$store.state.auth.loggedIn) {
  //     this['users/getFavoriteItem']({ id:this.$auth.user.id})
  //   }
  // },
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
th {
  width: 100%;
  padding-top: 30px;
  align-content: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}
.item-img {
  width: 164px;
  height: 164px;
  padding: 0 30px;
}
.item-name {
  max-width: 300px;
  word-wrap: normal;
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
  margin-left: 30px;
}
@media screen and (max-width: 650px) {
  .item-name {
    font-size: 8px;
  }
  th {
    font-size: 12px;
  }
  .item-img {
    width: 80px;
    height: 80px;
    padding: 0 5px;
  }
  .delete-btn {
    width: 70px;
    font-size: 10px;
    margin-left: 5px;
  }
}
</style>
