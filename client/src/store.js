import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import thunk from "redux-thunk"

import { apiSlice } from "./api/apiSlice"
import authReducer from "./features/authSlice"
import cartReducer from "./features/cartSlice"

const persistConfig = {
  key: "cartItems",
  storage,
}

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: persistReducer(persistConfig, cartReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)
