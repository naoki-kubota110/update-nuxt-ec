// import axios from 'axios'
import axios from 'axios'
// import config from '../config'

export const state = () => ({
  itemflg: true,
  shopItems: [],
  itemDetail: {},
  itemArray:[],
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
  },
  deleteItemDetail(state){
    state.itemDetail = {}
  },
  setsuperSaleItem(state, superSaleItemArray){
    state.itemArray = superSaleItemArray
    state.searchMessage = ""
  },
  setSearchItem(state, payload){
    state.itemArray = payload.array
    state.searchMessage = `「${payload.searchword}」の検索結果`
  },
  setSearchErrorMessage(state){
    state.searchMessage = "検索結果が見つかりません"
    state.itemArray = []
  },
  setDoublePointItem(state, DoublePointItemArray){
    state.itemArray =DoublePointItemArray
    state.searchMessage = ""
  },
  setFurusatoItem(state,FurusatoItemArray){
    state.itemArray =FurusatoItemArray
    state.searchMessage = ""
  },
  setCosmeItem(state,CosmeItemArray){
    state.itemArray =CosmeItemArray
    state.searchMessage = ""
  },
  setSportItem(state,SportItemArray){
    state.itemArray =SportItemArray
    state.searchMessage = ""
  },
  setInteriorItem(state, InteriorItemArray){
    state.itemArray = InteriorItemArray
    state.searchMessage = ""
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
  fetchDoublePointItem({commit}){
    const apiKey = '1083744313894679387'
    axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
    {
      params: {
        applicationId: apiKey,
        // genreId:551167,
        keyword:"倍増",
        pointRateFlag: 1,
        hits: 30,
      },
    })
    .then((res) => {
      const DoublePointItemArray = []
      res.data.Items.forEach(data => {
        const DoublePointItemObj = {
          itemId: data.Item.itemCode,
          itemName : data.Item.itemName,
          itemImage: data.Item.mediumImageUrls[0].imageUrl,
          itemPrice : data.Item.itemPrice
        }
        DoublePointItemArray.push(DoublePointItemObj)
      })
      console.log(DoublePointItemArray)
      commit("setDoublePointItem", DoublePointItemArray)
    })
  },
  fetchFurusatoItem({commit}){
    const apiKey = '1083744313894679387'
    axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
    {
      params: {
        applicationId: apiKey,
        // genreId:551167,
        keyword:"【ふるさと納税】",
        hits: 30,
      },
    })
    .then((res) => {
      const FurusatoItemArray = []
      res.data.Items.forEach(data => {
        const FurusatoItemObj = {
          itemId: data.Item.itemCode,
          itemName : data.Item.itemName,
          itemImage: data.Item.mediumImageUrls[0].imageUrl,
          itemPrice : data.Item.itemPrice
        }
        FurusatoItemArray.push(FurusatoItemObj)
      })
      commit("setFurusatoItem", FurusatoItemArray)
    })
  },
  fetchCosmeItem({commit}){
    const apiKey = '1083744313894679387'
    axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
    {
      params: {
        applicationId: apiKey,
        genreId:100939	,
        hits: 30,
      },
    })
    .then((res) => {
      const CosmeItemArray = []
      res.data.Items.forEach(data => {
        const CosmeItemObj = {
          itemId: data.Item.itemCode,
          itemName : data.Item.itemName,
          itemImage: data.Item.mediumImageUrls[0].imageUrl,
          itemPrice : data.Item.itemPrice
        }
        CosmeItemArray.push(CosmeItemObj)
      })
      commit("setCosmeItem", CosmeItemArray)
    })
  },
  fetchSportItem({commit}){
    const apiKey = '1083744313894679387'
    axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
    {
      params: {
        applicationId: apiKey,
        genreId:101070,
        hits: 30,
      },
    })
    .then((res) => {
      const SportItemArray = []
      res.data.Items.forEach(data => {
        const SportItemObj = {
          itemId: data.Item.itemCode,
          itemName : data.Item.itemName,
          itemImage: data.Item.mediumImageUrls[0].imageUrl,
          itemPrice : data.Item.itemPrice
        }
        SportItemArray.push(SportItemObj)
      })
      commit("setSportItem", SportItemArray)
    })
  },
  fetchInteriorItem({commit}){
    const apiKey = '1083744313894679387'
    axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
    {
      params: {
        applicationId: apiKey,
        genreId:100804	,
        hits: 30,
      },
    })
    .then((res) => {
      const InteriorItemArray = []
      res.data.Items.forEach(data => {
        const InteriorItemObj = {
          itemId: data.Item.itemCode,
          itemName : data.Item.itemName,
          itemImage: data.Item.mediumImageUrls[0].imageUrl,
          itemPrice : data.Item.itemPrice
        }
        InteriorItemArray.push(InteriorItemObj)
      })
      commit("setInteriorItem", InteriorItemArray)
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