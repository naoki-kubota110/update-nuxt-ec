export const state = () => ({
  orders: [],
  ordersBeforeLogin:null
})

export const getters = {
  // カート履歴画面で表示するデータ
  // ユーザーが保持するオーダー情報の中のStatusが０（まだ注文処理を行っていない）のもの
  CartDataArry : state => {
    const data = state.orders.filter((order) => {
      return order.status === 0
    })
    return data
  },
  // 注文履歴画面で表示するデータ
  // ユーザーが保持するオーダー情報の中のStatusが０（まだ注文処理を行っていない）ではないもの
  historyData: (state) => {
    const data = state.orders.filter((order) => {
      return order.status !== 0
    })
    return data
  }
}

export const mutations = {
  setOrders(state, payload) {
    state.orders = payload
  },
  setNewCart(state, items){
    state.orders.push(items)
  },
  setAddCart(state, items){
    const cart = state.orders.filter(order =>{
      return order.status === 0
    })
    cart[0].itemInfo.push(items)
  },
  setOrder(state, payload){
    const cart = state.orders.filter(order =>{
      return order.status === 0
    })
    const orderInfo = {
      destinationAddress: payload.destinationAddress,
      destinationDate: payload.destinationDate,
      destinationEmail: payload.destinationEmail,
      destinationName: payload.destinationName,
      destinationTel: payload.destinationTel,
      destinationZipcode: payload.destinationZipcode,
    }
    cart[0].orderInfo = orderInfo
    cart[0].status = payload.status
  },
  deleteCart(state, id) {
    const arry = state.orders.filter(order => {
      return order.status === 0
    })
    const deleteItem = arry[0].itemInfo.filter(item=> {
      return item.itemId !== id
    })
    arry[0].itemInfo = deleteItem
  },
  setCancelOrder(state,id){
    const CancelArry = state.orders.filter(order => {
      return order.orderId === id
    })
    CancelArry[0].status = 9
  },
  setCartDataBeforeLogin(state,cartData){
    state.ordersBeforeLogin = cartData
    console.log(state.ordersBeforeLogin)
  },
  setnewCartBeforeLogin(state,item){
    state.ordersBeforeLogin = item
    console.log(state.ordersBeforeLogin)
    this.$router.push("/orders/cart")
  },
  setaddCartBeforeLogin(state,item){
    console.log(state.ordersBeforeLogin)
    state.ordersBeforeLogin.itemInfo.push(item)
    console.log(state.ordersBeforeLogin)
    this.$router.push("/orders/cart")
  },
  setDeleteBeforeLoginItems(state, item){
    state.ordersBeforeLogin = item
  }
}

export const actions = {
  // 各ユーザーが保持しているすべての注文情報を取得
  getOrders({ commit }, payload) {
    this.$axios.$post('/order/all-orders', payload).then(res => {
      commit('setOrders', res.orders)
    })
  },
  // カートに追加する処理（1つ目の商品）
  newCart({ commit }, items) {
    this.$axios.$post('/order/new-cart', items)
    commit("setNewCart", items)
    this.$router.push('/orders/cart')
  },
  // カートに追加する処理（2つ目以降）
  addCart({ commit }, payload){
    this.$axios.$post('/order/add-cart', { payload })
    const addCartData = {
      itemId: payload.itemId,
      itemName:  payload.itemName,
      itemPrice: payload.itemPrice,
      itemImage: payload.itemImage,
      buyNum: payload.buyNum,
    }
    commit("setAddCart", addCartData)
    this.$router.push('/orders/cart')
  },
  // カート内商品を削除
  deleteCart({ commit }, payload) {
    this.$axios.$post('/order/delete-cart', payload)
    commit('deleteCart', payload.itemId)
  },
  // 注文実行処理
  sendOrder({ commit }, payload) {
    console.log('store/sendOrder発火')
    this.$axios.$post('/order/send-order', { payload })
    console.log(payload)
    commit("setOrder", payload)
    this.$router.push('/orders/complete')
  },
  // 注文キャンセル処理
  cancelOrder({commit}, id){
    this.$axios.$post('/order/cancel-order', {orderId: id})
    commit("setCancelOrder", id)
    },
    fetchCartItemsBeforeLogin({commit}){
      console.log("fetch")
      const cartData = JSON.parse(localStorage.getItem("itemsBeforeLogin"))
      console.log(typeof(cartData))
      commit("setCartDataBeforeLogin",cartData)
    },
    newCartBeforeLogin({commit}, item){
      localStorage.setItem('itemsBeforeLogin', JSON.stringify(item))
      commit("setnewCartBeforeLogin", item)
    },
    addCartBeforeLogin({commit}, item){
      console.log(item)
      const localData  = JSON.parse(localStorage.getItem("itemsBeforeLogin"))
      console.log(localData)
      localData.itemInfo.push(item)
      localStorage.setItem('itemsBeforeLogin', JSON.stringify(localData))
      commit("setaddCartBeforeLogin",item)
    },
    deleteCartItemsBeforeLogin({commit},index){
        const localData  = JSON.parse(localStorage.getItem("itemsBeforeLogin"))
        localData.itemInfo.splice(index,1)
        localStorage.setItem('itemsBeforeLogin', JSON.stringify(localData))
        commit("setDeleteBeforeLoginItems",localData)
    }
}
