export const state = () => ({
  shopItems: [
    {
      Item: {
        itemCode: '1',
        itemName: 'プロテイン(バニラ)',
        itemPrice: 1280,
        mediumImageUrls: [
          {
            imageUrl:
              'https://www.meiji.co.jp/products/sports/assets/img/4902777305400.jpg',
          },
        ],
      },
    },
    {
      Item: {
        itemCode: '2',
        itemName: 'プロテイン(チョコ)',
        itemPrice: 1280,
        mediumImageUrls: [
          {
            imageUrl:
              'https://www.meiji.co.jp/products/sports/assets/img/4902777305400.jpg',
          },
        ],
      },
    },
    {
      Item: {
        itemCode: '3',
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

export const getters = {}

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
