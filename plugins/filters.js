import Vue from 'vue'
import numeral from 'numeral'

Vue.filter('price', (value,currency,rate=1) => {
  const sign = (currency=="yuan")?"¥":"฿";
  return sign + " " + numeral(value * rate).format("0,0.00")
})

Vue.filter('fullAddress',(value) => {
  return value.name + " " + value.address + " ตำบล/แขวง " + value.subDistrict + " อำเภอ/เขต " + value.district + " จังหวัด " + value.province + " รหัสไปรษณีย์ " + value.zipcode
})

Vue.filter('fullNewAddress',(value) => {
  return value.firstname + " " + value.lastname + " " + value.address + " " + value.village + " " + value.building + " " + value.alley + " " + value.road + " ตำบล/แขวง " + value.subDistrict + " อำเภอ/เขต " + value.district + " จังหวัด " + value.province + " รหัสไปรษณีย์ " + value.zipcode
})
