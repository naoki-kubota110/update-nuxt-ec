export const state = () => ({
  itemflg: true,
  shopItems: [],
})

export const getters = {}

export const mutations = {
  searchItem(state, searchedItems) {
    state.shopItems = searchedItems
  },
  flgChange(state) {
    state.itemflg = false
  },
}

export const actions = {
  searchItem({ commit }, searchedItems) {
    
    commit('searchItem', searchedItems)
  },
}
