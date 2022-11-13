import { createSelector } from "@reduxjs/toolkit";
import { ItemsState } from "../reducers/itemsReducer";

const selectPageType = (state: ItemsState) => state.pageType;

const pageTypeSelector = createSelector(selectPageType, (pageType) => pageType);

export default pageTypeSelector;
