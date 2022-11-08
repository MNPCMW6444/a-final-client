import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../types";
import { PageTypes } from "../../utils/enums";

export interface ItemsState {
  items: Item[];
  pageType: PageTypes;
  searchValue: string;
}

const initialState: ItemsState = {
  items: [],
  pageType: PageTypes.today,
  searchValue: "",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setAllItems: (state: ItemsState, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    addItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items.filter((item) => item._id === action.payload._id).length ===
        0 && state.items.push(action.payload);
    },
    editItem: (state: ItemsState, action: PayloadAction<Item>) => {
      debugger;
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items.push(action.payload);
    },
    removeItem: (state: ItemsState, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    navigate: (state: ItemsState, action: PayloadAction<PageTypes>) => {
      state.pageType = action.payload;
    },
    search: (state: ItemsState, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setAllItems, addItem, editItem, removeItem, navigate, search } =
  itemsSlice.actions;

export default itemsSlice.reducer;
