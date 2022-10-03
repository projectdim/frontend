import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './index.css'
import 'vue3-carousel/dist/carousel.css';
import App from './App.vue'
import {API_KEY, KURSANT_API_KEY} from "./Scripts/MapScripts.js"
import PhotoViewerModal from "./components/PhotoViewerModal.vue";
import {createStore} from "vuex";
import {storePrototype} from "./store/mainStore.js"

const app = createApp(App);
const store = createStore(storePrototype);

app.use(VueGoogleMaps,{
        load: {
            key: API_KEY,
            language: 'ua',
            libraries: "places"
        },
    });
app.use(store);
app.component("PhotoViewerModal", PhotoViewerModal);
app.mount('#app');
