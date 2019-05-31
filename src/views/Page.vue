<template>
  <div class="home">
    <div class="bg">
      <div class="enter" @click='enter'>
        <img src="@/assets/img/enter.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    enter () {
      console.log(1)
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.home {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  .bg {
    width: 100%;
    height: 1820px;
    background: url('../assets/img/homeB.png') no-repeat;
    background-size: 100% 100%; 
    .enter {
      position: absolute;
      right: 40px;
      top: 15px;
      width: 160px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
