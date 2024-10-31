import axios from "axios";
import { loadState } from "./storage";

const request = axios.create({ baseURL: "http://localhost:3000" });

request.interceptors.request.use((config) => {
    if (config.url === '/login' || config.url === '/register') {
        return config;
    }
    
    const user = loadState('user');
    if (user && user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    
    return config;
});

export { request };