import { RootState } from "../store";

const selectAllItems = (state: RootState) => state.itemsSlice.items;

export default selectAllItems;
