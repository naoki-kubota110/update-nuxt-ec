export const state = () => ({
  cart: null,
})

export const getters = {}

export const mutations = {
  newCart(state, item) {
    // state.cart = []
    state.cart = item
    console.log(state.cart)
  },
  addCart(state, item) {
    state.cart = item
  },
}

export const actions = {
  newCart({ commit }, item) {
    this.$axios.$post('/api/user/newcart', item).then((res) => {
      commit('newCart', item)
    })
  },
  addCart({ commit }, item) {
    this.$axios.$post('/api/cart-update', { item }).then((res) => {
      commit('addCart', item)
    })
  },
}
