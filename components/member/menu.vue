<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item header">การสั่งซื้อของฉัน</li>
      <li class="list-group-item">ติดตามสถานะสินค้า</li>
      <li class="list-group-item">ประวัติการสั่งซื้อ</li>
      <li class="list-group-item">รายการสินค้าที่ฉันชอบ</li>
      <li class="list-group-item">กระเป๋าเงิน (Uget Pay)</li>
      <li class="list-group-item">คะแนน/แลกคะแนนสะสม</li>
      <li class="list-group-item">พิมพ์ใบสั่งซื้อสินค้า</li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item header">บัญชีของฉัน</li>
      <li class="list-group-item">ส่วนควบคุมบัญชี</li>
      <li class="list-group-item">ข้อมูลบัญชี</li>
      <li class="list-group-item">สมุดที่อยู่</li>
      <li class="list-group-item">เปลี่ยนรหัสผ่าน</li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item header">ความช่วยเหลือ</li>
      <li class="list-group-item">วิธีการสั่งซื้อ</li>
      <li class="list-group-item">วิธีการชำระเงิน</li>
      <li class="list-group-item">ระยะเวลาในการขนส่ง</li>
      <li class="list-group-item">สินค้าและคุณภาพ</li>
    </ul>
  </div>
</template>
<script>
export default {
    name : "menu"
}
</script>
<style scoped>
.header {
    background-color:#FF560A;
    color:#fff;
}
</style>