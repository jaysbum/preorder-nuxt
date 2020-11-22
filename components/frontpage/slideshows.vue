<template lang="html">
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li v-for="slideshow,key in slideshows" data-target="#myCarousel" :data-slide-to="key" :class="activeIndicator(key)"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <div v-for="slideshow,key in slideshows" :class="activeItem(key)">
        <img :src="`${$config.baseImagePath}${slideshow.banner.url}`" :alt="`${slideshow.title}`" style="width:100%">
      </div>
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  name : "slideshows",
  data : function(){
    return {
      slideshows : []
    }
  },
  mounted(){
    var el = this
    this.$axios.get("/frontpage").then(function(res){
      el.slideshows = res.data.slideshows;
    })
  },
  methods : {
    activeIndicator : function(key){
      return (key==0)?"active":"";
    },
    activeItem : function(key){
      return (key==0)?"item active":"item";
    }
  }
}
</script>

<style lang="css" scoped>
</style>
