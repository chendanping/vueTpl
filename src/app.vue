<template>
  <div id="app">
    <img src="./assets/menger.jpg" class="img">
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import api from "../mock/api.js";
export default {
  name: "App",
  async created() {
    let res = await axios.get(api.getUserInfo);
    console.log(res);
  }
};
</script>

<style lang="scss">
$color: blue;
h2 {
  color: $color;
  transition: transform 2s;
  &:hover {
    transform: rotate(2deg);
  }
}
.img {
  width: 200px;
  height: auto;
}
</style>