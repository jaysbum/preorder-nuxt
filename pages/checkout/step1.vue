<template>
	<div class="row" style="margin-bottom:30px;">
		<form @submit.prevent="nextStep">
		<div class="container">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" style="padding:40px;">
				<img src="/assets/img/checkout/step2.png" style="height:80px;">
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h4 style="color:#ff5723;">ที่อยู่ในการจัดส่ง</h4>
						<div class="row" v-for="address,key in addresses" style="margin-left:auto;" v-if="addressList">
							<label><input type="radio" class="select_address" name="select_address" :value="address._id" @change="setAddress" v-model="selectAddress" required><span style="display: inline-flex;margin-left: 10px;font-weight:400">{{address|fullAddress}}</span></label>
						</div>
						<label><input type="radio" class="select_address" name="select_address" value="0" @change="setAddress" v-model="selectAddress" required><span style="display: inline-flex;margin-left: 10px;">เพิ่มที่อยู่ในการจัดส่ง</span></label>
						<div v-if="selectAddress==0">
						<div class="row new-address" >
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label>ชื่อจริง <font color="red">*</font></label>
								<input type="text" class="form-control new_address" v-model="newAddress.firstname" required>
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label>นามสกุล <font color="red">*</font></label>
								<input type="text" class="form-control new_address" v-model="newAddress.lastname" required>
							</div>
						</div>
						<div class="row new-address" >
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label>หมู่บ้าน</label>
								<input type="text" class="form-control new_address" v-model="newAddress.village">
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label>อาคาร</label>
								<input type="text" class="form-control new_address" v-model="newAddress.building">
							</div>
						</div>
						<div class="row new-address" >
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label>บ้านเลขที่ <font color="red">*</font></label>
								<input type="text" class="form-control new_address" v-model="newAddress.address" required>
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label>ตรอก/ซอย</label>
								<input type="text" class="form-control new_address" v-model="newAddress.alley">
							</div>
						</div>
						<div class="row new-address" >
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label>ถนน</label>
								<input type="text" class="form-control new_address" v-model="newAddress.road">
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<addressinput-subdistrict v-model="newAddress.subDistrict" />
							</div>
						</div>
						<div class="row new-address" >
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<addressinput-district v-model="newAddress.district" />
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<addressinput-province v-model="newAddress.province" />
							</div>
						</div>
						<div class="row new-address" >
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<addressinput-zipcode v-model="newAddress.zipcode" />
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<label>Email <font color="red" style="font-size:x-small;">* (ที่ใช้ในการติดต่อลูกค้าเกี่ยวกับการสั่งซื้อ)</font></label>
								<input type="text" class="form-control new_address" v-model="newAddress.email" required>
							</div>
						</div>
						<div class="row new-address" >
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<label>เบอร์โทรศัพท์มือถือ <font color="red" style="font-size:x-small;">* (ที่ใช้ในการติดต่อลูกค้าเกี่ยวกับการสั่งซื้อ)</font></label>
								<input type="text" class="form-control new_address" v-model="newAddress.mobile" required>
							</div>
						</div>
						<div class="row new-address">
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<label>หมายเหตุถึง Uget</label>
								<textarea class="form-control new_address" v-model="newAddress.remark" rows="10"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<label><input type="checkbox"  value="1" v-model="tax_request"><span style="display: inline-flex;margin-left: 10px;">ขอใบกำกับภาษี</span></label>
							</div>
						</div>
						<div class="row tax_request" v-if="tax_request">
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<label>หมายเลขประจำตัวผู้เสียภาษี/หมายเลขบัตรประชาชน</label>
								<input type="text" class="form-control new_address" v-model="tax.id" required>
							</div>
						</div>
						<div class="row tax_request" v-if="tax_request">
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<label>ชื่อบริษัท / ร้านค้า / ชื่อ - นามสกุล</label>
								<input type="text" class="form-control new_address" v-model="tax.name" required>
							</div>
						</div>
						<div class="row tax_request" v-if="tax_request">
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<label>ที่อยู่</label>
								<textarea class="form-control new_address" v-model="tax.address" required rows="6"></textarea>
							</div>
						</div>
						<div class="row tax_request" v-if="tax_request">
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">
								<label><input type="checkbox"  v-model="same_address" value="1" @change="fillAddress" required><span style="display: inline-flex;margin-left: 10px;float:right;">ตามที่อยู่จัดส่ง</span></label>
							</div>
						</div>
						</div>
						<div class="row" style="margin-top:20px;">
							<div class="col-md-12">
								<h4 style="color: rgb(255, 87, 35);">เลือกวิธีการจัดส่งภายในประเทศ เพื่อคำนวณค่าใช้จ่าย</h4>
								<p style="display:grid;">
									<label v-for="delivery in setting.deliveryProvider"><input type="radio" :value="delivery.name" v-model="deliveryProvider" @change="setDeliveryProvider" required><span style="margin-left:10px;">{{delivery.name}}</span></label>
								</p>
							</div>
						</div>
						<div class="row">
							<img src="/assets/img/checkout/transport.png" class="img-responsive">
						</div>
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
									<td width="50%">
										<label><input type="checkbox" value="1" v-model="insurance" @change="setInsurance"><span style="display: inline-flex;margin-left: 10px;padding-left:5px;margin-right: 10px;">ประกันสินค้า</span></label>
									</td>
                                    <td class="text-right">
                                        <span id="ship_rate">{{setInsurance()|price("baht",exchangeRate)}}</span><!--<br>
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
									<td width="50%" style="padding-top:30px;"><router-link :to="{ path: '/cart'}"><<<ย้อนกลับ</router-link></td>
									<td class="text-right" style="padding-top:30px;">
										<button type="submit" name="button" style="height:40px;border:none;background:#ff5723;color:#fff;width:80%">ดำเนินการต่อ</button>
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
    middleware: "auth",
    computed: {
        ...mapGetters({
		setting: 'sessionStorage/setting',
		cartTotal: 'sessionStorage/cartTotal',
		price: 'sessionStorage/price',
		vat: 'sessionStorage/vat',
		totalNet: 'sessionStorage/totalNet',
		cartMode: 'sessionStorage/cartMode',
		cartInsurance: 'sessionStorage/cartInsurance',
		insuranceRate: 'sessionStorage/insuranceRate',
        exchangeRate: 'sessionStorage/exchangeRate',
		markupRate: 'sessionStorage/markupRate',
        loggedInUser:'loggedInUser'
        })
    },
    data : function(){
		return {
			tax_request : 0,
			new_address : 0,
			addressList : [],
			add_province : null,
			add_district : null,
			add_subDistrict : null,
			selectAddress : null,
            addresses : [],
            newAddress : {
                firstname : null,
                lastname : null,
                village : "",
                building : "",
                address : null,
                alley : "",
                road : "",
                subDistrict : null,
                district : null,
                province : null,
                zipcode : null,
                email : null,
                mobile : null,
                remark : null
            },
            tax_request : 0,
			tax : {
                id : null,
                name : null,
                address : null
            },
            same_address : 0,
			insurance : 0,
			deliveryTypeList : [
				{
					value : "valuePickup",
					name : "มารับสินค้าเอง"
				},
				{
					value : "valueSplit",
					name : "ส่งแยก"
				},
				{
					value : "valueCompound",
					name : "ส่งรวม"
				},
			],
			deliveryProvider : null,
			deliveryType : null
		}
    },
    mounted(){
        var el = this
        this.$axios.get("addresses?user="+this.loggedInUser._id).then(function(res){
            console.log(res.data);
            el.addresses = res.data
		})
		this.deliveryType = this.$store.state.sessionStorage.deliveryType
		this.deliveryProvider = this.$store.state.sessionStorage.deliveryProvider
		this.selectAddress = this.$store.state.sessionStorage.selectAddress
		this.insurance = this.$store.state.sessionStorage.selectInsurance
		console.log("enter");
    },
    methods : {
        fillAddress(){
            if(this.same_address){
                this.tax.address = this.newAddress.village + " " + this.newAddress.building + " " + this.newAddress.address + " " + this.newAddress.alley + " " + this.newAddress.road + " ตำบล/แขวง " + this.newAddress.subDistrict + " อำเภอ/เขต " + this.newAddress.district + " จังหวัด " + this.newAddress.province + " รหัสไปรษณีย์ " + this.newAddress.zipcode
            }else{
				this.tax.address = ""
			}
		},
		total(mode){
			var total = 0
			total = (this.cartTotal + this.supplyPrice + this.cartInsurance) * this.exchangeRate;
			if(mode==1){
				total += this.shippingPrice + this.deliveryPrice;
			}
			return total
		},
        setInsurance(){
			var i = 0;
			var selectInsurance = 0
            if(this.insurance){
				i = this.cartTotal * (this.insuranceRate/100) 
				selectInsurance = 1
			}
			this.$store.commit("sessionStorage/SET_STORE",{name:"insurance",data:i})
			this.$store.commit("sessionStorage/SET_STORE",{name:"selectInsurance",data:selectInsurance})
			console.log(this.$store.state.sessionStorage.selectInsurance);
			//this.$store.commit("sessionStorage/SET_INSURANCE",i)
			return i
		},
		setDeliveryProvider(){
			this.$store.commit("sessionStorage/SET_STORE",{name:"deliveryProvider",data:this.deliveryProvider})
			console.log(this.$store.state.sessionStorage.deliveryProvider);
			//this.$store.commit("sessionStorage/SET_DELIVERY",this.deliveryProvider)
		},
		setDeliveryType(){
			this.$store.commit("sessionStorage/SET_STORE",{name:"deliveryType",data:this.deliveryType})
		},
		setAddress(){
			this.$store.commit("sessionStorage/SET_STORE",{name:"selectAddress",data:this.selectAddress})
			console.log(this.$store.state.sessionStorage.selectAddress);
		},
		nextStep(){
			var el = this
			if(this.selectAddress==0){
				this.$store.commit("sessionStorage/SET_STORE",{name:"newAddress",data:this.newAddress})
				console.log(this.newAddress);
			}else{
				this.$axios.get("addresses?_id="+this.selectAddress).then(function(res){
					el.$store.commit("sessionStorage/SET_STORE",{name:"selectAddressData",data:res.data})
					console.log(el.$store.state.sessionStorage.selectAddressData);
				})
			}
			if(this.tax_request){
				this.$store.commit("sessionStorage/SET_STORE",{name:"tax",data:this.tax_request})
				this.$store.commit("sessionStorage/SET_STORE",{name:"taxData",data:this.tax})
			}
			this.$router.push('/checkout/step2')
		}
    }
}
</script>

<style lang="css">
input.th-address-input {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    /*font-weight: 400;*/
    /*font-size: 14px;*/
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.th-address-autocomplete {
    width: 200%;
    font-size: xx-small;
    font-weight: 300;
}
</style>
