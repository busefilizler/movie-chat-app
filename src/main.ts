/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import './main.css'
// Components
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
// Composables
import { createApp } from 'vue'
const app = createApp(App)

registerPlugins(app)
app.use(VueQueryPlugin)
app.mount('#app')
