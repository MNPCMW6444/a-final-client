import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { mergeMap } from "rxjs/operators";
import { Epic, ofType } from "redux-observable";
import { ItemTypes } from "../../utils/enums";
import { Task, Event, Item } from "../../types";
import { itemActions } from "../constants/constans";
import { ItemsState, removeItemLocally } from "../reducers/itemsReducer";

import { ActionsType } from "../store";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
/* 
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
 */
const createTask = gql`
  mutation Mutation($newItem: TaskInput) {
    createTask(newItem: $newItem) {
      _id
      title
      description
      estimatedTime
      status
      priority
      untilDate
      review
      timeSpent
    }
  }
`;

const createEvent = gql`
  mutation Mutation($newItem: EventInput) {
    createEvent(newItem: $newItem) {
      _id
      title
      description
      beginningTime
      endingTime
      color
      invitedGuests
      location
      notificationTime
    }
  }
`;

const deleteEvent = gql`
  mutation Mutation($id: String) {
    deleteEvent(id: $id)
  }
`;

const deleteTask = gql`
  mutation Mutation($id: String) {
    deleteTask(id: $id)
  }
`;

export type MyEpic = Epic<ActionsType, ActionsType, ItemsState, any>;

const addItemsEpic: MyEpic = (action$) =>
  action$.pipe(
    ofType(itemActions.addItem),
    mergeMap((action: ActionsType) => {
      let event;
      let task;
      if ((action.payload as Item).type === ItemTypes.event)
        event = { ...(action.payload as Item) } as Event;
      if ((action.payload as Item).type === ItemTypes.task)
        task = { ...(action.payload as Item) } as Task;
      /*      if (event) {
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

        event.color = colorMap.get(event.color) || event.color;
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
      } */
      const item: Item = task || event || ({} as Item);
      delete item?._id;
      delete item?.__typename;
      return client
        .mutate({
          mutation: item?.type === ItemTypes.event ? createEvent : createTask,
          variables: { newItem: item },
        })
        .then((res) => removeItemLocally(res.data));
    })
  );

const removeItemsEpic: MyEpic = (action$) =>
  action$.pipe(
    ofType(itemActions.removeItem),
    mergeMap((action: ActionsType) =>
      client
        .mutate({
          mutation:
            (action.payload as Item).type === "event"
              ? deleteEvent
              : deleteTask,
          variables: {
            id: (action.payload as Item)._id,
          },
        })
        .then((res) => removeItemLocally(res.data))
    )
  );

export { addItemsEpic, removeItemsEpic };
