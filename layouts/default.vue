<template>
  <div>
    <div class="wrapper-area">
      <!--[if lt IE 8]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      <!-- Add your site or application content here -->
      <!-- Header Area Start Here -->
      <Header />
      <!-- Header Area End Here -->
      <nuxt />
      <!-- Footer Area Start Here -->
      <Footer />
      <!-- Footer Area End Here -->
    </div>
    <!-- Modal Dialog Box Start Here-->
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-body">
          <button type="button" class="close myclose" data-dismiss="modal">&times;</button>
          <div class="product-details1-area">
            <div class="product-details-info-area">
              <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <div class="inner-product-details-left">
                    <div class="tab-content">
                      <div id="metro-related1" class="tab-pane fade active in">
                        <a href="#"><img class="img-responsive" src="/assets/img/product/product-details1.jpg" alt="single"></a>
                      </div>
                      <div id="metro-related2" class="tab-pane fade">
                        <a href="#"><img class="img-responsive" src="/assets/img/product/product-details1.jpg" alt="single"></a>
                      </div>
                      <div id="metro-related3" class="tab-pane fade">
                        <a href="#"><img class="img-responsive" src="/assets/img/product/product-details1.jpg" alt="single"></a>
                      </div>
                    </div>
                    <ul>
                      <li class="active">
                        <a aria-expanded="false" data-toggle="tab" href="#metro-related1"><img class="img-responsive" src="/assets/img/product/product-details4.jpg" alt="related1"></a>
                      </li>
                      <li>
                        <a aria-expanded="false" data-toggle="tab" href="#metro-related2"><img class="img-responsive" src="/assets/img/product/product-details4.jpg" alt="related2"></a>
                      </li>
                      <li>
                        <a aria-expanded="false" data-toggle="tab" href="#metro-related3"><img class="img-responsive" src="/assets/img/product/product-details4.jpg" alt="related3"></a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div class="inner-product-details-right">
                    <h3>Product Title Here</h3>
                    <ul>
                      <li><i aria-hidden="true" class="fa fa-star"></i></li>
                      <li><i aria-hidden="true" class="fa fa-star"></i></li>
                      <li><i aria-hidden="true" class="fa fa-star"></i></li>
                      <li><i aria-hidden="true" class="fa fa-star"></i></li>
                      <li><i aria-hidden="true" class="fa fa-star"></i></li>
                    </ul>
                    <p class="price">$59.00</p>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinc amet risus consectetur, non consectetur nisl finibus. Ut ac eros quis mi volutpat cursus vel non risus.</p>
                    <div class="product-details-content">
                      <p><span>SKU:</span> 0010</p>
                      <p><span>Availability:</span> In stock</p>
                      <p><span>Category:</span> Demo Products</p>
                    </div>
                    <ul class="product-details-social">
                      <li>Share:</li>
                      <li><a href="#"><i aria-hidden="true" class="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i aria-hidden="true" class="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i aria-hidden="true" class="fa fa-linkedin"></i></a></li>
                      <li><a href="#"><i aria-hidden="true" class="fa fa-pinterest"></i></a></li>
                    </ul>
                    <ul class="inner-product-details-cart">
                      <li><a href="#">Add To Cart</a></li>
                      <li>
                        <div class="input-group quantity-holder" id="quantity-holder">
                          <input type="text" placeholder="1" value="1" class="form-control quantity-input" name="quantity">
                          <div class="input-group-btn-vertical">
                            <button type="button" class="btn btn-default quantity-plus"><i aria-hidden="true" class="fa fa-plus"></i></button>
                            <button type="button" class="btn btn-default quantity-minus"><i aria-hidden="true" class="fa fa-minus"></i></button>
                          </div>
                        </div>
                      </li>
                      <li><a href="#"><i class="fa fa-heart-o" aria-hidden="true"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a href="#" class="btn-services-shop-now" data-dismiss="modal">Close</a>
        </div>
      </div>
    </div>
    <!-- Modal Dialog Box End Here-->
    <!-- Preloader Start Here -->
    <!--<div id="preloader"></div>-->
    <!-- Preloader End Here -->
  </div>
</template>
<script>
import Header from "./../components/layout/header"
import Footer from "./../components/layout/footer"
export default {
  components : {
    Header,Footer
  },
  created(){
    var el = this
    this.$axios.get("setting").then(function(res){
      el.$store.commit("sessionStorage/SET_STORE",{name:"setting",data:res.data});
    })
    this.$axios.get("categories").then(function(res){
      el.$store.commit("sessionStorage/SET_STORE",{name:"categories",data:res.data});
    })
    this.$axios.get("markup").then(function(res){
      console.log(res.data);
      el.$store.commit("sessionStorage/SET_STORE",{name:"markupDiscount",data:res.data});
    })
    this.$axios.get("promotions").then(function(res){
      console.log(res.data);
      el.$store.commit("sessionStorage/SET_STORE",{name:"promotions",data:res.data});
    })
  }
}
</script>
<style>
body,h1,h2,h3,h4,h5,h6{
  font-family: 'Kanit', sans-serif;
  letter-spacing: 0.5;
}
</style>
