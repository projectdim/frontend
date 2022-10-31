import axios from "axios";
import {store} from "../store/mainStore.js";


const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_REMOTE,
    withCredentials: false,
    headers: {
        accept: 'application/json'
    }
});

instance.interceptors.request.use((config)=>{
    let token =store.getters.getToken;
    if(token)
        config.headers.Authorization = token;
    return config;
});


export default instance;
