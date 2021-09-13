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
  addCart({ commit }, payload) {
    console.log("addCartのアクション呼び出し")
    console.log(payload)
    this.$axios.$post('/api/user/addcart', { payload})
  },
}
