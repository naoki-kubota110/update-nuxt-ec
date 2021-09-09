<template>
  <div>
    <!-- <div v-show="firstViewItem">トップページ</div> -->
    <ul class="itemList">
      <li v-for="item in firstViewItemList" :key="item.Item.itemCode">
        <p>
          <router-link :to="{ path: `/item/${item.Item.itemCode}` }">
            <img :src="item.Item.mediumImageUrls[0].imageUrl" />
          </router-link>
        </p>
        <!-- <p>{{ item.Item.itemName }}</p> -->
        <p>{{ [item.Item.itemPrice].toLocaleString() }}円</p>
      </li>
    </ul>
    <!-- <div v-show="searchedItem">検索アイテム</div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      firstViewItem: true,
      searchedItem: false,
    }
  },
  computed: {
    ...mapState({
      firstViewItemList: (state) => state.item.shopItems,
    }),
  },
}
</script>

<style lang="scss" scoped>
h1 {
  background-color: red;
}
ul.itemList {
  display: flex;
  // flex-direction: row;
  flex-wrap: wrap;
}
li {
  list-style: none;
}
</style>
