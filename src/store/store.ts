import { configureStore } from "@reduxjs/toolkit";
import itemsReducer, { ItemsState } from "./reducers/itemsReducer";
import { createEpicMiddleware } from "redux-observable";

import { addItemsEpic, removeItemsEpic } from "./epics/calanderEpics";

import { actions } from "./reducers/itemsReducer";

import { ActionType } from "typesafe-actions";

export type ActionsType = ActionType<typeof actions>;

const epicMiddleware = createEpicMiddleware<
  ActionsType,
  ActionsType,
  ItemsState,
  any
>({});

const store = configureStore({
  reducer: itemsReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(addItemsEpic);
epicMiddleware.run(removeItemsEpic);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
