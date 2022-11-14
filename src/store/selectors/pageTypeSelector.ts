import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectPageType = (state: RootState) => state.pageType;

const pageTypeSelector = createSelector(selectPageType, (pageType) => pageType);

export default pageTypeSelector;
