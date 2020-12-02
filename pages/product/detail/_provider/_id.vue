<template lang="html">
  <div class="container app" v-if="item">
    <h5>{{item.title}}</h5>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <img :src="mainImage" class="img-responsive" style="width:100%">
        <span v-for="thumb in item.listImage" style="padding:5px;">
          <img :src="thumb" class="img-thumbnail" style="height:50px;" @mouseover="setMainImage">
        </span>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <h4><span class="priceLabel">ราคา(หยวน)</span><span v-for="price,key in sortArray(item.price)" :key="key" class="priceShow" v-if="key==0 || key==(item.price.length - 1)">{{price.price * markupRate | price("yuan")}} <span v-if="key != item.price.length - 1"> - </span></span></h4>
        <h4><span class="priceLabel">ราคา(บาท)</span><span v-for="price,key in sortArray(item.price)" :key="key" class="priceShow" v-if="key==0 || key==(item.price.length - 1)">{{price.price * markupRate | price("baht",(exchangeRate))}} <span v-if="key != item.price.length - 1"> - </span></span></h4>
        <a :href="item.link" target="_blank" style="font-size:small;"><i class="fas fa-link"></i> {{item.link}}</a>
        <br />
        <span style="font-size:small;">ร้านค้า : <strong>{{item.vendor}}</strong></span>
        <div class="row div-border" v-for="option,key in item.sku" style="padding:20px 0px 20px 0px;margin:10px;">
          <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <strong>{{option.group}} : </strong>
          </div>
          <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
            <span v-for="opt,idx in option.value" :key="idx" class="option-label">
              <span v-if="key!=item.sku.length-1 || key==0">
                <input type="radio" @change="checkSku(key,opt,option.group)" :id="optionId(key,idx)" class="option-input" :name="radioGroup(key)" :data-group="option.group" :data-group-original="option.groupOriginal" :data-image="opt.image" :data-value="opt.label" :data-value-original="opt.labelOriginal">
                <label :for="optionId(key,idx)">
                  <img :src="opt.image" class="option-image" v-if="opt.isImage" style="margin-right:5px;"> {{opt.label}}
                </label>
              </span>
              <div :class="disabledClass" style="border-bottom:1px dotted #ccc;padding:10px; 0px; 10px; 0px;" v-else>
                <div class="col-sm-4">
                  <img :src="opt.image" class="option-image" v-if="opt.isImage"><strong>{{opt.label}}</strong>
                </div>
                <div class="col-sm-2">
                  <span v-if="optionValue[idx] && optionValue[idx].price" style="font-size:smaller;">
                    {{optionValue[idx].price * markupRate | price("yuan")}}
                    <br />
                    {{optionValue[idx].price * markupRate | price("baht",exchangeRate)}}
                  </span>
                </div>
                <div class="col-sm-3">
                  <span v-if="optionValue[idx] && optionValue[idx].price" style="font-size:smaller;">
                  stock : {{optionValue[idx].stock}}
                  </span>
                </div>
                <div class="col-sm-3">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <button class="btn btn-outline-secondary input-quantity" type="button" @click="changeInput('minus',idx)" :disabled="optionValue[idx] && !optionValue[idx].price">-</button>
                    </span>
                    <input type="number" class="form-control input-quantity" v-model="quantity[idx]" :disabled="optionValue[idx] && !optionValue[idx].price" style="padding:0px;font-size:x-small;">
                    <span class="input-group-addon">
                      <button class="btn btn-outline-secondary input-quantity" type="button" @click="changeInput('plus',idx)" :disabled="optionValue[idx] && !optionValue[idx].price">+</button>
                    </span>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
        <div :class="disabledClass" v-if="item.sku.length <= 1" style="padding:20px 0px 20px 0px;margin:10px;">
            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
              <strong>จำนวน</strong>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div class="input-group">
                <div class="input-group-addon">
                  <button class="btn btn-outline-secondary input-quantity" type="button" @click="changeInput('minus',0)">-</button>
                </div>
                <input type="number" class="form-control input-quantity" v-model="quantity[0]" style="padding:0px;font-size:x-small;">
                <div class="input-group-addon">
                  <button class="btn btn-outline-secondary input-quantity" type="button" @click="changeInput('plus',0)">+</button>
                </div>
              </div>
            </div>
        </div>
        <div class="row" v-if="selectPrice.length">
          <div class="col-lg-12 col-md-12" style="background-color:orangered;padding:10px 30px; 10px; 20px;">
            <span style="color:#fff;"><strong>จำนวนสินค้าที่เลือก {{selectedQuantity()}} ชิ้น ยอดรวม {{selectedTotal()| price("yuan")}} {{selectedTotal()|price("baht",exchangeRate)}}</strong></span>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12" style="padding:10px 0px; 10px; 20px;">
            <button style="background-color:orange;border:none;padding:10px 30px 10px 30px;color:#fff;" @click="addCart" :disabled="disabledCart"><i class="fas fa-shopping-cart"></i> เพิ่มสินค้าลงในตะกร้า</button>
            <button type="button" name="button" @click="clearCart">clear</button>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="row">
      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">

      </div>
      <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <div v-html="item.detail"></div>
      </div>
    </div>-->
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      exchangeRate: 'sessionStorage/exchangeRate',
      markupRate: 'sessionStorage/markupRate',
    }),
  },
  data : function(){
    return {
      mainImage : null,
      rate : null,
      priceShow : null,
      priceOld : null,
      optionValue : [],
      quantity : [],
      singleQuantity : 0,
      selectOptionData : [],
      selectOptions : [],
      selectItems : [],
      selectPrice : [],
      selectQuantity : [],
      selectTotal : []
    }
  },
  asyncData({ $axios, route , params , $config }) {
    let endpoint = $config.baseApiPath + '/item/' + route.params.provider + '/' + route.params.id
    return axios.get(`${endpoint}`).then(res => {
      return {
        item : res.data,
        mainImage : res.data.mainImage,
        skuMap: res.data.skuMap,
        provider : params.provider,
        disabledCart : (res.data.sku.length>0)?true:false,
        disabledClass : (res.data.sku.length>0)?"row disabledbutton":"row"
      }
    })
  },
  mounted() {
    this.initQty();
    /*var el = this
    this.$axios.get("/exchange-rate").then(function(res){
      el.rate = res.data
    })
    console.log(this.$store.state.sessionStorage.mode);*/
  },
  methods : {
    initQty : function(){
      var el = this
      this.item.sku[this.item.sku.length-1].value.forEach(function(elem,idx){
        el.quantity.push(0);
      });
    },
    setMainImage : function(e){
      this.mainImage = e.target.src
    },
    sortArray : function(array){
      return this.$_.sortBy(array,"price");
    },
    optionId : function(key,index){
      return "option-" + key + "-" + index;
    },
    changeInput : function (operator,idx){
      if(operator=="plus"){
        this.quantity[idx]++;
      }else if(operator=="minus"){
        if(this.quantity[idx]>0){
          this.quantity[idx]--;
        }
      }
      var el = this
      this.item.sku[this.item.sku.length-1].value.forEach((item, i) => {
        el.quantity.push()
      });
      if(this.item.sku.length > 1){
        this.mapSku();
      }else{
        if(this.quantity[0] > 0){
          this.disabledCart = false;
        }else{
          this.disabledCart = true;
        }
        this.mapSku();
      }
    },
    checkSku : function(key,opt,group){
      if(opt.isImage){
        this.mainImage = opt.image
      }
      var el = this;
      let option = {
          group : group,
          label : opt.label,
          image : opt.image,
          isImage : opt.isImage
      };
      this.selectOptionData[key] = opt.data;
      this.selectOptions[key] = option;
      let checked = true;
      for (var i = 0; i < this.selectOptionData.length - 1; i++) {
        if(!this.selectOptionData[i]){
          checked = false;
        }
      }
      this.disabledClass = (checked)?"row":"row disabledbutton";

      this.mapSku();
    },
    mapSku : function(){
      var el = this
      this.selectQuantity = [];
      this.selectItems = [];
      this.selectPrice = [];
      this.optionValue = [];
      if(this.item.sku.length > 1){
        let group = this.item.sku[this.item.sku.length-1].group;
        this.item.sku[this.item.sku.length-1].value.forEach(function(elem,idx){
            el.selectOptionData[el.item.sku.length-1] = elem.data;
            var map = el.selectOptionData.join(";");
            let itemPrice = "";
            let itemPromoPrice = "";
            let itemStock = "";
            el.item.skuMap.forEach((item, i) => {
              if(map == item.skuMap){
                let element = [];
                itemPrice = item.price * el.markupRate;
                itemPromoPrice = item.promoPrice * el.markupRate;
                itemStock = item.stock;
                if(el.quantity[idx] > 0){
                  let option = []
                  option.push({
                      group : group,
                      label : elem.label,
                      image : elem.image,
                      isImage : elem.isImage
                  });
                  element = el.selectOptions.concat(option);
                  el.selectItems.push(element);
                  //el.selectItems.push(elem);
                  el.selectPrice.push(itemPromoPrice);
                  el.selectQuantity.push(el.quantity[idx]);
                  //el.selectTotal.push(itemPromoPrice * el.quantity[idx]);
                }
              }
            });
            el.optionValue.push({price : itemPrice,promoPrice : itemPromoPrice,stock : itemStock});
        });
        //console.log(this.optionValue);
        this.disabledCart = (this.selectItems.length)?false:true;
      }else{
        console.log(this.quantity[0]);
        this.item.skuMap.forEach((item, i) => {
          if(el.selectOptionData == item.skuMap){
            el.selectPrice.push(item.promoPrice * el.markupRate);
            el.selectQuantity.push(this.quantity[0]);
          }
        });
      }
    },
    radioGroup : function(key){
      return "radio-" + key;
    },
    selectedQuantity : function(){
      console.log(this.selectQuantity);
      var total = 0;
      this.selectQuantity.forEach((item, i) => {
        total += item
      });
      return total
    },
    selectedTotal : function(){
      var el = this;
      var total = 0;
      this.selectQuantity.forEach((item, i) => {
        //console.log(item);
        total += (item * el.selectPrice[i])
      });
      return total * this.markupRate
    },
    addCart : function(){
      var cart = this.$store.state.sessionStorage.items;
      var postData = []
      const skuLength = this.item.sku.length;
      var el = this
      if(skuLength <= 1){
        if(!el.existCart(this.selectOptions[0])){
          postData.push({
            _id : (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
            data : this.item,
            id : this.item.id,
            title : this.item.title,
            image : this.mainImage,
            options : (skuLength==1)?this.selectOptions[0]:[],
            price : (skuLength==1)?this.selectPrice[0] * el.markupRate:this.item.promoPrice[0].price * el.markupRate,
            quantity : this.quantity[0],
            shop : this.item.vendor,
            link : this.item.link,
            provider : el.$route.params.provider,
            mode : el.$store.state.sessionStorage.mode
          });
        }
      }else{
        this.selectItems.forEach((item, i) => {
          if(!el.existCart(item)){
            postData.push({
              _id : (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
              data : this.item,
              id : this.item.id,
              title : this.item.title,
              image : this.mainImage,
              options : item,
              price : this.selectPrice[i] * el.markupRate,
              quantity : this.selectQuantity[i],
              shop : this.item.vendor,
              link : this.item.link,
              provider : el.$route.params.provider,
              mode : el.$store.state.sessionStorage.mode
            })
          }
        });
      }
      if(postData.length){
        this.$swal({
            title : "เพิ่มสินค้าลงในตะกร้าของท่านเรียบร้อยแล้ว",
            toast : true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            icon : 'success'
        });
        this.$store.commit('sessionStorage/SET_CART',postData)
      }else{
        this.$swal({
            title : "ไม่สามารถบันทึกสินค้าได้เนื่องจากมีการเพิ่มสินค้าลงในตะกร้าสินค้าแล้ว\nกรุณาตรวจสอบตะกร้าสินค้าของท่านและปรับจำนวนที่ต้องการ",
            toast : true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            icon : 'error'
        });
      }
      //console.log(this.$store.state.sessionStorage.items);
    },
    clearCart : function(){
      this.$store.commit('sessionStorage/CLEAR_CART')
      //console.log(this.$store.state.sessionStorage.items);
    },
    existCart : function(options){
      let exist = false
      this.$store.state.sessionStorage.items.forEach((item, i) => {
        if(JSON.stringify(item.options) == JSON.stringify(options)){
          exist = true
        }
      });
      //console.log(options);
      return exist
    }
  }
}
</script>

<style lang="css" scoped>
.app {
  margin-top: 30px;
  margin-bottom: 30px;
}
.option-image {
  height: 50px;
}
input[type=number] {
    text-align:center;
}
input[type=radio] {
    display:none;
    margin:10px;
    padding:10px;
}
input[type=radio] + label {
    display:inline-block;
    margin:5px;
    padding: 4px 12px;
    background-color: #e7e7e7;
    border-color: #ddd;
}
input[type=radio]:checked + label {
   background-image: none;
   background-color:#E62D05;
   color:#fff;
}
input[type="radio"]:checked+label{ font-weight: bold; }
.disabledbutton {
    pointer-events: none;
    opacity: 0.4;
}
.priceShow {
  color: orangered;
  font-weight: bold;
}
.priceLabel {
  font-size:small;
  margin-right:10px;
  color:#999;
}
.div-border {
  border-top:1px dotted #ccc
}
.input-quantity {
  height: 30px;
  padding: 0px 10px 0px 10px;
  /*border-color: #ccc;*/
}
.input-group-addon {
  padding: 0px;
}
</style>
