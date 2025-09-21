// import { MMKV } from "react-native-mmkv";

import AsyncStorage from "@react-native-async-storage/async-storage";


// MMKV is a super-fast, on-device key-value storage library from WeChat, optimized for React Native.
// It’s much faster than AsyncStorage and is suitable for storing Redux state or app preferences.
// Create MMKV instance.
// const storage = new MMKV();

//The object below a wrapper that formats MMKV's methods so they match the API expected by Redux Persist.
const reduxStorage = {
    setItem: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch(error) {
            console.error("Error saving data to AsyncStorage", error);
            return false;
        }
        // return Promise.resolve(true); // MMKV’s set method is synchronous, but Redux Persist expects async-like behavior, so it wraps it in Promise.resolve.
    },
    getItem: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value
        } catch(error) {
            console.error("Error reading data from AsyncStorage", error);
            return null;
        }
        // return Promise.resolve(value); // MMKV’s getString method is synchronous, but Redux Persist expects async-like behavior, so it wraps it in Promise.resolve.
    }, 
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch(error) {
            console.error("Error removing data from AsyncStorage", error);
        }
        
        // return Promise.resolve(); // MMKV’s delete method is synchronous, but Redux Persist expects async-like behavior, so it wraps it in Promise.resolve.
    }
}

export default reduxStorage;