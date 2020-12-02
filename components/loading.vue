<template>
  <div v-if="loading" class="loading-page">
    <img src="/assets/img/logo.png" alt="">
    <p style="z-index:10001;color:#fff;">กำลังไปยังหน้าที่คุณเรียก</p>
    <!--<img src="/assets/loading/loading.gif">-->
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.7);
  text-align: center;
  padding-top: 200px;
  font-size: 20px;
  font-family: sans-serif;
  z-index: 10000;
}
</style>
