import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers/index";

const store = configureStore({
  reducer: itemsReducer,
});

export default store;
