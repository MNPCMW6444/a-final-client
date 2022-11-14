import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { Epic, ofType, StateObservable } from "redux-observable";
import { ItemTypes } from "../../utils/enums";
import { from } from "rxjs";
import { Task, Event, Item } from "../../types";
import { ADD_ITEM, REMOVE_ITEM } from "../constans";
import { ItemsState } from "../reducers/itemsReducer";

import { isActionOf } from "typesafe-actions";
import { addItemAction } from "../actions/index";

import { ActionsType } from "../store";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

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

const addItemsEpic:  Epic<
ActionsType,
ActionsType,
ItemsState,
>  = (
  action$,
  store$
) =>
action$.pipe(
  filter(isActionOf(actions.weatherGetAction)),
  mergeMap((action) =>
    from(getWeather(action.payload.lat, action.payload.lng)).pipe(
      map(actions.weatherSetAction),
      catchError((error) => of(actions.weatherErrorAction(error)))
    )
  )
  /* action$.pipe(
    filter(isActionOf(addItemAction)),
    mergeMap((action: { payload: Item }) => {
      console.log(store$);
      let event;
      let task;
      if (action.payload.type === ItemTypes.event)
        event = { ...action.payload } as Event;
      if (action.payload.type === ItemTypes.task)
        task = { ...action.payload } as Task;
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
      }
      const item: Item = task || event || ({} as Item);
      delete item?._id;
      delete item?.__typename;
      return from(
        client.mutate({
          mutation: item?.type === ItemTypes.event ? createEvent : createTask,
          variables: { newItem: item },
        })
      ).pipe(
        map(
          (response) =>
            !response.errors &&
            store$.pipe(
              mergeMap(async (store) => store.items.push(response.data.newItem))
            )
        )
      );
    })
  ); */

const removeItemsEpic = (action$: any, store$: StateObservable<ItemsState>) =>
  action$.pipe(
    ofType(REMOVE_ITEM),
    mergeMap((action: { payload: Item }) =>
      from(
        client.mutate({
          mutation:
            action.payload.type === ItemTypes.event ? deleteEvent : deleteTask,
          variables: { id: action.payload._id },
        })
      ).pipe(
        map(
          (response) =>
            !response.errors &&
            store$.pipe(
              mergeMap((store) =>
                store.items.filter(
                  (item: Item) => item._id !== response.data.id
                )
              )
            )
        )
      )
    )
  );

export { addItemsEpic, removeItemsEpic };
