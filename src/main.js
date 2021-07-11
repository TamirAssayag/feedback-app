import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { Fragment } from "vue-fragment";
import InlineSvg from "vue-inline-svg";
import Vuelidate from "vuelidate";
import PortalVue from "portal-vue";
import VueScreen from "./plugins/vue-screen";
import VClamp from "vue-clamp";

// Mixins
import getImageUrl from "./mixins/getImageUrl";
import AppMixin from "./mixins/AppMixin";

Vue.mixin(getImageUrl);
Vue.mixin(AppMixin);

Vue.use(Vuelidate);
Vue.use(PortalVue);

Vue.component("Fragment", Fragment);
Vue.component("InlineSvg", InlineSvg);
Vue.component("VClamp", VClamp);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VueScreen,
  render: (h) => h(App),
}).$mount("#app");
