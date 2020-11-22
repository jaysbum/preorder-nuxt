export const state = () => ({
  mode : 1,
  markup_rate : 1,
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
  },
  SET_MODE(state,mode){
    state.mode = mode
  }
}

export const actions = {
  setCart({ commit,items }) {
    commit('SET_CART', items)
  }
}
