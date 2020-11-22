<template lang="html">
  <header>
    <div class="header-area-style1" id="sticker">
      <div class="header-top">
        <div class="header-top-inner-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="header-contact">
                  <ul>
                    <li style="letter-spacing:0px;">Contact Center Tel. {{site.phone}}</li>
                    <li><img src="/assets/img/icon/line.png" class="icon"></li>
                    <li><img src="/assets/img/icon/facebook.png" class="icon"></li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="account-wishlist">
                  <ul>
                    <ul v-if="!isAuthenticated">
                      <li><nuxt-link :to="{ path: '/login'}"><img src="/assets/img/icon/login.png" style="height:20px;"> ล็อคอิน</nuxt-link></li>
                      <li><nuxt-link :to="{ path: '/login'}"> สมัครสมาชิก</nuxt-link></li>
                    </ul>
                    <ul v-else>
													<li>
														<div class="dropdown">
																<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="border:none;background-color:transparent;">
																	<img src="/assets/img/icon/member.png" style="height:25px;margin-right:5px;"> บัญชีของ {{loggedInUser.firstname}} {{loggedInUser.lastname}}
																	<span class="caret"></span>
																</button>
																<ul class="dropdown-menu" aria-labelledby="dropdownMenu1" style="width:max-content">
																	<hr style="border-color:#FF5723;border-width: thick;margin-top: -10px;">
																	<li><a href="#" style="border-right:none;"><img src="/assets/img/icon/member.png" style="height:25px;margin-right:10px;"> จัดการบัญชีของฉัน</a></li>
																	<hr style="margin:5px;">
																	<li><a href="#" style="border-right:none;"><img src="/assets/img/icon/order.png" style="height:25px;margin-right:10px;"> รายการสั่งซื้อของฉัน</a></li>
																	<hr style="margin:5px;">
																	<li><a href="#" style="border-right:none;"><img src="/assets/img/icon/favorite.png" style="height:25px;margin-right:10px;"> รายการสินค้าที่ชอบ</a></li>
																	<hr style="margin:5px;">
																	<li><a href="#" style="border-right:none;"><img src="/assets/img/icon/money.png" style="height:25px;margin-right:10px;"> คะแนนสะสม</a></li>
																	<hr style="margin:5px;">
																	<li><a href="#" style="border-right:none;"><img src="/assets/img/icon/purse.png" style="height:25px;margin-right:10px;"> กระเป๋าเงิน</a></li>
																	<hr style="margin:5px;">
																	<li><a href="#" style="border-right:none;"><img src="/assets/img/icon/truck.png" style="height:25px;margin-right:10px;margin-left:-5px;"> ติดตามสถานะสินค้า</a></li>
																	<hr style="margin:5px;">
																	<li><a href="#" style="border-right:none;"><img src="/assets/img/icon/print.png" style="height:25px;margin-right:10px;"> พิมพ์ใบรับสินค้า</a></li>
																	<hr style="margin:5px;">
																	<li><a href="#" style="border-right:none;"><img src="/assets/img/icon/print.png" style="height:25px;margin-right:10px;"> พิมพ์ใบกำกับภาษี</a></li>
																	<hr style="margin:5px;">
																	<li><a href="#" style="border-right:none;" @click.prevent="logout"><img src="/assets/img/icon/logout.png" style="height:25px;margin-right:10px;"> ออกจากระบบ</a></li>
																</ul>
															</div>
													</li>
													<li><nuxt-link :to="{path:'/favorite'}" style="border-left: 1px solid #a1a1a1;"><img src="/assets/img/icon/favorite.png" style="height:25px;margin-right:5px;margin-left:5px;"> รายการที่ชื่นชอบ</nuxt-link></li>
											</ul>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="header-top-inner-bottom">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div class="logo-area">
                  <nuxt-link to="/"><img class="img-responsive" src="/assets/img/logo.png" alt="logo" style="height:55px;"></nuxt-link>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <search />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <button class="tracking-btn" type="button" name="button"><i class="fas fa-truck" style="margin-right:5px;"></i>เชคสถานะสินค้า<i class="fas fa-arrow-alt-circle-right" style="margin-left:5px;"></i></button>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    ปรับเรทราคา <span class="rate" style="font-size:x-large;">{{$store.state.sessionStorage.setting.exchangeRate}}</span> บาท
                    <br>
                    เริ่ม <span class="rate">{{$store.state.sessionStorage.setting.updatedAt}}</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-1 col-md-1 col-sm-1 col-xs-12">
                <cart />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-bottom">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-4">
              <h2 class="category-menu-title close-on-tab"><a href="#"><i class="fa fa-bars" aria-hidden="true"></i></a>Categories</h2>
              <div class="logo-area">
                <nuxt-link to="/"><img class="img-responsive" src="/assets/img/logo.png" alt="logo" style="height:55px;"></nuxt-link>
              </div>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-8">
              <div class="main-menu-area">
                <nav>
                  <ul>
                    <li class="active"><nuxt-link to="/">หน้าแรก</nuxt-link></li>
                    <li><nuxt-link to="/">บริการของเรา</nuxt-link></li>
                    <li><nuxt-link to="/">คำถามที่พบบ่อย</nuxt-link></li>
                    <li><nuxt-link to="/">ติดต่อเรา</nuxt-link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <!-- Mobile Menu Area Start Here -->
        <div class="mobile-menu-area">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="mobile-menu">
                  <nav id="dropdown">
                    <ul>
                      <li class="active"><nuxt-link to="/">หน้าแรก</nuxt-link></li>
                      <li><nuxt-link to="/">บริการของเรา</nuxt-link></li>
                      <li><nuxt-link to="/">คำถามที่พบบ่อย</nuxt-link></li>
                      <li><nuxt-link to="/">ติดต่อเรา</nuxt-link></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Mobile Menu Area End Here -->
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import search from './search'
import cart from './cart'
export default {
  name : "Header",
  computed: {
  ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  components : {
    search,cart
  },
  data : function(){
    return {
      site : []
    }
  },
  mounted(){
    var el = this
    this.$axios.get("/site").then(function(res){
      el.site = res.data;
    })
  },
  methods:{
    async logout(){
      var el = this
      this.$swal({
        title: 'คุณต้องการออกจากระบบ?',
        text: "กรุณายืนยันการออกจากระบบ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่ นำฉันออกจากระบบ'
      }).then(async function(result){
        if(result.isConfirmed){
          await el.$auth.logout()
          el.$swal({
                    title : "ออกจากระบบแล้ว",
                    toast : true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    icon : 'success'
          });
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
$main-color: #ff5609
.icon
    height: 20px
    margin-left: 5px
    margin-right: 5px
.category-menu-title
    background-color: $main-color
.tracking-btn
    color: #fff
    background-color: $main-color
    border: none
    width: 100%
    height: 45px
    font-size: smaller
.rate
    font-size: smaller
    color: $main-color
</style>
