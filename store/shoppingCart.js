export const state = () => ({
  cart: [],
})

export const getters = {
  cartItem: (state) => {
    const data = state.cart.filter((order) => {
      return order.status === 0
    })
    return data
  },
}

export const mutations = {
  setOrderItem(state, carts) {
    state.cart = carts
  },
  newCart(state, item) {
    // state.cart = []
    // state.cart = item
    // console.log(state.cart)
  },
  addCart(state, item) {
    state.cart = item
  },
  sendOrder(state, payload) {
    state.cart = payload
  },
  deleteCart(state, index) {
    state.cart
      .filter((order) => {
        return order.status === 0
      })[0]
      .itemInfo.splice(index, 1)
  },
}

export const actions = {
  getOrderItem({ commit }, carts) {
    commit('setOrderItem', carts)
  },
  newCart({ commit }, item) {
    this.$axios.$post('/api/user/new-cart', item)
    this.$router.push('/orders/cart')
  },
  addCart({ commit }, payload){
    console.log(payload)
    this.$axios.$post('/api/user/add-cart', { payload })
    this.$router.push('/orders/cart')
  },
  sendOrder({ commit }, payload) {
    console.log('store/sendOrder発火')
    this.$axios.$post('/api/user/send-order', { payload })
    // commit('sendOrder', payload)
  },
  deleteCart({ commit }, payload) {
    console.log('deletecart actions 呼び出し')
    console.log(payload.idx)
    this.$axios.$post('/api/user/delete-cart', payload)
    commit('deleteCart', payload.idx)
  },
}
