import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { map, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { ItemTypes } from "../../utils/enums";
import { from } from "rxjs";
import { Task, Event, Item } from "../../types";

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

const addItemsEpic = (action$: any) =>
  action$.pipe(
    ofType("items/addItem"),
    mergeMap((action: any) => {
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
        map((response) => {
          return response;
        })
      );
    })
  );

const removeItemsEpic = (action$: any) =>
  action$.pipe(
    ofType("items/removeItem"),
    mergeMap((action: any) =>
      client.mutate({
        mutation:
          action.payload.type === ItemTypes.event ? deleteEvent : deleteTask,
        variables: { id: action.payload },
      })
    )
  );

export { addItemsEpic, removeItemsEpic };
