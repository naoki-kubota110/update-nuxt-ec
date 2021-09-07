<template>
  <div>
    <h1>商品詳細</h1>
    <ul class="itemList">
      <li v-for="item in firstViewItemList" :key="item.id">
        <p>
          <!-- <nuxt-link :to="`/item/${item.index}`" -->

          <img :src="item.Item.mediumImageUrls[0].imageUrl" />
          <!-- </nuxt-link> -->
        </p>
        <!-- <p>{{ item.Item.itemName }}</p> -->
        <p>{{ [item.Item.itemPrice].toLocaleString() }}円</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // firstViewItem: true,
      // searchedItem: false,
    }
  },
  computed: {
    ...mapState({
      firstViewItemList: (state) => state.item.shopItems,
    }),
  },
}
</script>
