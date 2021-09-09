export const state = () => ({
  cart: null,
})

export const getters = {}

export const mutations = {
  newCart(state, item) {
    // state.cart = []
    state.cart = item
  },
  addCart(state, item) {
    state.cart = item
  },
}

export const actions = {
  newCart({ commit }, item) {
    this.$axios.$post('/api/cart-cretate', { item }).then((res) => {
      commit('newCart', item)
    })
  },
  addCart({ commit }, item) {
    this.$axios.$post('/api/cart-update', { item }).then((res) => {
      commit('addCart', item)
    })
  },
}
