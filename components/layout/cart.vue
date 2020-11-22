<template lang="html">
  <ul class="header-cart-area">
    <li>
      <div class="cart-area">
        <nuxt-link to="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i><span class="badge">{{$store.state.sessionStorage.items.length}}</span></nuxt-link>
        <ul v-if="$store.state.sessionStorage.items.length">
          <li v-for="cart,key in $store.state.sessionStorage.items">
            <div class="cart-single-product">
              <div class="media">
                <div class="pull-left cart-product-img">
                  <nuxt-link :to="`/product/detail/${cart.provider}/${cart.id}`">
                    <img class="img-responsive" alt="product" :src="cart.image">
                  </nuxt-link>
                </div>
                <div class="media-body cart-content">
                  <ul>
                    <li style="width:auto;">
                      <h2 style="font-size:xx-small"><nuxt-link :to="`/product/detail/${cart.provider}/${cart.id}`">{{cart.title}}</nuxt-link></h2>
                      <span style="font-size:xx-small;margin-right:10px;" v-for="opt in cart.options" v-if="cart.options.length">{{opt.group}} : <span style="font-weight:bold;">{{opt.label}}</span></span>
                    </li>
                    <li>
                      <p style="font-size:small">{{cart.price|price("baht",$store.state.sessionStorage.setting.exchangeRate)}} X {{cart.quantity}}</p>
                    </li>
                    <li>
                      <p style="font-size:small">Total : {{(cart.quantity * cart.price)|price("baht",$store.state.sessionStorage.setting.exchangeRate)}}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <span><span>ราคาสินค้ารวม</span></span><span>{{cartTotal|price("baht",exchangeRate)}}</span>
            <span><span>ค่าจัดส่งจากร้านจีน-โกดังจีน</span></span><span>{{supplyTotal|price("baht",exchangeRate)}}</span>
            <span><span>รวม</span></span><span>{{(cartTotal + supplyTotal)|price("baht",exchangeRate)}}</span>
          </li>
          <li>
            <ul class="checkout">
              <li><nuxt-link to="/cart" class="btn-checkout"><i class="fa fa-shopping-cart" aria-hidden="true"></i>ดูตะกร้าสินค้า</nuxt-link></li>
              <li><nuxt-link to="/checkout/step1" class="btn-checkout"><i class="fa fa-share" aria-hidden="true"></i>สั่งซื้อ</nuxt-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      cartTotal: 'sessionStorage/cartTotal',
      supplyTotal: 'sessionStorage/supplyTotal',
      exchangeRate: 'sessionStorage/exchangeRate'
    })
  }
}
</script>
<style lang="sass" scoped>
  $main-color: #ff5609
  .badge
      background-color: $main-color
      color: #fff
</style>
