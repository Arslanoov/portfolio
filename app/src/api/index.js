import axios from 'axios'

const baseUrl = import.meta.env.VITE_MAIN_SITE_BASE_URL
if (!baseUrl) {
    console.error('Incorrect base url')
}

export default axios.create({
    baseURL: baseUrl,
})
