import '@discoui-org/core/dist/discoui.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@discoui-org/core'
import { DiscoPlugin } from '@discoui-org/vue'

const app = createApp(App)
app.use(DiscoPlugin)
app.mount('#app')
