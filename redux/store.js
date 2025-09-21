import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    HYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistReducer,
    persistStore
} from "redux-persist";
import rootReducer from "./rootReducer";
import reduxStorage from "./storage";

const persistConfig = {
    // key: 'root',
    key: "game",
    storage: reduxStorage,
    // blacklist: [],
    // whitelist: ["game"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, HYDRATE, PAUSE, REGISTER, PERSIST, PURGE]
        }
    })
})

export const persistor = persistStore(store);