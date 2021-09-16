<template>
  <div>
    <ul class="itemList">
      <li v-for="item in firstViewItemList" :key="item.Item.itemCode">
        <p>
          <router-link :to="{ path: `/item/${item.Item.itemCode}` }">
            <img
              height="164px"
              width="164px"
              :src="item.Item.mediumImageUrls[0].imageUrl"
            />
          </router-link>
        </p>
        <router-link :to="{ path: `/item/${item.Item.itemCode}` }">
          {{ item.Item.itemName }}
        </router-link>
        <p>{{ [item.Item.itemPrice].toLocaleString() }}円</p>
      </li>
    </ul>
    <p>{{ cartData }}</p>
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
      cartData: '',
      firstViewItem: true,
      searchedItem: false,
    }
  },

  computed: {
    ...mapState({
      firstViewItemList: (state) => state.item.shopItems,
    }),
  },
  created() {
    if (this.$auth.loggedIn) {
      const data = { id: this.$auth.user.id }
      console.log(data)
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  background-color: red;
}
ul.itemList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  background: #eee;
  overflow: hidden;
}
li {
  list-style: none;
  margin-left: 30px;
  margin-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  // white-space: nowrap;
  flex-wrap: wrap;
  width: 164px;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
