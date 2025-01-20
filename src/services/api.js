import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const api = axios.create({
    baseURL: `http://192.168.1.105:3333`
});
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('localToken');
        if(token) {
            console.log(token)
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)
export default api;
