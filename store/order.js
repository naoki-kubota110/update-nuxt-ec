export const state = () => ({
  orders:[]
})

export const getters = {
  historyData: state => {
    const data = state.orders.filter((order) => {
      return order.status !== 0
    })
    return data
  }
}

export const mutations = {
  setOrders(state, payload){
    state.orders = payload
    console.log(state.orders)
  }
}

export const actions = {
  getOrders({commit}, payload){
    console.log("getOrder呼び出し")
    console.log(payload)
    commit("setOrders", payload)
  }
}