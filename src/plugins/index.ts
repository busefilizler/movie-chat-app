/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import { persistPlugin } from '../plugins/persistPlugin'
import router from '../router'

// Types
import type { App } from 'vue'
pinia.use(persistPlugin)
export function registerPlugins (app: App) {
  app
    .use(router)
    .use(vuetify)
    .use(pinia)
}
