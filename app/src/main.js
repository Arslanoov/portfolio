import { createApp } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue'
import VueClickAway from 'vue3-click-away'
import { createPinia } from 'pinia'

import router from './router'
import i18n from './utils/i18n.js'

import App from './App.vue'

import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import './assets/styles/main.scss'

const app = createApp(App)

app
  .use(router)
  .use(i18n)
  .use(VueClickAway)
  .use(createPinia())
  .component('vue-draggable-resizable', VueDraggableResizable)
  .mount('#app')
