import { createAction } from "typesafe-actions";
import { Item } from "../../types";
import { ADD_ITEM, REMOVE_ITEM } from "../constans";

export const addItemAction = createAction(
  ADD_ITEM,
  (resolve) => (newItem: Item) => resolve(newItem)
);

export const removeItemAction = createAction(
  REMOVE_ITEM,
  (resolve) => (id: string) => resolve(id)
);
