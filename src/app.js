import Vue from "vue";
import App from "./app.vue";
import router from "./router";

import print from "./print";
print();

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});

if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("test hot module");
    print();
  });
}
