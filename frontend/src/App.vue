<template>
  <div id="app">
    <Banner />
    <div class="banner">
      <div class="banner__text">
        <h1>Welcome to the COVID-19 response web app</h1>
        <p>
          The assessment empowers me to attempt helping society and leaders prepare for the real
          big problem of COVID-19, which is its impact on lives, health systems, supply chains,
          and the economy
          Get an estimate of COVID-19 related activity in your current location
        </p>
      </div>
    <img src="./assets/covid.jpg" alt="covid" width="600">
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue';

export default {
  name: 'App',
  components: {
    Banner,
  },
};
</script>

<style>
body {
  background: #008ed1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #fff;
  margin-top: 60px;
}
.banner {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-around;
}
.banner__text {
  width: 600px;
}
</style>
