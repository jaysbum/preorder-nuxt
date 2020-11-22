<template>
  <div
    class="row"
    style="
      border-color: #bfbfbf;
      border-style: solid;
      border-width: thin;
      padding: 20px;
    "
  >
    <h4 style="color: #ff5724">วิธีการชำระเงิน</h4>
    <h5>ชำระโดยการโอนเงิน</h5>
    <p style="color: red">
      *โปรดยืนยันการชำระเงินหลังจากทำการโอนเงิน แล้ว แจ้งชำระเงิน
    </p>
    <div v-for="b in banks" class="row" style="margin-top: 10px; margin-bottom: 10px" v-if="banks">
      <div class="col-lg-5 col-md-5">
        <img :src="`${$config.baseImagePath}${b.qr.url}`" alt="">
      </div>
      <div class="col-lg-7 col-md-7">
        <div class="row">
          <div class="col-lg-12 col-md-12 text-center bank-text" style="padding:0px;">
            <img :src="`${$config.baseImagePath}${b.icon.url}`" style="width:100%">
          </div>
          <div class="col-lg-12 col-md-12 text-center bank-head">
            ชื่อบัญชี/สาขา
          </div>
          <div class="col-lg-12 col-md-12 text-center bank-text">
            <span>{{b.account_name}}</span>
            <span v-if="b.branch_name"><br>{{b.branch_name}}</span>
          </div>
          <div class="col-lg-12 col-md-12 text-center bank-head">
            เลขที่บัญชี
          </div>
          <div class="col-lg-12 col-md-12 text-center bank-text">
            <span>{{b.account_number}}</span>
          </div>
          <div class="col-lg-12 col-md-12 text-center bank-head">
            ขั้นตอนการชำระเงิน
          </div>
          <div class="col-lg-12 col-md-12 text-center" style="background-color:#E6E6E6">
            <img src="/assets/img/howtopay.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <p style="color: red">
      สงวนสิทธิ์ในการยกเลิกคำสั่งซื้อของลูกค้า หากลูกค้าไม่ได้ชำระเงินเข้ามา
      และไม่ได้ทำรายการยืนยันการชำระเงินผ่านช่องทาง ภายใน 48 ชั่วโมง
    </p>
  </div>
</template>
<script>
export default {
    name : "bank",
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
}
</script>
<style lang="css" scoped>
.bank-text {
  background-color:#E6E6E6;
}
.bank-head {
  background-color: #b5b3b3;
  font-weight: 600;
}
</style>