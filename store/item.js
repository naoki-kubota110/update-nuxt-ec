// import axios from 'axios'
// import config from '../config'

export const state = () => ({
  itemflg: true,
  shopItems: [],
})

export const getters = {}

export const mutations = {
  searchItem(state, searchedItems) {
    state.shopItems = searchedItems
  },
  flgChange(state) {
    state.itemflg = false
  },
}

export const actions = {
  searchItem({ commit }, searchedItems) {
    commit('searchItem', searchedItems)
  },
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
