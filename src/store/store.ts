import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers/itemsReducer";
import { createEpicMiddleware } from "redux-observable";

import { addItemsEpic, removeItemsEpic } from "./epics/calanderEpics";

import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type RootStateType = RootState;
export type ActionsType = ActionType<typeof actions>;

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
