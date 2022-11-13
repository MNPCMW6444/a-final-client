import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers/itemsReducer";
import { createEpicMiddleware } from "redux-observable";

import { addItemsEpic, removeItemsEpic } from "./epics/myEpics";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: { itemsSlice: itemsReducer },
  middleware: [epicMiddleware],
});

epicMiddleware.run(addItemsEpic);
epicMiddleware.run(removeItemsEpic);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
