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
    this.$axios.$post('/api/user/delete-favorite', payload)
    state.favoriteItem = deleteItem
  },
  getFavoriteItem(state, payload) {
    state.favoriteItem = payload
  },
}
export const actions = {
  addFavoriteItem({ commit }, payload) {
    this.$axios.$post('/api/user/add-favorite', payload).then((res) => {
      commit('addFavoriteItem', payload)
    })
  },
  deleteFavoriteItem({ commit }, payload) {
    commit('deleteFavoriteItem', payload)
  },
  getFavoriteItem({ commit }, payload) {
    this.$axios.$post('/api/user/get-favorite', payload).then((res) => {
      // console.log(res)
      commit('getFavoriteItem', res.userFavorite)
    })
  },
}
