import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import {store}  from "./store/mainStore.js";
import {Router} from "./router/mainRouter.js";
import ComponentsList from "./components/ComponentsList.js";
import i18n from "./libs/i18n/index.js";

import VueGoogleMaps from '@fawmi/vue-google-maps';
import 'vue3-carousel/dist/carousel.css';
import ResizeTextarea from 'resize-textarea-vue3';

const app = createApp(App);

const router = Router;

app.use(VueGoogleMaps,{
        load: {
            key: import.meta.env.VITE_GMAPS_APIKEY,
            language: 'ua',
            libraries: "places"
        },
    });

app.use(store);
app.use(router);
app.use(i18n);

ComponentsList.forEach(component=>{
  app.component(component.name, component);
})

app.use(ResizeTextarea);

app.mount('#app');
