export const state = () => ({
  searchedItems: {},
})

export const getters = {}

export const mutations = {
  searchItem(state, searchedItems) {
    state.searchedItems = searchedItems
  },
}

export const actions = {
  searchItem({ commit }, searchedItems) {
    commit('searchItem', searchedItems)
    console.log('actions発火')
  },
}
