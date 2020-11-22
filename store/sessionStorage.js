import _ from 'lodash'
import moment from 'moment'
export const state = () => ({
  mode : 1,
  markup_rate : 1,
  items: [],
  setting : [],
  categories : [],
  cartTotal : 0,
  cartSupply : 0,
  insurance : 0,
  selectInsurance : 0,
  deliveryProvider : null,
  deliveryType : null,
  selectAddress : null,
  markupDiscount : null,
  promotions : null,
  newAddress : null,
  selectAddressData : null,
  tax : 0,
  taxData : [],
  subscribe : 0,
  agree : 0,
  orderId : []
})

export const mutations = {
  SET_GROUP_CART(state, groupCart){
    state.groupCart = groupCart
  },
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
  },
  SET_MARKUP_RATE(state,rate){
    state.markup_rate = rate
  },
  SET_SETTING(state,setting){
    state.setting = setting
  },
  SET_CATEGORIES(state,categories){
    state.categories = categories
  },
  SET_CART_TOTAL(state,total){
    state.cartTotal = total
  },
  SET_CART_SUPPLY(state,supply){
    state.cartSupply = supply
  },
  SET_INSURANCE(state,insurance){
    state.insurance = insurance
  },
  SET_DELIVERY(state,delivery){
    state.deliveryProvider = delivery
  },
  SET_STORE(state,{name,data}){
    state[name] = data
  }
}

export const actions = {
  setCart({ commit,items }) {
    commit('SET_CART', items)
  },
  setRate({ commit,rate }) {
    commit('SET_CART', rate)
  }
}

export const getters = {
  setting(state){
    return state.setting
  },
  cartTotal(state){
    var total = 0
    state.items.forEach((item, i) => {
      total = total + (item.price * item.quantity)
    });
    return total
  },
  cartMode(state){
    var el = this
    var mode = 1;
    state.items.forEach((item, i) => {
      if(item.mode == 2){
        mode = 2
      }
    });
    return mode
  },
  markupRate(state){
    return state.markup_rate
  },
  exchangeRate(state){
    return state.setting.exchangeRate
  },
  supplyTotal(state){
    var shop = 0
    var group = _.groupBy(state.items,"shop");
    var shopTotal = []
    var shopItemCount = []
    for (var i in group) {
      shop++;
      var tmpTotal = 0
      var tmpItemCount = 0
      for (var j = 0; j < group[i].length; j++) {
        tmpTotal += group[i][j].price * group[i][j].quantity * state.setting.exchangeRate
        tmpItemCount += group[i][j].quantity
      }
      shopTotal.push(tmpTotal)
      shopItemCount.push(tmpItemCount)
    }
    console.log(shopTotal);
    if(state.mode == 2){
      var total = 0
      state.setting.supplyRate.forEach((item, i) => {
        if(item.calculateType=="shop" && item.mode==state.mode && item.min <= shop && item.max >= shop){
          total = item.value * shop
        }
      });
    }else{
      var total = 0
      for (var i = 0; i < shopTotal.length; i++) {
        var condition = false;
        state.setting.supplyRate.forEach((item, j) => {
          if(item.calculateType=="price" && shopTotal[i] >= item.min && shopTotal[i] <= item.max && item.mode==state.mode){
            total = total + item.value
            condition = true
          }
          if(condition == false && item.calculateType=="item" && shopItemCount[i] >= item.min && shopItemCount[i] <= item.max && item.mode==state.mode){
            total = total + (shopItemCount[i] * item.value)
          }
        });
      }
    }
    return total
  },
  realPrice(state,getters){
    return (type) => {
      var total_key = type + "Total"
      return getters[total_key] - getters.discount(type,getters[total_key])
    }
  },
  shippingTotal(state,getters){
    var total = 0;
    var cartTotal = getters.cartTotal * state.setting.exchangeRate
    console.log(cartTotal);
    if(state.mode==1){
      state.setting.shippingRate.forEach((item, i) => {
        if(item.calculateType=="price" && item.mode==state.mode && item.min<=cartTotal && item.max>=cartTotal){
          total = cartTotal * (item.value/100)
        }
      });
    }
    return total
  },
  deliveryTotal(state,getters){
    var total = 0;
    var cartTotal = getters.cartTotal * state.setting.exchangeRate
    if(state.mode==1 && state.deliveryProvider != "มารับสินค้าเอง"){
      state.setting.deliveryRate.forEach((item, i) => {
        if(item.calculateType=="volume" && item.mode==state.mode && item.min<=cartTotal && item.max>=cartTotal){
          total = cartTotal * (item.valueCompound/100)
        }
      });
    }
    return total
  },
  serviceTotal(state,getters){
    var total = 0
    if(getters.cartTotal > state.setting.serviceChargeFrom){
      total = getters.cartTotal * (state.setting.serviceChargeRate/100) * state.setting.exchangeRate
    }
    if(total > state.setting.serviceChargeLimit){
      total = state.setting.serviceChargeLimit
    }
    return total
  },
  total(state,getters){
    var total = 0
			total = (getters.cartTotal + getters.price("supply") + getters.cartInsurance) * state.setting.exchangeRate;
			if(state.mode==1){
				total += getters.price("shipping") + getters.price("delivery") + getters.price("service");
			}
			return total
  },
  vat(state,getters){
    return getters.total * (state.setting.vat / 100)
  },
  totalNet(state,getters){
    if(state.mode==1){
      return getters.total + getters.vat
    }else{
      return getters.total
    }
  },
  cartInsurance(state){
    return state.insurance
  },
  insuranceRate(state){
    return state.setting.insuranceRate
  },
  discount(state,getters){
    return (type,total) => {
      var discount = 0
      if(state.markupDiscount[type].type=="percent"){
        discount = (total*(state.markupDiscount[type].value/100));
      }
      return discount
    }
  },
  price(state,getters){
    return (type) => {
      var price = getters.realPrice(type)
      var total = 0
      state.promotions.forEach(function(item){
        if(moment().isBetween(item.start, item.end) && price >= item.amount && item.active){
          if(item[type].type=="percent"){
            total += (price * item[type].value/100)
          }else{
            total += item[type].value
          }
        }
      });
      return price - total
    }
  }
}
