<template lang="html">
<div style="margin-top:50px;margin-bottom:50px;">
    <div class="row">
        <div class="container">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <form action="#" method="post" id="register-form" @submit.prevent="actionLogin">
                <div class="row" style="background-color:#FFEEE8;padding:20px;">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <h3 style="color:#FF5723;margin-top:10px;">ล็อคอิน</h3>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <img src="/assets/img/logo.png" style="height:60px;float:right;">
                        </div>
                    </div>
                    <div class="row" style="padding-top:20px;">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" v-if="loginError">
                            <span style="color:red">ข้อมูล login ไม่ถูกต้อง กรุณาตรวจสอบ</span>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>อีเมล์</label>
                            <input type="email" name="username" class="form-control" v-model="loginEmail" autofocus required>
                        </div>
                    </div>
                    <div class="row" style="padding-top:20px;">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>รหัสผ่าน</label>
                            <input type="password" name="password" v-model="loginPassword" class="form-control">
                        </div>
                    </div>
                    <div class="row" style="padding-top:20px;">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label><input type="checkbox" name="LoginForm[rememberMe]" value="1"> จำรหัสผ่าน</label>
                        </div>
                    </div>
                    <div class="row" style="padding-top:20px;">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span>ลืมรหัสผ่าน ?</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-right">
                            <button type="submit" name="button" style="background:#FF5723;color:#FFF;width:150px;height:60px;border:none;">ล็อคอิน</button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="row" style="margin-top:50px;">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <img src="/assets/img/login_graphic.png" class="img-responsive">
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-left:40px;">
            <form action="#" method="post" id="register-form" @submit.prevent="register">
                <div class="row" style="border-color:#BFBFBF;border-style:solid;border-width:thin;padding:20px;">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h3 style="color:#FF5723;margin-top:10px;">สมัครสมาชิก</h3>
                            <p style="color:#BFBFBF;">ยังไม่เคยสมัครสมาชิกกับเรา? กรุณากรอกข้อมูลด้านล่างเพื่อใช้ในการจัดส่ง</p>
                            <h5 style="color:#FF5723;">ข้อมูลสมาชิก</h5>
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>อีเมล์ <font color="red">* (ใช้ในการแจ้งสถานะสินค้า)</font></label>
                            <input type="email" class="form-control" v-model="registerEmail" required>
                            <label style="color:red" v-if="registerEmail==''">กรุณากรอก email address ของท่าน</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>หมายเลขโทรศัพท์ <font color="red">* (ใช้ในการติดต่อเกี่ยวกับการสั่งซื้อสินค้า)</font></label>
                            <input type="tel" class="form-control" v-model="registerTel" required>
                            <label style="color:red" v-if="registerTel==''">กรุณากรอกหมาเลขโทรศัพท์ของท่าน</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>รหัสผ่าน <font color="red">*</font></label>
                            <input type="password" class="form-control checkPass" v-model="registerPassword" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>ยืนยันรหัสผ่าน <font color="red">*</font></label>
                            <input type="password" class="form-control checkPass" v-model="registerPasswordConfirm" required>
                            <label style="color:red" v-if="registerPassword!=registerPasswordConfirm">รหัสผ่านไม่ตรงกัน</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label><input type="checkbox" v-model="registerSubscribe" value="1"> ต้องการรับข้อมูลข่าวสารโปรโมชั่นพิเศษจาก uget.co.th</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h5 style="color:#FF5723;">ข้อมูลทั่วไป</h5>
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                            <label>ชื่อจริง <font color="red">*</font></label>
                            <input type="text" class="form-control" v-model="registerFname" required>
                            <label style="color:red" v-if="registerFname==''">กรุณากรอกชื่อจริง</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                            <label>นามสกุล <font color="red">*</font></label>
                            <input type="text" class="form-control" v-model="registerLname" required>
                            <label style="color:red" v-if="registerLname==''">กรุณากรอกชื่อนามสกุล</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                            <label>เพศ</label>
                            <select class="form-control" v-model="registerGender" required>
                                <option value="1">ชาย</option>
                                <option value="2">หญิง</option>
                            </select>
                            <label style="color:red" v-if="registerGender==''">กรุณาเลือกเพศ</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                            <label>วัน/เดือน/ปี</label>
                            <date-picker
                            placeholder="DD/MM/YYYY"
                            format="dd/MM/yyyy"
                            v-model="date"
                            input-class="form-control" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h5>สนใจสินค้าประเภท</h5>
                        </div>
                    </div>
                    <!--<div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" v-for="cat in menuCategories">
                                <label><input type="checkbox" name="interest[]" :value="cat.tm_id" v-model="register.interest"> <img :src="`${urlPrefix}${cat.tm_icon}`" style="height:30px;margin-top:10px;"> <small>{{cat.tm_title}}</small></label>
                        </div>
                    </div>-->
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button type="submit" name="button" style="background:#FF5723;color:#FFF;width:100%;height:40px;border:none;">สมัครสมาชิก</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    middleware: "guest",
    data : function(){
        return {
            error : null,
            loginError : false,
            loginEmail : null,
            loginPassword : null,
            registerEmail : null,
            registerTel: null,
            registerPassword: null,
            registerPasswordConfirm: null,
            registerSubscribe: null,
            registerFname: null,
            registerLname: null,
            registerGender: null,
            registerBirthday: null,
            date:new Date()
        }
    },
    methods : {
        async actionLogin(){
            this.error = null;
                try {
                    await this.$auth.loginWith("local", {
                        data: {
                            identifier: this.loginEmail,
                            password: this.loginPassword,
                        },
                    });
                    this.$swal({
                        title : "เข้าสู่ระบบเรียบร้อยแล้ว",
                        toast : true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        icon : 'success'
                    });
                    this.$router.back()
                    //this.$router.push("/");
                } catch (e) {
                    this.$swal({
                        title : "ไม่สามารถเข้าสู่ระบบได้",
                        toast : true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        icon : 'error'
                    });
                    this.error = e.response.data.message[0].messages[0].message;
                    console.log(this.error);
                }
        },
        async register() {
            this.error = null;
                try {
                    this.$axios.setToken(false);
                    await this.$axios.post("auth/local/register", {
                        username: "",
                        email: this.registerEmail,
                        password: this.registerPassword,
                        firstname: this.registerFname,
                        lastname: this.registerLname,
                        phone: this.registerTel,
                        subscribe: this.registerSubscribe,
                        gender: this.registerGender,
                        birthdate: this.date
                    });
                    this.$swal({
                        title : "สมัครสมาชิกเรียบร้อย\nท่านสามารถเข้าสู่ระบบด้วย email และ password ได้แล้ว",
                        toast : true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        icon : 'success'
                    });
                    this.clearInput()
                    console.log(this.success)
                } catch (e) {
                    this.error = e.response.data.message[0].messages[0].message;
                    console.log(this.error)
                    this.$swal({
                        title : "เกิดข้อผิดพลาดในการสมัคร\n"+this.error,
                        toast : true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        icon : 'error'
                    });
                }
        },
        clearInput(){
            this.registerEmail = ""
            this.registerTel = ""
            this.registerFname = ""
            this.registerLname = ""
            this.registerPassword = ""
            this.registerPasswordConfirm = ""
            this.registerSubscribe = 0
            this.registerGender = ""
        }
    }
}
</script>