// import axios from 'axios'
import axios from 'axios'
import config from '../config'

export const state = () => ({
  itemflg: true,
  shopItems: [],
  itemDetail: {}
})

export const getters = {}

export const mutations = {
  searchItem(state, searchedItems) {
    state.shopItems = searchedItems
  },
  flgChange(state) {
    state.itemflg = false
  },
  setItemDetail(state, payload){
    state.itemDetail = payload
    console.log(state.itemDetail)
  }
}

export const actions = {
  searchItem({ commit }, searchedItems) {
    commit('searchItem', searchedItems)
  },
  fetchItemDetail({commit}, payload){
    const apiKey = config.RAKUTEN_API_KEY
    console.log(payload)
    axios
    .get(
      'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
      {
        params: {
          applicationId: apiKey,
          itemCode: payload,
        },
      }
    )
    .then((res) => {
      console.log(res.data.Items[0])
      const itemDetailObj = {
        itemId: res.data.Items[0].Item.itemCode,
        itemName: res.data.Items[0].Item.itemName,
        itemCaption: res.data.Items[0].Item.itemCaption,
        itemPrice: res.data.Items[0].Item.itemPrice,
        itemImage: res.data.Items[0].Item.mediumImageUrls[0].imageUrl,
      }
      commit("setItemDetail", itemDetailObj)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
// export const actions = {
//   searchItem({ commit }, searchWord) {
//     const apiKey = config.RAKUTEN_API_KEY
//     if (searchWord !== '') {
//       // this.searchedItems = ''
//       axios
//         .get(
//           'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
//           {
//             params: {
//               applicationId: apiKey,
//               keyword: this.searchWord,
//               hits: 30,
//             },
//           }
//         )
//         .then((response) => {
//           // console.log(response.data)
//           const searchedItems = response.data.Items
//           commit('searchItem', searchedItems)
//           // this['item/searchItem'](response.data.Items)
//           // this.$store.commit('item/flgChange')
//           this.$router.push('/')
//         })

//         .catch((err) => {
//           console.log(err)
//         })
//     }
//   },
// }
