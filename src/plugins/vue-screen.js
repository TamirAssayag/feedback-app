import Vue from "vue";
import VueScreen from "vue-screen";

Vue.use(VueScreen, {
  sm: 480, // will be converted to 480px
  md: "768px", //
  lg: "1440px",
});

export default new VueScreen();
