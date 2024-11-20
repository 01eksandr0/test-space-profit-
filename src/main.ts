import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./assets/tailwind.js";
import v3core from "@opengis/v3-core";
import "@opengis/v3-core/dist/style.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(pinia);
app.use(v3core);
app.mount("#app");
