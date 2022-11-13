import { createAction } from "typesafe-actions";
import { Item } from "../../types";
import { ADD_ITEM, REMOVE_ITEM } from "../constans";

export const weatherGetAction = createAction(
  ADD_ITEM,
  (resolve) => (newItem: Item) => resolve(newItem)
);

export const weatherSetAction = createAction(
  REMOVE_ITEM,
  (resolve) => (id: string) => resolve(id)
);
