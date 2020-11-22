<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <h4 style="margin-top:25px;">ผลการค้นหาคำว่า "{{$route.params.keyword}}" จาก : {{$route.params.provider}}.com</h4>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 text-right">
        <paginate
          v-model="page"
          :page-count="100"
          :page-range="10"
          :click-handler="search"
          :prev-text="'ก่อนหน้า'"
          :next-text="'ถัดไป'"
          :container-class="'pagination'">
        </paginate>
      </div>
    </div>
    <div class="row">
      <!--<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" v-if="listCategory.length > 0">
        <ul>
          <li v-for="category in listCategory" style="padding:5px;">
            <span style="margin-left:15px;"><nuxt-link :to="{ path: '/search/taobao/' + category.cat_name + '/1'}">{{category.cat_name}}</nuxt-link></span>
            <hr style="margin-top:5px;margin-bottom:5px;">
          </li>
        </ul>
      </div>-->
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3" v-for="result in results" style="height:300px;">
            <div class="product-box1">
              <div>
                <nuxt-link :to="{ path: '/product/detail/' + $route.params.provider + '/' + result.itemId }"><img class="img-responsive" :src="result.image" alt="product"></nuxt-link>
              </div>
              <div class="product-content-holder text-left">
                <span class="price">{{(result.promoPrice * markupRate) | price("yuan")}}</span><span style="float:right;">{{(result.promoPrice * markupRate) | price("baht",exchangeRate)}}</span>
                  <small style="text-decoration:line-through;color:#aaa;" v-if="result.promoPrice!=result.price">{{result.price | price("yuan")}}</small><br>
                  <span style="background:#FF5723;padding:5px;font-size: small;color: white;" v-if="result.promoPrice!=result.price">{{((result.promoPrice-result.price)/result.price)*100 | ceil}}% Off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data : function(){
    return {
      page : this.$route.params.page
    }
  },
  computed: {
    ...mapGetters({
      exchangeRate: 'sessionStorage/exchangeRate',
      markupRate: 'sessionStorage/markupRate',
    })
  },
  asyncData({ $axios, route , params , $config }) {
    let endpoint = $config.baseApiPath + '/search/' + route.params.provider + '/' + route.params.keyword + '/' + route.params.page
    return $axios.get(`${endpoint}`).then(res => {
      console.log(res.data);
      return {
        results : res.data
      }
    })
  },
  mounted(){
    console.log(this.markupRate);
  },
  methods: {
    search : function(pageNum){
      const url = "/product/search/" + this.$route.params.provider + "/" + this.$route.params.keyword + "/" + parseInt(this.page)
      this.$router.push(url)
    },
    getCol : function(length){
      return (length)?"col-lg-9 col-md-9 col-sm-12 col-xs-12":"col-lg-12 col-md-12 col-sm-12 col-xs-12";
    },
    getList : function(length){
      return (length)?"col-lg-3 col-md-3 col-sm-6 col-xs-12":"col-lg-2 col-md-2 col-sm-4 col-xs-12";
    },
  }
}
</script>

<style lang="css" scoped>
img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.product-box1 .product-content-holder span {
  font-size: large;
  color: orangered;
  font-weight: 400;
}
</style>
