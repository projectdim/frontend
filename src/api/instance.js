import axios from "axios";
import {store} from "../store/mainStore.js";


const instance = axios.create({
    // baseURL: `http://185.174.173.229:5001/api/v1`,
    baseURL: `http://127.0.0.1:7000/api/v1/`,
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
