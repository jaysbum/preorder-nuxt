<template>
<div class="container" style="margin-top:50px;margin-bottom:50px;">
    <div class="row">
      <div class="col-lg-3 col-md-3">
        <Menu />
      </div>
      <div class="col-lg-9 col-md-9" style="padding-left:50px;padding-right:50px;">
          <ul>
              <li><h3>สมุดที่อยู่</h3></li>
          </ul>
          <div class="row">
            <div class="col-lg-6" v-for="address in addresses">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Panel title</h3>
                    </div>
                    <div class="panel-body">
                        {{address|fullAddress}}
                    </div>
                </div>
            </div>
          </div> 
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "./../../components/member/menu"
import { mapGetters } from 'vuex'
export default {
  middleware: "auth",
  components: {
    Menu,
  },
  computed: {
        ...mapGetters({
            loggedInUser:'loggedInUser'
        })
  },
  data : function(){
      return {
          addressed : null
      }
  },
  mounted(){
        var el = this
        this.$axios.get("addresses?user="+this.loggedInUser._id).then(function(res){
            console.log(res.data);
            el.addresses = res.data
		})
  }
};
</script>