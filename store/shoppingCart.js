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
    this.$axios.$post('/api/order/new-cart', item)
    this.$router.push('/orders/cart')
  },
  addCart({ commit }, payload){
    console.log(payload)
    this.$axios.$post('/api/order/add-cart', { payload })
    this.$router.push('/orders/cart')
  },
  sendOrder({ commit }, payload) {
    console.log('store/sendOrder発火')
    this.$axios.$post('/api/order/send-order', { payload })
  },
  deleteCart({ commit }, payload) {
    console.log('deletecart actions 呼び出し')

    this.$axios.$post('/api/order/delete-cart', payload)
    commit('deleteCart', payload.itemId)
  },
}
