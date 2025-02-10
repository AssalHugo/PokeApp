import './assets/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import inCartDirective from './directives/inCart'

const app = createApp(App)

app.directive('inCart', inCartDirective)

app.use(createPinia())
app.use(router)

app.mount('#app')