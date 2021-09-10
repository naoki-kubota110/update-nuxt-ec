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
// import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'

export default {
  // components: {
  //   Swiper,
  //   SwiperSlide,
  // },
  // directives: {
  //   swiper: directive,
  // },
  data() {
    return {
      // swiperOption: {
      //   speed: 1000, // スライドの切り替わりスピード
      //   spaceBetween: 30, // 各スライドの余白
      //   centeredSlides: true, // スライダーを真ん中に
      //   loop: true, // 無限ループ
      //   autoplay: {
      //     // スライドの自動切り替え
      //     delay: 5000, // スライドの自動切り替えの秒数
      //     disableOnInteraction: false, // 何らかのアクション後の自動切り替えを再開
      //   },
      // },
      // pagination: {
      //   //  ページネーション設定
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      // navigation: {
      //   //  ナビゲーション設定
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
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
