import { createApp } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue'
import VueClickAway from 'vue3-click-away';

import router from './router'
import i18n from './utils/i18n'

import App from './App.vue'

import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import './base.scss'

const app = createApp(App)

app
    .use(router)
    .use(i18n)
    .use(VueClickAway)
    .component('vue-draggable-resizable', VueDraggableResizable)
    .mount('#app')
