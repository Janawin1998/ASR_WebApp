import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap"



// Installation

const app = createApp(App)

app.use(router)

// app.use(VueTransmit)

app.mount('#app')
