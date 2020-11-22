<template lang="html">
  <div class="category-menu-area close-on-tab" id="category-menu-area">
    <ul>
      <li v-for="menu,key in menus"><a href="#"><i :class="menu.icon"></i>{{menu.title}}<span><i class="flaticon-next"></i></span></a>
        <ul class="dropdown-menu">
          <li>
            <div class="container" style="width:800px;padding:15px 20px 15px 20px;">
              <div class="row">
                <div v-for="m,key in menu.recommended" class="col-md-2">
                  <nuxt-link :to="`/product/detail/${m.provider}/${m.itemId}`">
                  <img :src="`${$config.baseImagePath}${m.image.url}`" :alt="`${m.title}`">
                  </nuxt-link>
                </div>
              </div>
              <div class="row">
                <ul style="display:inline-flex;padding:15px;list-style:none;">
                  <li v-for="submenu,key in menu.submenu" style="margin-right:20px;border:none;">
                    <nuxt-link :to="`/product/category/${submenu.category.keyword}`">{{submenu.category.title}}</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name : "categories",
  data : function(){
    return {
      menus : []
    }
  },
  mounted(){
    var el = this
    this.$axios.get("/category-menus").then(function(res){
      el.menus = res.data;
    })
  },
}
</script>

<style lang="css" scoped>
</style>
