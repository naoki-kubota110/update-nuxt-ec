export const state = () => ({
  favoriteItem: [],
})

export const getters = {}

export const mutations = {
  addFavoriteItem(state, payload) {
    state.favoriteItem.push(payload)
  },
  deleteFavoriteItem(state, payload) {
    const deleteItem = state.favoriteItem.filter((item) => {
      return payload.favoriteId !== item.favoriteId
    })
    state.favoriteItem = deleteItem
  },
  getFavoriteItem(state, payload) {
    state.favoriteItem = payload
  },
}
export const actions = {
  addFavoriteItem({ commit }, payload) {
    const favoriteObj = {
      favoriteId : payload.itemInfo[0].itemId,
      itemName : payload.itemInfo[0].itemName,
      itemImage : payload.itemInfo[0].itemImage,
      itemPrice: payload.itemInfo[0].itemPrice
    }
    commit('addFavoriteItem', favoriteObj)
    this.$axios.$post('/api/user/add-favorite', payload)
  },
  deleteFavoriteItem({ commit }, payload) {
    this.$axios.$post('/api/user/delete-favorite', payload)
    commit('deleteFavoriteItem', payload)
  },
  getFavoriteItem({ commit }, payload) {
    this.$axios.$post('/api/user/get-favorite', payload).then((res) => {
      commit('getFavoriteItem', res.userFavorite)
    })
  },
}
