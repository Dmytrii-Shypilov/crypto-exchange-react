import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user-slice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ['user', 'isAuthenticated']
};

const persReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persReducer,
  },
  middleware: (getDefaultMidleware) =>
    getDefaultMidleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistore = persistStore(store);
setupListeners(store.dispatch);
