import { createI18n } from 'vue-i18n'

import { DEFAULT_LANGUAGE } from '@/const/lang.js'

export default createI18n({
    legacy: false,
    locale: DEFAULT_LANGUAGE,
    messages: {}
})