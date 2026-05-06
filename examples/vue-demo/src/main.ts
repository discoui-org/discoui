import '@discoui/core/dist/discoui.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@discoui/core'
import { DiscoPlugin } from '@discoui/vue'

const app = createApp(App)
app.use(DiscoPlugin)
app.mount('#app')
