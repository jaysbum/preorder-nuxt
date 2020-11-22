<template lang="html">
  <div class="container">
    <div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" style="padding:40px;">
				<img src="/assets/img/checkout/step1.png" alt="" style="height:80px;">
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" v-if="groupCart">
				<table class="table" style="table-layout: fixed;width: 100%;" v-for="group,key,index in groupCart">
					<tbody>
						<tr style="background:#ff5723;color:white;">
							<td colspan="6"><b>ร้านค้าที่ : {{index+1}}</b></td>
							<td></td>
						</tr>
						<tr>
							<th class="text-center" style="width:15%;color:#ff5723;">รูปสินค้า</th>
							<th class="text-center" style="width:5%;">รายการ</th>
							<th class="text-center" style="width:30%;color:#ff5723;">ชื่อสินค้า</th>
							<th style="width:10%">ราคา</th>
							<th style="width:20%">จำนวน</th>
							<th style="width:15%">รวม</th>
							<th style="width:5%"></th>
						</tr>
						<tr v-for="item,key_item in group">
							<td>
                <nuxt-link :to="`/product/detail/${item.provider}/${item.id}`">
                  <img :src="item.data.mainImage" style="width:120px;">
                </nuxt-link>
              </td>
							<td class="text-center">{{index+1}}-{{key_item+1}}</td>
							<td>
                <span style="font-size:smaller;margin-bottom:10px;">
                  <nuxt-link :to="`/product/detail/${item.provider}/${item.id}`">
                    {{item.data.title}}
                  </nuxt-link>
                </span>
                <div v-for="opt in item.options" style="font-size:x-small;">
                  <span><b>{{opt.group}}</b> : <img :src="opt.image" style="height:30px;"> {{opt.label}}</span>
                </div>
              </td>
							<td>{{item.price| price("baht",exchangeRate)}}<br><small class="text-muted">{{item.price| price("yuan")}}</small></td>
							<td>
								<div class="input-group">
									<span class="input-group-addon"><button class="minus" style="background:transparent;border:none;" @click="editCart(item._id,'-')"> - </button></span>
									<input type="number" class="form-control qty" :value="item.quantity" @change="updateQuantity($event,item._id)" @keyup="updateQuantity($event,item._id)" min=1>
									<span class="input-group-addon"><button class="plus" style="background:transparent;border:none;" @click="editCart(item._id,'+')"> + </button></span>
								</div>
							</td>
							<td><span>{{(item.quantity * item.price)| price("baht",exchangeRate)}}</span><br><small class="text-muted"><span>{{(item.quantity * item.price)| price("yuan")}}</span></small></td>
							<td>
								<button type="button" name="button" class="btn btn-danger" @click="deleteCart($event,item._id)"><i class="fa fa-trash"></i></button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<img src="/assets/img/cart-image.png" class="img-responsive">
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<table class="table">
					<thead>
						<tr>
							<th colspan="2"><h4 style="color:#ff5723;">สรุปราคาสั่งซื้อทั้งหมด</h4></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="text-left" style="padding:20px;width:50%">ราคาสินค้ารวม:</td>
							<td class="text-right">
								<span id="total">{{total| price("baht",exchangeRate)}}</span><br>
								<small class="text-muted"><span id="total_cny">{{total| price("yuan")}}</span></small>
							</td>
						</tr>
						<tr>
							<td class="text-left" style="padding:20px;width:50%">ค่าจัดส่งจากร้านค้าจีน-โกดังจีน:</td>
							<td class="text-right">
								<span id="ship_rate">{{supplyTotal| price("baht",exchangeRate)}}</span><br>
								<small class="text-muted"><span id="ship_rate_cny">{{supplyTotal| price("yuan")}}</span></small>
							</td>
						</tr>
						<tr>
							<td class="text-left" style="padding:20px;">รวม:</td>
							<td class="text-right">
								<span id="grand_total">{{total+supplyTotal| price("baht",exchangeRate)}}</span><br>
								<small class="text-muted"><span id="grand_total_cny">{{total+supplyTotal| price("yuan")}}</span></small>
							</td>
						</tr>
						<tr>
							<td class="text-left"></td>
							<td class="text-right"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      supplyTotal: 'sessionStorage/supplyTotal',
      cartMode: 'sessionStorage/cartMode',
      exchangeRate: 'sessionStorage/exchangeRate',
      markupRate: 'sessionStorage/markupRate',
    })
  },
  data : function(){
    return {
      groupCart : [],
      total : 0,
      checked : [],
      item_count : 0
    }
  },
  created(){
    this.updateCart();
  },
  mounted() {
  },
  methods : {
    groupByShop : function(){
      this.groupCart = this.$_.groupBy(this.$store.state.sessionStorage.items,"shop");
    },
    editCart : function(_id,operation){
      var el = this
      if(operation=="+"){
        this.$store.state.sessionStorage.items.forEach((item, i) => {
          if(item._id == _id){
            const value = item.quantity+1
            el.$store.commit('sessionStorage/EDIT_CART_QUANTITY',{idx:i,quantity:value})
          }
        });
      }else{
        this.$store.state.sessionStorage.items.forEach((item, i) => {
          if(item._id == _id){
            var value = 0
            if(item.quantity>1){
              value = item.quantity-1
            }else{
              value = 1
            }
            el.$store.commit('sessionStorage/EDIT_CART_QUANTITY',{idx:i,quantity:value})
          }
        });
      }
      this.updateCart();
		},
    updateQuantity : function(event,_id){
      var el = this
      let value = event.target.value;
      this.$store.state.sessionStorage.items.forEach((item, i) => {
        if(item._id == _id){
          el.$store.commit('sessionStorage/EDIT_CART_QUANTITY',{idx:i,quantity:value})
        }
      });
      this.updateCart();
    },
    deleteCart : function(event,_id){
      var el = this
      let value = event.target.value;
      this.$store.state.sessionStorage.items.forEach((item, i) => {
        if(item._id == _id){
          el.$store.commit('sessionStorage/REMOVE_CART',i)
        }
      });
      this.updateCart();
      this.$store.commit("sessionStorage/SET_MODE",this.cartMode)
    },
    updateTotal : function(){
      var el = this
      this.total = 0;
      this.$store.state.sessionStorage.items.forEach((item, i) => {
        el.total += (item.quantity * item.price)
      });
    },
    /*checkMode : function(){
      var el = this
      var mode = 1;
      this.$store.state.sessionStorage.items.forEach((item, i) => {
        if(item.mode == 2){
          mode = 2
        }
      });
      this.$store.commit("sessionStorage/SET_MODE",mode)
    },*/
    updateCart : function(){
      this.groupByShop();
      this.updateTotal();
      this.countShop();
      this.countItem();
    },
    countShop : function(){
      return this.$_.uniq(this.$store.state.sessionStorage.items,"shop").length;
    },
    countItem : function(){
      var el = this
      this.item_count = 0;
      this.$store.state.sessionStorage.items.forEach((elem, key) => {
        el.item_count += elem.quantity
      })
    },
    /*updateTotal : function(){
      //console.log(this.checked);
      var el = this
      this.total = 0;
      this.$store.state.sessionStorage.items.forEach((elem, key) => {
        if(el.checked.includes(elem._id)){
            el.total += (elem.quantity * elem.price)
        }
      });
    }*/
  }
}
</script>

<style lang="css" scoped>
.app {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
