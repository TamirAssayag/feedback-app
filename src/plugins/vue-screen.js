import Vue from "vue";
import VueScreen from "vue-screen";

Vue.use(VueScreen, {
  sm: 480, // will be converted to 480px
  md: "699px", //
  lg: "1400px",
});

export default new VueScreen();
