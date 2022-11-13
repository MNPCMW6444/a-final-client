import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { pingEpic } from "./epics/index";
import userReducer from "./reducers/itemsReducer";

const rootReducer = {
  user: userReducer,
};
const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(pingEpic);

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export type Store = typeof store;

export default store;
