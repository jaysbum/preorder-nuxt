<template>
  <div class="container" style="margin-top:50px;margin-bottom:50px;">
    <div class="row">
      <div class="col-lg-3 col-md-3">
        <Menu />
      </div>
      <div class="col-lg-9 col-md-9" style="padding-left:50px;padding-right:50px;">
          <ul>
              <li><h3>เปลี่ยนรหัสผ่าน</h3></li>
          </ul>
          <div class="row" style="border:0.5px solid;border-color:#DDDDDD;">
              <div class="col-lg-12 col-md-12">
                  <div class="row padding-box" style="padding-top:20px;">
                      <div class="col-lg-4 col-md-4">รหัสผ่านปัจจุบัน</div>
                      <div class="col-lg-8 col-md-8">
                          <input type="text" class="form-control">
                      </div>
                  </div>
                  <div class="row padding-box">
                      <div class="col-lg-4 col-md-4">รหัสผ่านใหม่</div>
                      <div class="col-lg-8 col-md-8">
                          <input type="text" class="form-control">
                      </div>
                  </div>
                  <div class="row padding-box">
                      <div class="col-lg-4 col-md-4">ยืนยันรหัสผ่านใหม่</div>
                      <div class="col-lg-8 col-md-8">
                          <input type="text" class="form-control">
                      </div>
                  </div>
              </div>
          </div>
          
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "./../../components/member/menu";
export default {
  middleware: "auth",
  components: {
    Menu,
  },
};
</script>
<style scoped>
.padding-box {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 20px;
}
</style>