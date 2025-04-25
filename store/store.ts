import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./slice/authSlice";


const rootReducer = combineReducers({
    auth: auth.reducer,
})

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth", "fcmToken"], // reducer yang akan di-persist
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([
      ]),
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers(),
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  
  export const persistor = persistStore(store);