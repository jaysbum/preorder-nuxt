<template>
	<div class="row" style="margin-bottom:30px;">
		<div class="container">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" style="padding:40px;">
				<img src="/assets/img/checkout/step5.png" style="height:78px;">
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						<img src="/assets/img/checkout/complete1.png">
						<table style="width:100%">
							<tr>
								<td width="50%" style="padding-top:30px;" class="text-left"><router-link :to="{ path: '/'}"><<<กลับสู่หน้าหลัก</router-link></td>
								<td class="text-right" style="padding-top:30px;">
									<button type="button" name="button" style="height:40px;border:none;background:#ff5723;color:#fff;width:80%">ตรวจสอบสถานะสินค้า</button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:25px;">
				<div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						<img src="/assets/img/checkout/complete2.png">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	mounted(){
	},
	methods : {
	}
}
</script>

<style lang="css">
</style>
