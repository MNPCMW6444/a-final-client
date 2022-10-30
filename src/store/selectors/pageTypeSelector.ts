import { RootState } from "../store";

const pageTypeSelector = (state: RootState) => state.itemsSlice.pageType;

export default pageTypeSelector;
