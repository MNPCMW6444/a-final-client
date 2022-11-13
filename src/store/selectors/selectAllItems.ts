import { createSelector } from "@reduxjs/toolkit";
import { ItemsState } from "../reducers/itemsReducer";

const selectAllItems = (state: ItemsState) => state.items;

const allItemsSelector = createSelector(selectAllItems, (items) => items);

export default allItemsSelector;
