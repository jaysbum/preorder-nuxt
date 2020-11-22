<template>
	<div class="row" style="margin-bottom:30px;">
		<div class="container">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" style="padding:40px;">
				<img src="/assets/img/checkout/step4.png" style="height:78px;">
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						<img src="/assets/img/checkout/thankyou.png">
						<span style="color:red">รหัสการสั่งซื้อของคุณคือ <br><span style="font-size:x-large;text-transform: uppercase;">{{$store.state.sessionStorage.orderId._id}}</span></span>
						<img src="/assets/img/checkout/notify_text.png">
						<table style="width:100%">
							<tr>
								<td width="50%" style="padding-top:30px;" class="text-left"><nuxt-link :to="{ path: '/'}"><<<กลับสู่หน้าหลัก</nuxt-link></td>
								<td class="text-right" style="padding-top:30px;">
									<button type="button" name="button" style="height:40px;border:none;background:#ff5723;color:#fff;width:80%">แจ้งชำระเงิน</button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<bank />
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import bank from './../../components/checkout/bank'
export default {
    component : {
        bank
    },
    data : function(){
        return {
            banks : null
        }
    },
	mounted(){
        var el = this
        this.$axios.get("banks").then(function(res){
            el.banks = res.data
            console.log(res.data);
        });
        //console.log(this.$store.state.sessionStorage.orderId);
	},
	methods : {
	},
	created() {
	}
}
</script>

<style lang="css">
</style>
