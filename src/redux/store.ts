import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slices/themeSlice";
import habitsReducer from "./slices/habitsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    habits: habitsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
