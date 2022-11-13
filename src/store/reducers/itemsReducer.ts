import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item, Task, Event } from "../../types";
import { ItemTypes, Mutations, PageTypes } from "../../utils/enums";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

export interface ItemsState {
  items: Item[];
  pageType: PageTypes;
  searchValue: string;
  mutations: ((
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>)[];
}

const colorMap = new Map();
colorMap.set("Red", "🔴");
colorMap.set("Orange", "🟠");
colorMap.set("Yellow", "🟡");
colorMap.set("Green", "🟢");
colorMap.set("Blue", "🔵");
colorMap.set("Purple", "🟣");
colorMap.set("Black", "⚫️");
colorMap.set("White", "⚪️");
colorMap.set("Brown", "🟤");

const initialState: ItemsState = {
  items: [],
  pageType: PageTypes.today,
  searchValue: "",
  mutations: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setAllItems: (state: ItemsState, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    addItem: (state: ItemsState, action: PayloadAction<Item>) => {
      let event, task;
      if (action.payload.type === ItemTypes.event)
        event = action.payload as Event;
      if (action.payload.type === ItemTypes.task) task = action.payload as Task;
      if (event) {
        event.beginningTime =
          new Date(event.beginningTime).toLocaleDateString() +
          ", " +
          new Date(event.beginningTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.beginningTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.endingTime =
          new Date(event.endingTime).toLocaleDateString() +
          ", " +
          new Date(event.endingTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.endingTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.notificationTime =
          new Date(event.notificationTime + "").toLocaleDateString() +
          ", " +
          new Date(event.notificationTime + "")
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.notificationTime + "")
                .toLocaleTimeString()
                .indexOf(":", 3)
            );
        event.color = colorMap.get(event.color);
        event.type = ItemTypes.event;
      }
      if (task) {
        task.type = ItemTypes.task;
        task.untilDate =
          new Date(task.untilDate).toLocaleDateString() +
          ", " +
          new Date(task.untilDate)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(task.untilDate).toLocaleTimeString().indexOf(":", 3)
            );
        task.type = ItemTypes.task;
      }
      const item = task || event;
      item &&
        state.items.filter((currentItem) => currentItem._id === item._id)
          .length === 0 &&
        state.items.push(item);
    },
    editItem: (state: ItemsState, action: PayloadAction<Item>) => {
      let event, task;
      if (action.payload.type === ItemTypes.event)
        event = action.payload as Event;
      if (action.payload.type === ItemTypes.task) task = action.payload as Task;
      if (event) {
        event.beginningTime =
          new Date(event.beginningTime).toLocaleDateString() +
          ", " +
          new Date(event.beginningTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.beginningTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.endingTime =
          new Date(event.endingTime).toLocaleDateString() +
          ", " +
          new Date(event.endingTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.endingTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.notificationTime =
          new Date(event.notificationTime + "").toLocaleDateString() +
          ", " +
          new Date(event.notificationTime + "")
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.notificationTime + "")
                .toLocaleTimeString()
                .indexOf(":", 3)
            );
        event.color = colorMap.get(event.color);
        event.type = ItemTypes.event;
      }
      if (task) {
        task.type = ItemTypes.task;
        task.untilDate =
          new Date(task.untilDate).toLocaleDateString() +
          ", " +
          new Date(task.untilDate)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(task.untilDate).toLocaleTimeString().indexOf(":", 3)
            );
        task.type = ItemTypes.task;
      }
      const item = task || event;
      state.items = state.items.filter(
        (currentItem) => currentItem._id !== (item && item._id)
      );
      item && state.items.push(item);
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
    addMutation: (
      state: ItemsState,
      action: PayloadAction<
        (
          options?:
            | MutationFunctionOptions<
                any,
                OperationVariables,
                DefaultContext,
                ApolloCache<any>
              >
            | undefined
        ) => Promise<any>
      >
    ) => {
      state.mutations.push(action.payload);
    },
    mutate: (
      state: ItemsState,
      action: PayloadAction<{ payload: { variables: any }; type: Mutations }>
    ) => {
      debugger;
      switch (action.payload.type) {
        case Mutations.addEvent:
          state.mutations[0](action.payload.payload);
          break;
        case Mutations.addTask:
          state.mutations[1](action.payload.payload);
          break;
        case Mutations.editEvent:
          state.mutations[2](action.payload.payload);
          break;
        case Mutations.editTask:
          state.mutations[3](action.payload.payload);
          break;
        case Mutations.deleteEvent:
          state.mutations[4](action.payload.payload);
          break;
        case Mutations.deleteTask:
          state.mutations[5](action.payload.payload);
          break;
      }
      state.mutations[0](action.payload.payload);
      state.mutations[0](action.payload.payload);
      state.mutations[0](action.payload.payload);
      state.mutations[0](action.payload.payload);
      state.mutations[0](action.payload.payload);
    },
  },
});

export const {
  setAllItems,
  addItem,
  editItem,
  removeItem,
  navigate,
  search,
  addMutation,
  mutate,
} = itemsSlice.actions;

export default itemsSlice.reducer;
