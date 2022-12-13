import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TestApi } from './Services/rtk/services/test'
import ProductReducer from "../src/features/ProductSlice"
import CartReducer from "../src/features/CartSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../src/features/AppSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: rootReducer,
    // Add the generated reducer as a specific top-level slice
    [TestApi.reducerPath]: TestApi.reducer,
    products: ProductReducer,
    cart: CartReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(TestApi.middleware),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.


  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(TestApi.middleware),
})

export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)