<template>
	<div class="row" style="margin-bottom:30px;">
		<form @submit.prevent="saveOrder">
		<div class="container">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" style="padding:40px;">
				<img src="/assets/img/checkout/step3.png" style="height:78px;">
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h4 style="color:red;">*สงวนลิขสิทธิ์ในการยกเลิกคำสั่งซื้อของลูกค้า หากลูกค้าไม่ได้ชำระเงินเข้ามาและไม่ได้ทำรายการยืนยันการชำระเงินผ่านช่องทาง ภายใน 48 ชั่วโมง</h4>
						<label><input type="checkbox"  name="subscribe" @change="setSubscribe" v-model="subscribe"><span style="margin-left: 10px;padding-left:5px;margin-right: 10px;">ยินดีรับข่าวสาร และโปรโมชั่นใหม่ๆก่อนใครทางอีเมล์</span></label>
						<label><input type="checkbox"  name="agree" @change="setAgree" v-model="agree" required><span style="margin-left: 10px;padding-left:5px;margin-right: 10px;">ฉันยอมรับว่าได้อ่าน การบริการ และ การตรวจสอบคุณภาพสินค้า และ การรับประกันสินค้า และ กล่องบรรจุภัณฑ์ ของ Uget แล้ว</span></label>
						<img src="/assets/img/checkout/agreement.png" alt="">
						<!--<table style="width:100%">
							<tr>
								<td width="50%" style="padding-top:30px;"><nuxt-link :to="{ path: '/checkout2'}"><<<ย้อนกลับ</nuxt-link></td>
								<td class="text-right" style="padding-top:30px;">
									<button type="submit" name="button" style="height:40px;border:none;background:#ff5723;color:#fff;width:80%">ดำเนินการต่อ</button>
								</td>
							</tr>
						</table>-->
					</div>
				</div>
				<br>
				<div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h5 style="color:red;">ที่อยู่ในการจัดส่ง</h5>
						<span v-if="$store.state.sessionStorage.selectAddress==0">{{$store.state.sessionStorage.newAddress|fullNewAddress}}</span>
                        <span v-else>{{$store.state.sessionStorage.selectAddressData[0]|fullAddress}}</span>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
					<div class="row">
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<table class="table">
								<thead>
									<tr style="color:#ff5723;">
										<th>สินค้า</th>
										<th>รายละเอียด</th>
										<th>จำนวน</th>
										<th>ราคา</th>
									</tr>
								</thead>
								<tbody>
										<tr v-for="item in $store.state.sessionStorage.items">
											<td>
												<img :src="item.image" style="width:120px;">
											</td>
											<td>
												{{item.title}}<br>
												<small v-for="option in item.options">
														<span>{{option.group}} : {{option.label}}</span><br>
												</small>
											</td>
											<td>{{item.quantity}}</td>
											<td style="width:120px;">{{(item.price * item.quantity)|price("baht",exchangeRate)}}<br><small>{{(item.price * item.quantity)|price("yuan")}}</small></td>
										</tr>
								</tbody>
								<tfoot>
									<tr style="color:#ff5723;">
										<td colspan="3">ราคาสินค้ารวม :</td>
										<td>{{cartTotal|price("baht",exchangeRate)}}<br><small class="text-muted">{{cartTotal|price("yuan")}}</small></td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
					<hr style="border-top: 2px solid #eee;width: 100%;">
					<div class="row">
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div style="color:#ff5723;"><b>รูปแบบการส่งสินค้า</b></div>
							<table class="table">
								<tr>
									<td width="50%">ค่าจัดส่งร้านจีน - โกดัง Uget</td>
									<td class="text-right">
										<span id="ship_rate">{{price("supply")|price("baht",exchangeRate)}}</span><br>
										<small class="text-muted"><span id="ship_rate_price_cny">{{price("supply")|price("yuan")}}</span></small>
									</td>
								</tr>
								<tr v-if="cartMode==1">
									<td width="50%">ค่าขนส่งระหว่างประเทศ</td>
									<td class="text-right">
										<span id="ship_rate">{{price("shipping")|price("baht")}}</span>
									</td>
								</tr>
								<tr v-if="cartMode==1">
									<td width="50%">ค่าขนส่งในประเทศ</td>
									<td class="text-right">
										<span id="ship_rate">{{price("delivery")|price("baht")}}</span><br>
									</td>
								</tr>
								<!--<tr v-if="cartMode==1">
									<td colspan="2">
										<label><input type="radio"  name="th2cus_type" @change="setThCusType('all')" :checked="th2cus_type=='all'"><span style="display: inline-flex;margin-left: 10px;padding-left:5px;margin-right: 10px;">ส่งรวม</span></label>
										<label><input type="radio"  name="th2cus_type" @change="setThCusType('seperate')" :checked="th2cus_type=='seperate'"><span style="display: inline-flex;margin-left: 10px;padding-left:5px;margin-right: 10px;">มารับสินค้าเอง</span></label>
									</td>
								</tr>
								<tr style="color:#ff5723;" v-if="cartMode==1">
									<td width="50%">รวมค่าส่งสินค้า</td>
									<td class="text-right">
										<span id="ship_rate"></span><br>
									</td>
								</tr>-->
							</table>
						</div>
					</div>
					<hr style="border-top: 2px solid #eee;width: 100%;">
					<div class="row">
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div style="color:#ff5723;"><b>ค่าบริการและรับประกันสินค้า</b></div>
							<table class="table">
								<tr v-if="cartMode==1">
									<td width="50%">ค่าบริการ Uget</td>
									<td class="text-right">
										<span id="ship_rate">{{price("service")|price("baht")}}</span><br>
									</td>
								</tr>
								<tr>
									<td width="50%">ประกันสินค้า</td>
                                    <td class="text-right">
                                        <span id="ship_rate">{{cartInsurance|price("baht",exchangeRate)}}</span><!--<br>
										<small class="text-muted"><span id="ship_rate_price_cny">{{setInsurance()|price("yuan")}}</span></small>-->
                                    </td>
								</tr>
							</table>
						</div>
					</div>
					<hr style="border-top: 2px solid #eee;width: 100%;">
					<div class="row">
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<table class="table">
								<tr v-if="cartMode==1">
									<td width="50%">ภาษีมูลค่าเพิ่ม</td>
									<td class="text-right">
										<span id="ship_rate">{{vat| price("baht")}}</span>
									</td>
								</tr>
								<tr style="color:#ff5723;font-size:large;">
									<td width="50%">รวมราคาสุทธิ</td>
									<td class="text-right">
										<span id="ship_rate">
											{{ totalNet| price("baht")}}
										</span>
									</td>
								</tr>
								<tr>
									<td width="50%" style="padding-top:30px;"><nuxt-link :to="{ path: '/checkout/step1'}"><<<ย้อนกลับ</nuxt-link></td>
									<td class="text-right" style="padding-top:30px;">
										<button type="submit" name="button" style="height:40px;border:none;background:#ff5723;color:#fff;width:80%" :disabled="!agree">ดำเนินการต่อ</button>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data : function(){
        return {
            subscribe : 0,
            agree : 0,
            addressId : null,
            address : null
        }
    },
	computed: {
        ...mapGetters({
		setting: 'sessionStorage/setting',
		cartTotal: 'sessionStorage/cartTotal',
		discount: 'sessionStorage/discount',
		realPrice: 'sessionStorage/realPrice',
        price: 'sessionStorage/price',
        total: 'sessionStorage/total',
		vat: 'sessionStorage/vat',
		totalNet: 'sessionStorage/totalNet',
		cartMode: 'sessionStorage/cartMode',
		cartInsurance: 'sessionStorage/cartInsurance',
		insuranceRate: 'sessionStorage/insuranceRate',
        exchangeRate: 'sessionStorage/exchangeRate',
		markupRate: 'sessionStorage/markupRate',
		loggedInUser:'loggedInUser',
		supplyTotal : 'sessionStorage/supplyTotal',
		shippingTotal : 'sessionStorage/shippingTotal',
		deliveryTotal : 'sessionStorage/deliveryTotal',
		serviceTotal : 'sessionStorage/serviceTotal',
        })
	},
	mounted(){
		console.log(this.$store.state.sessionStorage.selectAddressData[0]);
	},
	methods : {
        setSubscribe(){
            this.$store.commit("sessionStorage/SET_STORE",{name:"subscribe",data:this.subscribe})
        },
        setAgree(){
            this.$store.commit("sessionStorage/SET_STORE",{name:"agree",data:this.agree})
        },
        saveOrder(){
            var state = this.$store.state.sessionStorage
			var el = this
			console.log(this.$store.state.sessionStorage.selectAddress);
            if(this.$store.state.sessionStorage.selectAddress!=0){
                this.address = this.$store.state.sessionStorage.selectAddressData
            }else{
                var storeAddress = this.$store.state.sessionStorage.newAddress
                this.address = {
                    name : storeAddress.firstname + " " + storeAddress.lastname,
                    address : storeAddress.address + " " + storeAddress.village + " " + storeAddress.building + " " + storeAddress.alley + " " + storeAddress.road,
                    subDistrict : storeAddress.subDistrict,
                    district : storeAddress.district,
                    province : storeAddress.province,
                    zipcode : storeAddress.zipcode,
                    email : storeAddress.email,
                    mobile : storeAddress.mobile,
                    user : this.loggedInUser._id
                }
                this.$axios.post('addresses', this.address).then(function(res){
                    if(res.status==200){
                        console.log(res.data);
                    }
                });
            }
            var order = {
                user : this.loggedInUser,
                detail : this.$_.groupBy(state.items,"shop"),
                address : this.address,
                mode : state.mode,
				rate : this.exchangeRate,
				subtotal : {
					cny : this.cartTotal,
					thb : this.cartTotal * this.exchangeRate
				},
                supply : {
					subtotal_cny : this.supplyTotal,
					subtotal : this.supplyTotal * this.exchangeRate,
					markupDiscount_cny : this.discount("supply",this.supplyTotal),
					markupDiscount : this.discount("supply",this.supplyTotal) * this.exchangeRate,
					promotionDiscount_cny : this.realPrice("supply") - this.price("supply"),
					promotionDiscount : (this.realPrice("supply") - this.price("supply")) * this.exchangeRate,
					total_cny : this.price("supply"),
					total : this.price("supply") * this.exchangeRate,
				},
				shipping : {
					subtotal : this.shippingTotal,
					markupDiscount : this.discount("shipping",this.shippingTotal),
					promotionDiscount : this.realPrice("shipping") - this.price("shipping"),
					total : this.price("shipping"),
				},
				delivery : {
					subtotal : this.deliveryTotal,
					markupDiscount : this.discount("delivery",this.deliveryTotal),
					promotionDiscount : this.realPrice("delivery") - this.price("delivery"),
					total : this.price("delivery"),
				},
				service : {
					subtotal : this.serviceTotal,
					markupDiscount : this.discount("service",this.serviceTotal),
					promotionDiscount : this.realPrice("service") - this.price("service"),
					total : this.price("service"),
				},
				tax : state.taxData,
                insurance : state.insurance,
                total : this.total,
                vat : this.vat,
                total_net : this.totalNet
			}
			console.log(order);
            this.$axios.post('orders', order).then(function(res){
                    if(res.status==200){
						el.$store.commit("sessionStorage/SET_STORE",{name:"orderId",data:res.data});
						el.$router.push("/checkout/step3")
                        console.log(res.data._id);
                    }
            });
        },
	}
}
</script>

<style lang="css">
</style>
