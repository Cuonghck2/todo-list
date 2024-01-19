import './assets/main.css'

import { createApp } from 'vue'
import store from './store/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
library.add(fas)
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon).use(store).use(router)

app.mount('#app')
