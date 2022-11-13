import { createReducer } from "typesafe-actions";

import { actions, ActionsType } from "..";
import { getWeather } from "../../services/Api";
import { Item } from "../../types";
import { PageTypes } from "../../utils/enums";

export interface CalanderState {
  items: Item[];
  pageType: PageTypes;
  searchValue: string;
}

export const initialState: CalanderState = {
  items: [],
  pageType: PageTypes.today,
  searchValue: "",
};

export const itemsReducer = createReducer<CalanderState, ActionsType>(
  initialState
).handleAction(actions.itemsGetAction, (state, action) => ({
  ...state,
  items: getWeather(),
}));
