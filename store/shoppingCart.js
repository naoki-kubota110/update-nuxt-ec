// import axios from 'axios'

export const state = () => ({
  cart: [],
})

export const getters = {}

export const mutations = {
  newCart(state, item) {
    state.cart.push(item)
    console.log('newCart')
  },
  addCart(state, item) {
    state.cart.push(item)
    console.log('addCart')
  },
}

export const actions = {
  newCart({ commit }, item) {
    // axios
    //   .post('http://localhost:3000/api/new-cart', { body: 'aaa' })
    //   .then((res) => {
    //     console.log('サーバーからのレスポンス')
    //     console.log(res)
    //     commit('newCart', item)
    //   })

    // this.$axios.$post('/', item).then((res) => {
    //   console.log(item)
    //   // console.log(res.$post)
    //   commit('newCart', item)
    // })
    this.$axios.$post('/api/cart-cretate', { foo: item }).then((res) => {
      // console.log(res)
      // console.log(res.$post)
      commit('newCart', item)
    })
  },
  addCart({ commit }, item) {
    commit('addCart', item)
  },
}
