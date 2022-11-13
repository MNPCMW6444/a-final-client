import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAllItems = (state: RootState) => state.itemsSlice.items;

const allItemsSelector = createSelector(selectAllItems, (items) => items);

export default allItemsSelector;
