import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import useUserStore from "./stores/UserStore.js"

const app = createApp(App)

app.use(createPinia())

useUserStore()
    .loginWithToken()
    .then(() => {
        app.use(router)
    .mount("#app")
  })

