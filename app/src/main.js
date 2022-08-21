import { createApp } from 'vue'

import router from './router'
import i18n from './utils/i18n'

import App from './App.vue'

import './base.scss'

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')
