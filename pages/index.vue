<template>
  <div>
    <div v-show="itemflg">
      <client-only>
        <section class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide
              ><img
                height="300px"
                width="500px"
                src="https://heyagoto.com/wp-content/uploads/2020/07/20200712-1.jpg"
            /></swiper-slide>
            <swiper-slide
              ><img
                height="300px"
                width="500px"
                src="https://static-buyma-com.akamaized.net/imgdata/item/210711/0071307921/371518570/428.jpg"
            /></swiper-slide>
            <swiper-slide
              ><img
                height="300px"
                width="500px"
                src="https://www.yamagishi-p.co.jp/interiorblog/wp-content/uploads/2016/03/linterno-1024x768.jpg"
            /></swiper-slide>
            <swiper-slide
              ><img
                height="300px"
                width="500px"
                src="https://www.rafila-fan.com/img/category/category_img/ba_slid_00-206_r4.jpg?x=640"
            /></swiper-slide>
            <swiper-slide
              ><img
                height="300px"
                width="500px"
                src="https://shopping.line-scdn.net/0hWv43GGCQCFkJSiD5nHF3DlsXFCh_O1FOdnISe34PSGwjLktaNHxAa34aBWt0c0hcPS5CPyQdXm4kf0sIZihFUS1KUzkkL08HYSpHPyxME2h2e01cYigV/r800_trim"
            /></swiper-slide>

            <div
              slot="pagination"
              class="swiper-pagination swiper-pagination-black"
            ></div>
            <div slot="button-prev" class="swiper-button-prev"></div>
            <div slot="button-next" class="swiper-button-next"></div>
          </swiper>
        </section>
      </client-only>

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
            <p class="item-name">{{ item.Item.itemName }}</p>
          </router-link>
          <p class="item-price">
            {{ [item.Item.itemPrice].toLocaleString() }}円
          </p>
        </li>
      </ul>
    </div>

    <div v-show="!itemflg">
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
            <p class="item-name">{{ item.Item.itemName }}</p>
          </router-link>
          <p class="item-price">
            {{ [item.Item.itemPrice].toLocaleString() }}円
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      swiperOption: {
        speed: 1000, // スライドの切り替わりスピード
        slidesPerView: 3,
        centeredSlides: true, // スライダーを真ん中に
        // spaceBetween: 5, // 各スライドの余白
        loop: true, // 無限ループ

        autoplay: {
          // スライドの自動切り替え
          delay: 2500, // スライドの自動切り替えの秒数
          disableOnInteraction: false, // 何らかのアクション後の自動切り替えを再開
        },

        pagination: {
          //  ページネーション設定
          el: '.swiper-pagination',
          clickable: true,
        },

        navigation: {
          //  ナビゲーション設定
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // breakpoints: {
        //   // レスポンシブ対応
        //   1200: {
        //     slidesPerView: 2,
        //   },
        //   600: {
        //     slidesPerView: 1.2,
        //     spaceBetween: 0,
        //   },
        // },
      },

      cartData: '',
      searchedItem: false,
    }
  },

  computed: {
    ...mapState({
      firstViewItemList: (state) => state.item.shopItems,
      itemflg: (state) => state.item.itemflg,
    }),
  },

  created() {
    if (this.$auth.loggedIn) {
      // const data = { id: this.$auth.user.id }
      // console.log(data)
    }
    // this['item/searchItem'](this.firstItem.Items)
  },
  methods: {
    ...mapActions(['item/searchItem']),
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
  width: 164px;
}
.item-name {
  // white-space: nowrap;
  list-style: none;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.item-price {
  text-align: right;
  margin-right: 10px;
}
.swiper {
  margin-top: 30px;
}
</style>
