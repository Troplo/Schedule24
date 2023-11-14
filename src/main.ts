import "./assets/transitions.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import { createI18n } from "vue-i18n";
import VWave from "v-wave";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: {}
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(VWave, {
  easing: "ease-out",
  cancellationPeriod: 30
});

app.mount("#app");
