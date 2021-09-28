<template>
  <div>
    <div v-show="itemflg" id="itemflg">
      <section class="swiper">
        <swiper :options="swiperOption">
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://heyagoto.com/wp-content/uploads/2020/07/20200712-1.jpg"
          /></swiper-slide>
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://static-buyma-com.akamaized.net/imgdata/item/210711/0071307921/371518570/428.jpg"
          /></swiper-slide>
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://www.yamagishi-p.co.jp/interiorblog/wp-content/uploads/2016/03/linterno-1024x768.jpg"
          /></swiper-slide>
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://www.rafila-fan.com/img/category/category_img/ba_slid_00-206_r4.jpg?x=640"
          /></swiper-slide>
          <swiper-slide
            ><img
              class="swiper-img"
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
      <!-- </client-only> -->

      <ul class="itemList">
        <li v-for="item in firstViewItemList" :key="item.Item.itemCode">
          <div>
            <router-link :to="{ path: `/item/${item.Item.itemCode}` }">
              <img
                class="item-img"
                :src="item.Item.mediumImageUrls[0].imageUrl"
              />
            </router-link>
          </div>
          <router-link :to="{ path: `/item/${item.Item.itemCode}` }">
            <div class="item-name">{{ item.Item.itemName }}</div>
          </router-link>
          <div class="item-price">
            {{ [item.Item.itemPrice].toLocaleString() }}円
          </div>
        </li>
      </ul>
    </div>

    <div v-show="!itemflg">
      <ul class="itemList">
        <li v-for="item in firstViewItemList" :key="item.Item.itemCode">
          <p>
            <router-link :to="{ path: `/item/${item.Item.itemCode}` }">
              <img
                :src="item.Item.mediumImageUrls[0].imageUrl"
                class="item-img"
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
        slidesPerView: 1,
        centeredSlides: true, // スライダーを真ん中に
        spaceBetween: 30, // 各スライドの余白
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

        breakpoints: {
          // レスポンシブ対応
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
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

  methods: {
    ...mapActions(['item/searchItem']),
  },
}
</script>

<style lang="scss" scoped>
ul.itemList {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  background: #eee;
  overflow: hidden;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
li {
  list-style: none;
  margin-left: 20px;
  width: 164px;
}
.item-name {
  margin-top: 10px;
  margin-bottom: 10px;
  list-style: none;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-left: 10px;
}
.item-price {
  text-align: right;
  margin-right: 10px;
}
.item-img {
  margin-top: 30px;
  margin-left: 10px;
  width: 100%;
  height: 164px;
}
.swiper {
  margin-top: 30px;
}
.swiper-img {
  // position: relative;
  // top: 0;
  height: 300px;
  max-width: 500px;
  width: 75%;
  max-width: 800px;
  margin-left: 12%;
}

@media screen and (max-width: 1024px) {
  .swiper-img {
    width: 90%;
    position: relative;
    // top: 0;
    // left: 0;
    max-width: 500px;
    margin-left: 0;
  }
}

@media screen and (max-width: 650px) {
  ul.itemList {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  li {
    width: 124px;
  }
  .item-img {
    width: 100%;
    height: 164px;
    margin-left: 20px;
  }
  .item-name {
    margin-left: 20px;
  }
  .swiper-img {
    height: 300px;
    width: 70%;
    position: relative;
    top: 0;
    left: 15%;
    max-width: 500px;
  }
}
</style>
