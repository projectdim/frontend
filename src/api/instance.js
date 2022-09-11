import axios from "axios";


const instance = axios.create({
    baseURL: `http://127.0.0.1:7000/api/v1/`,
    withCredentials: true,
    headers: {
        accept: 'application/json'
    }
});


export default instance;
