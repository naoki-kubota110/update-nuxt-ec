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
  deleteCart(state, id) {
    const arry = state.cart.filter(order => {
      return order.status === 0
    })
    const deleteItem = arry[0].itemInfo.filter(item=> {
      return item._id !== id
    })
    arry[0].itemInfo = deleteItem
  },
}

export const actions = {
  getOrderItem({ commit }, carts) {
    commit('setOrderItem', carts)
  },
  newCart({ commit }, item) {
    this.$axios.$post('/api/user/newcart', item)
    this.$router.push('/orders/cart')
  },
  addCart({ commit }, payload) {
    console.log('addCartのアクション呼び出し')
    console.log(payload)
    this.$axios.$post('/api/user/addcart', { payload })
  },
  sendOrder({ commit }, payload) {
    console.log('store/sendOrder発火')
    this.$axios.$post('/api/user/send-order', { payload })
    // commit('sendOrder', payload)
  },
  deleteCart({ commit }, payload) {
    console.log('deletecart actions 呼び出し')
    console.log(payload.idx)
    this.$axios.$post('/api/user/deletecart', payload)
    commit('deleteCart', payload.itemId)
  },
}
