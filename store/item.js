export const state = () => ({
  shopItems: [
    {
      Item: {
        id: 1,
        itemName: 'プロテイン(バニラ)',
        itemPrice: 1280,
        mediumImageUrls: [
          {
            imageUrl:
              // 'https://www.meiji.co.jp/products/sports/assets/img/4902777305400.jpg',
              'https://thumbnail.image.rakuten.co.jp/@0_mall/bagray/cabinet/img05/pushup-001seth.jpg?_ex=128x128',
          },
        ],
      },
    },
    {
      Item: {
        id: 2,
        itemName: 'プロテイン(チョコ)',
        itemPrice: 1280,
        mediumImageUrls: [
          {
            imageUrl:
              'https://m.media-amazon.com/images/I/41bnltTBDzL._SL500_._AA300_.jpg',
          },
        ],
      },
    },
    {
      Item: {
        id: 3,
        itemName: 'プロテイン(ココア)',
        itemPrice: 1280,
        mediumImageUrls: [
          {
            imageUrl:
              'https://www.meiji.co.jp/products/sports/assets/img/4902777305219.jpg',
          },
        ],
      },
    },
  ],
})

// export const getters = {}

export const mutations = {
  searchItem(state, searchedItems) {
    state.shopItems = searchedItems
    console.log(searchedItems)
  },
}

export const actions = {
  searchItem({ commit }, searchedItems) {
    commit('searchItem', searchedItems)
  },
}
