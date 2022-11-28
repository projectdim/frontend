import './index.css';
import App from './App.vue';
import {store}  from "./store/mainStore.js";
import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import {Router} from "./router/mainRouter.js";
import ComponentsList from "./components/ComponentsList.js";
import i18n from "./libs/i18n/index.js";
import ResizeTextarea from 'resize-textarea-vue3';

const app = createApp(App);

app.use(store);
app.use(Router);
app.use(i18n);

app.use(VueGoogleMaps,{
        load: {
            key: import.meta.env.VITE_GMAPS_APIKEY,
            //language: 'ua',
            language: i18n.locale,
            libraries: "places"
        },
    });



ComponentsList.forEach(component=>{
  app.component(component.name, component);
})

app.use(ResizeTextarea);

app.mount('#app');
