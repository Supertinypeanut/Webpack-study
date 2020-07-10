import { createApp } from "vue";
import App from "./App.vue";
import a from "./index"

module.hot.accept('./index.js', ()=> {
  console.log('更新了')
})
console.log(API_BASE_URL)

createApp(App)
  .mount("#app");
