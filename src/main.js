import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './index.css'
import App from './App.vue'
import {store}  from "./store/mainStore.js"
import {Router} from "./router/mainRouter.js";
import ComponentsList from "./components/ComponentsList.js";
import ResizeTextarea from 'resize-textarea-vue3'

const app = createApp(App);
const  router = Router;
app.use(VueGoogleMaps,{
        load: {
            key: import.meta.env.VITE_GMAPS_APIKEY,
            language: 'ua',
            libraries: "places"
        },
    });

app.use(store);
app.use(router);

ComponentsList.forEach(component=>{
  app.component(component.name, component);
})
app.use(ResizeTextarea);
app.mount('#app');
