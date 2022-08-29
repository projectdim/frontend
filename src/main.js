import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './index.css'
import App from './App.vue'
import { API_KEY } from "./Scripts/MapScripts.js"

const app = createApp(App)
    app.use(VueGoogleMaps,{
        load: {
            key: API_KEY,
            language: 'ua',
        },
        autobindAllEvents: true,
    }).mount('#app')
