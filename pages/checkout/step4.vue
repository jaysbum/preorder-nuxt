<template>
	<div class="row" style="margin-bottom:30px;">
		<form @submit.prevent="nextStep">
		<div class="container">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" style="padding:40px;">
				<img src="/assets/img/checkout/step5.png" style="height:78px;">
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h4 style="color:#FF5724;text-transform:uppercase;">เลขคำสั่งซื้อ {{$store.state.sessionStorage.orderId._id}}</h4>
						<p>ชื่อและนามสกุล : {{$store.state.sessionStorage.orderId.address[0].name}}<br>
						Email : {{$store.state.sessionStorage.orderId.address[0].email}}<br>
						เบอร์โทรศัพท์ : {{$store.state.sessionStorage.orderId.address[0].mobile}}</p>
						<hr>
						<h4 style="color:#FF5724"><span style="float:left">ยอดชำระเงิน</span><span style="float:right">{{$store.state.sessionStorage.orderId.total_net|price("baht")}}</span></h4>
						<br>
						<hr>
						<h4 style="color:#FF5724">แจ้งรายละเอียดการชำระเงิน</h4>
						<div class="row">
							<div class="col-md-12">
								<label for="date">วันที่ชำระเงิน</label>
								<VueCtkDateTimePicker v-model="date"></VueCtkDateTimePicker>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<label for="date">จำนวนเงิน</label>
								<input type="number" class="form-control" v-model="d_amount" :min="$store.state.sessionStorage.orderId.total_net" step="any" required>
							</div>
							<div class="col-md-6">
								<label for="date">ธนาคาร</label>
								<select class="form-control" v-model="d_bank" required>
								<option v-for="b in banks" :value="b">{{b.account_number}} {{b.bank_name}} {{b.account_name}}</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<label>จ่ายด้วยกระเป๋าเงิน</label>
								<div class="row">
								<div class="col-md-12" style="display:inline-flex">
								<input type="checkbox" class="form-control" style="width:20px;"><input type="number" class="form-control" v-model="n_pocket">
								</div>
								</div>
							</div>
							<div class="col-md-6 text-right" style="padding-top:30px;">
								<span style="color:#FF5724;font-size:smaller">ยอดคงเหลือใน(Uget Pay) {{loggedInUser.pocket|price("baht")}}</span>
							</div>	
						</div>
						<div class="row">
							<div class="col-md-12">
							<label>แนบภาพหลักฐานการชำระเงิน</label>
							<div class="row">
								<img :src="`${$config.baseImagePath}${image.url}`" v-if="image" class="col-md-4" style="margin-bottom:10px;">
							</div>
							<div class="custom-file col-md-4">
								<input ref="cover" type="file" class="custom-file-input" @change="saveImage" required>
							</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
							<label>รายละเอียดเพิ่มเติม</label>
							<textarea class="form-control" rows="5" v-model="d_remark"></textarea>
							</div>
						</div>
						<div class="row" style="margin-top:20px;">
							<div class="col-md-6 text-left">
								<router-link :to="{ path: '/step4'}"><<<ย้อนกลับ</router-link>
							</div>
							<div class="col-md-6 text-right">
								<button type="submit" name="button" style="height:40px;border:none;background:#ff5723;color:#fff;width:80%">แจ้งชำระเงิน</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<bank />
			</div>
		</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import bank from './../../components/checkout/bank'
export default {
    component: {
        bank
    },
	computed: {
        ...mapGetters({
            loggedInUser:'loggedInUser',
        })
    },
	data : function(){
		return {
			date:new Date(),
			d_amount : null,
			d_bank : null,
			d_check : false,
			d_wallet : null,
			d_file : null,
			d_remark : null,
            n_pocket : 0,
			banks : null,
			image : null
		}
	},
	mounted(){
		var el = this
        this.$axios.get("banks").then(function(res){
            el.banks = res.data
            console.log(res.data);
		});
		this.d_amount = this.$store.state.sessionStorage.orderId.total_net
	},
	methods : {
		nextStep : function(){
			var el = this
			var payment = {
				user : this.loggedInUser._id,
				order : this.$store.state.sessionStorage.orderId._id,
				date : this.date,
				amount : this.d_amount,
				bank : this.d_bank,
				slip_image : this.image,
				note : this.d_remark
			}
			var order = {
				payment : payment
			}
			this.$axios.put('orders/'+this.$store.state.sessionStorage.orderId._id, order).then(function(res){
                    if(res.status==200){
						//el.$store.commit("sessionStorage/SET_STORE",{name:"orderId",data:res.data});
						el.$router.push("/checkout/step5")
                    }
            });
		},
		saveImage(event) {
			let el = this
			let formData = new FormData();
			formData.append("files",event.target.files[0]);
			this.$axios.post('/upload', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			}).then(function(res){
				el.image = res.data[0]
			});
		},
	},
	created() {
	}
}
</script>

<style lang="css">
</style>
