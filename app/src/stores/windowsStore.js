import { ref } from 'vue'
import { defineStore } from 'pinia'

import { DEFAULT_OPENED_WINDOWS } from '@/const/windows.js'

export const useWindowsStore = defineStore('windows', () => {
    const windows = ref(DEFAULT_OPENED_WINDOWS)

    const closeWindow = (name) => {
        const index = windows.value.findIndex((item) => item.name === name)
        index !== -1 && windows.value.splice(index, 1)
    }

    const openWindow = (window) => {
        const index = windows.value.findIndex((item) => item.name === window.name)
        index === -1 && windows.value.push(window)
    }

    return {
        windows,
        closeWindow,
        openWindow
    }
})