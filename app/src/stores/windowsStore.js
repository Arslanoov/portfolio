import { ref } from 'vue'
import { defineStore } from 'pinia'

import { ALL_WINDOWS, DEFAULT_OPENED_WINDOWS } from '@/const/windows.js'

export const useWindowsStore = defineStore('windows', () => {
    const windows = ref(DEFAULT_OPENED_WINDOWS)

    const closeWindow = (name) => {
        const index = windows.value.findIndex((item) => item.name === name)
        index !== -1 && windows.value.splice(index, 1)
    }

    const openWindow = (name) => {
        const index = windows.value.findIndex((item) => item.name === name)
        if (index === -1) {
            const window = ALL_WINDOWS.find((item) => item.name === name)
            windows.value.push(window)
        }
    }

    return {
        windows,
        closeWindow,
        openWindow
    }
})