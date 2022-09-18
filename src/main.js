import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './index.css'
import 'vue3-carousel/dist/carousel.css';
import App from './App.vue'
import {API_KEY, KURSANT_API_KEY} from "./Scripts/MapScripts.js"
import PhotoViewerModal from "./components/PhotoViewerModal.vue";

const app = createApp(App);
app.use(VueGoogleMaps,{
        load: {
            key: API_KEY,
            language: 'ua',
            libraries: "places"
        },
    });
app.mount('#app');
app.component("PhotoViewerModal", PhotoViewerModal);
