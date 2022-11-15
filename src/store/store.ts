import { createEpicMiddleware } from "redux-observable";

import epics from "./epics";

import { actions } from "./reducers/itemsReducer";

import { ActionType } from "typesafe-actions";

import { applyMiddleware, compose, createStore } from "redux";

import reducers, { ItemsState } from "./reducers/itemsReducer";
import { Store } from "@reduxjs/toolkit";

export type ActionsType = ActionType<typeof actions>;

const epicMiddleware = createEpicMiddleware<
  ActionsType,
  ActionsType,
  ItemsState
>({
  dependencies: { store: () => store },
});

export type StoreEnhancer = { store: () => Store };

const composeEnhancers = compose;

// Create store
function configureStore(initialState?: ItemsState) {
  // configure middlewares
  const middlewares = [epicMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(reducers, initialState, enhancer);
}

const store = configureStore();

epicMiddleware.run(epics);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
