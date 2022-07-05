import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE } from "./constants";

export const storage = {
    async setToken(token: string) {
        return AsyncStorage.setItem(STORAGE.TOKEN, token);
    },
    async getToken() {
        return AsyncStorage.getItem(STORAGE.TOKEN);
    },
    async removeToken() {
        return AsyncStorage.removeItem(STORAGE.TOKEN);
    }
};
