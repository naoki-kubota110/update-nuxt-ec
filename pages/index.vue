<template>
  <div>
      <section class="swiper">
        <swiper :options="swiperOption">
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://i.gyazo.com/dd07f31b0954e45679ddaa6397e2fbb9.png"
          /></swiper-slide>
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://i.gyazo.com/cc7054c779ffd109b20298c06ad39f08.png"
          /></swiper-slide>
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://i.gyazo.com/25ace084a26d225c671609ebe20cd1b4.png"
          /></swiper-slide>
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://i.gyazo.com/258fb0676fde6c90fe4a73cdda29d272.png"
          /></swiper-slide>
          <swiper-slide
            ><img
              class="swiper-img"
              src="https://i.gyazo.com/075358c757d0a1f23c044b27c61bc862.png"
          /></swiper-slide>
          <div
            slot="pagination"
            class="swiper-pagination swiper-pagination-black"
          ></div>
          <div slot="button-prev" class="swiper-button-prev"></div>
          <div slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </section>
      <div class="list5">
  <ul>
    <li class="index-list">
      <div 
      class="index-name" 
      :class="{'index-name-select':isSuperSale}"
      @click="setSuperSaleItem" 
      >
        スーパーセール
      </div>
    </li>
    <li class="index-list">
      <div 
      class="index-name" 
      :class="{'index-name-select':isDoublePoint}"
      @click="setDoublePointItem" 
      >
        ポイント倍増
      </div>
    </li>
    <li class="index-list">
      <div 
        class="index-name"
       :class="{'index-name-select':isFurusato}"
      @click="setFurusatoItem" 
      >
        ふるさと納税
      </div>
    </li>
    <li 
    class="index-list"
    :class="{'index-name-select':isCosme}"
    @click="setCosmeItem" 
    >
    <div class="index-name">
      美容・コスメ
    </div>
    </li>
    <li class="index-list">
      <div 
      class="index-name"
      :class="{'index-name-select':isSport}"
      @click="setSportItem" 
      >
       スポーツ
      </div>
    </li>
    <li class="index-list">
      <div 
      class="index-name"
      :class="{'index-name-select':isInterior}"
      @click="setInteriorItem" 
      >
        インテリア
      </div>
    </li>
  </ul>
</div>
      <div>
        {{searchMsg}}
      </div>
      <ul class="itemList">
        <li v-for="(item,i) in items" :key="i">
          <div>
            <router-link :to="{ path: `/item/${item.itemId}` }">
              <img
                class="item-img"
                :src="item.itemImage"
              />
            </router-link>
          </div>
          <router-link :to="{ path: `/item/${item.itemId}` }">
            <div class="item-name">{{ item.itemName }}</div>
          </router-link>
          <div class="item-price">
            {{ [item.itemPrice].toLocaleString() }}円
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      isSuperSale:true,
      isDoublePoint:false,
      isFurusato: false,
      isCosme:false,
      isSport:false,
      isInterior:false,
      swiperOption: {
        speed: 1000, // スライドの切り替わりスピード
        slidesPerView: 1,
        centeredSlides: true, // スライダーを真ん中に
        spaceBetween: 0, // 各スライドの余白
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
            spaceBetween: 10,
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      },
      cartData: '',
      searchedItem: false,
    }
  },
  computed: {
    items(){
      return this.$store.state.item.superSaleItems
    },
    searchMsg(){
      return this.$store.state.item.searchMessage
    }
    // ...mapState({
    //   firstViewItemList: (state) => state.item.shopItems,
    //   itemflg: (state) => state.item.itemflg,
    //   items: (state) => state.item.superSaleItems
    // }),
  },
  created(){
    this["item/fetchSuperSaleItem"]()
  },
  methods: {
    setSuperSaleItem(){
      this.isDoublePoint = false
      this.isSuperSale = true
      this.isFurusato = false
      this.isCosme =  false
      this.isSport = false
      this.isInterior = false
    },
    setDoublePointItem(){
      this.isDoublePoint = true
      this.isSuperSale = false
      this.isFurusato = false
      this.isCosme =  false
      this.isSport = false
      this.isInterior = false
    },
    setFurusatoItem(){
      this.isDoublePoint = false
      this.isSuperSale = false
      this.isFurusato = true
      this.isCosme =  false
      this.isSport = false
      this.isInterior = false
    },
    setCosmeItem(){
      this.isDoublePoint = false
      this.isSuperSale = false
      this.isFurusato = false
      this.isCosme =  true
      this.isSport = false
      this.isInterior = false
    },
    setSportItem(){
      this.isDoublePoint = false
      this.isSuperSale = false
      this.isFurusato = false
      this.isCosme =  false
      this.isSport = true
      this.isInterior = false
    },
    setInteriorItem(){
      this.isDoublePoint = false
      this.isSuperSale = false
      this.isFurusato = false
      this.isCosme =  false
      this.isSport = false
      this.isInterior = true
    },

    
    ...mapActions(['item/searchItem',"item/fetchSuperSaleItem"]),
  },
}
</script>

<style lang="scss" scoped>
.list5 {
  position: relative;
  margin: 30px auto;
}

.list5 ul,
.list5 ol {
  padding: 0;
  margin: 0;
  font-weight: bold;
  color: #999;
  list-style-type: none;
  border: none;
}

.index-list {
  width:12%;
  display: inline-block;
  padding: 5px 3px;
  line-height: 1.5;
}

.index-list:hover {
  background: #f3f3f4;
}
// .index-name {
// }
.index-name-select {
  line-height: 1.4;
  color: #555;
  border-bottom: 1.5px solid #bf0000;
}
@media screen and (max-width: 950px) {
.index-name {
  font-size:15px;
}
.index-list {
  width:25%;
  padding: 5px 3px;
  line-height: 1.5;
}
}
@media screen and (max-width: 430px) {
.index-name {
  font-size:12px;
}
}

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
