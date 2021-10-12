// import axios from 'axios'
import axios from 'axios'
// import config from '../config'

export const state = () => ({
  itemflg: true,
  shopItems: [],
  itemDetail: {},
  superSaleItems:[],
  searchMessage : ""
})

export const getters = {}

export const mutations = {
  searchItem(state, searchedItems) {
    state.shopItems = searchedItems
  },
  flgChange(state) {
    state.itemflg = false
  },
  setItemDetail(state, payload){
    state.itemDetail = payload
    console.log(state.itemDetail)
  },
  deleteItemDetail(state){
    state.itemDetail = {}
  },
  setsuperSaleItem(state, superSaleItemArray){
    console.log("setsuper")
    state.superSaleItems = superSaleItemArray
    console.log(state.superSaleItems)
  },
  setSearchItem(state, payload){
    state.superSaleItems = payload.array
    state.searchMessage = `「${payload.searchword}」の検索結果`
  },
  setSearchErrorMessage(state){
    console.log("setsearchErr")
    state.searchMessage = "検索結果が見つかりません"
    state.superSaleItems = []
  }
}

export const actions = {
  fetchSuperSaleItem({commit}){
    const apiKey = '1083744313894679387'
    axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
    {
      params: {
        applicationId: apiKey,
        keyword: 'スーパーセール',
        hits: 30,
      },
    })
    .then((res) => {
      const superSaleItemArray = []
      res.data.Items.forEach(data => {
        const SuperSaleItemObj = {
          itemId: data.Item.itemCode,
          itemName : data.Item.itemName,
          itemImage: data.Item.mediumImageUrls[0].imageUrl,
          itemPrice : data.Item.itemPrice
        }
        superSaleItemArray.push(SuperSaleItemObj)
      })
      console.log(superSaleItemArray)
      commit("setsuperSaleItem", superSaleItemArray)
    })
  },
  searchItem({ commit }, searchWord) {
    const apiKey = '1083744313894679387'
    axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
    {
      params: {
        applicationId: apiKey,
        keyword: searchWord,
        hits: 30,
      },
    })
    .then((res) => {
      const searchItemArray = []
      res.data.Items.forEach(data => {
        const searchItemObj = {
          itemId: data.Item.itemCode,
          itemName : data.Item.itemName,
          itemImage: data.Item.mediumImageUrls[0].imageUrl,
          itemPrice : data.Item.itemPrice
        }
        searchItemArray.push(searchItemObj)
      })
      console.log(searchItemArray)
      if(searchItemArray.length === 0){
        commit("setSearchErrorMessage")
      }else{
        commit("setSearchItem", {array:searchItemArray, searchword: searchWord})
      }
    })
    .catch(()=> {
      console.log("検索失敗")
      commit("setSearchErrorMessage")
    })
  },
  fetchItemDetail({commit}, payload){
    const apiKey = '1083744313894679387'
    console.log(payload)
    axios
    .get(
      'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
      {
        params: {
          applicationId: apiKey,
          itemCode: payload,
        },
      }
    )
    .then((res) => {
      console.log(res.data.Items[0])
      const itemDetailObj = {
        itemId: res.data.Items[0].Item.itemCode,
        itemName: res.data.Items[0].Item.itemName,
        itemCaption: res.data.Items[0].Item.itemCaption,
        itemPrice: res.data.Items[0].Item.itemPrice,
        itemImage: res.data.Items[0].Item.mediumImageUrls[0].imageUrl,
      }
      commit("setItemDetail", itemDetailObj)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  deleteItemDetail({commit}){
    console.log("deleteItemDetail")
    commit("deleteItemDetail")
  }
}