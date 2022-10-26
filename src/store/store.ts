import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers/itemsReducer";

const store = configureStore({
  reducer: { itemsSlice: itemsReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
