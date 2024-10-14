import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";


const httpRequests = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    headers: {
        "content-type": "application/json",
    },
});

httpRequests.interceptors.request.use(async (config) => {
    // Handle token here ...
    const user = await AsyncStorage.getItem("user");
    const token = user ? JSON.parse(user).access_token : null;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

httpRequests.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async(error) => {
        // Handle errors
        if (error.response.data.error === "Unauthenticated") {
            // Handle unauthenticated error here ...
            await AsyncStorage.removeItem("user");
        }
        throw error.response.data;
    }
);
export default httpRequests;
