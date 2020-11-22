<template lang="html">
  <div class="search-area">
    <form @submit.prevent="searchProducts" method="post">
      <div class="input-group" id="adv-search">
        <input type="text" class="form-control" placeholder="Search Product" v-model="q" />
        <div class="input-group-btn">
          <div class="btn-group" role="group">
            <div class="dropdown dropdown-lg" style="width:max-content;">
              <select class="form-control" v-model="provider">
                <option value="taobao">Taobao/Tmall</option>
                <option value="1688">1688</option>
              </select>
            </div>
            <button type="submit" class="btn btn-metro-search"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name : "search",
  computed: {
    ...mapGetters({
      cartMode: 'sessionStorage/cartMode'
    })
  },
  data : function(){
    return {
      keyword : null,
      q : null,
      provider : "taobao",
      category : []
    }
  },
  methods : {
    searchProducts : function(){
      var el = this
      if(this.isUrl(this.q)){
        this.$store.commit("sessionStorage/SET_MODE",2)
        this.$store.commit("sessionStorage/SET_MARKUP_RATE",1)
        const qs = this.checkProvider()
        const url = "/product/detail/" + qs.provider + "/" + qs.id
        this.$router.push(url)
      }else{
        this.$axios.get('categories?name='+this.q).then(function(res){
          if(res.data.length){
            if(el.cartMode==1){
              el.$store.commit("sessionStorage/SET_MODE",1)
              if(res.data[0].markup <= el.$store.state.sessionStorage.setting.markupRate){
                el.$store.commit("sessionStorage/SET_MARKUP_RATE",el.$store.state.sessionStorage.setting.markupRate)
              }else{
                el.$store.commit("sessionStorage/SET_MARKUP_RATE",res.data[0].markup)
              }
            }else{
              el.$store.commit("sessionStorage/SET_MARKUP_RATE",1)
            }
            el.goSearch(el.provider,res.data[0].keyword)
          }else{
            el.$store.commit("sessionStorage/SET_MODE",2)
            el.$store.commit("sessionStorage/SET_MARKUP_RATE",1)
            el.goSearch(el.provider,el.q)
          }
        })
      }
    },
    goSearch : function(provider,keyword){
      const url = "/product/search/" + provider + "/" + keyword + "/1"
      this.$router.push(url)
    },
    isUrl : function(str){
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex .test(str)) {
        return false;
      } else {
        return true;
      }
    },
    checkProvider : function(){
      var id = null;
      var provider = null;
      if(this.q.indexOf("item.taobao") > -1 || this.q.indexOf("m.taobao") > -1){
        id = this.q.match(/[&?]id=[\d]+/)[0].match(/\d+/g).map(Number);
        provider = "taobao";
      }else if(this.q.indexOf("1688.com") > -1){
        id = this.q.match(/offer\/(.*?).htm/)[0].match(/\d+/g).map(Number);
        provider = "1688";
      }else if(this.q.indexOf("world.taobao.com") > -1){
        id = this.q.match(/item\/(.*?).htm/)[0].match(/\d+/g).map(Number);
        provider = "taobao";
      }else if(this.q.indexOf("detail.tmall") > -1){
        id = this.q.match(/[&?]id=[\d]+/)[0].match(/\d+/g).map(Number);
        provider = "taobao";
      }else if(this.q.indexOf("world.tmall") > -1){
        id = this.q.match(/item\/(.*?).htm/)[0].match(/\d+/g).map(Number);
        provider = "taobao";
      }
      return {id:id[0],provider:provider}
    },
  }
}
</script>

<style lang="css" scoped>
</style>
