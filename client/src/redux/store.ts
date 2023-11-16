import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./slices/auth.slice";
import { reducer as usersReducer } from "./slices/users.slice";

const RootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof store.dispatch;
