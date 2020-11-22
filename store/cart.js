export const state = () => ({
  items: []
})

export const mutations = {
  SET_CART(state, items){
    items.forEach((item, i) => {
      state.items.push(item)
    });
  },
  UPDATE_CART(state, items){
    state.items = items
  },
  CLEAR_CART(state){
    state.items = []
  },
  EDIT_CART_QUANTITY(state,{idx,quantity}){
    state.items[idx].quantity = parseInt(quantity)
    state.items.push()
  },
  REMOVE_CART(state,idx){
    state.items.splice(idx,1)
  }
}

export const actions = {
  setCart({ commit,items }) {
    commit('SET_CART', items)
  }
}
