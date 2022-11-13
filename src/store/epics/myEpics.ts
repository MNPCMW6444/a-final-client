import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { ItemTypes } from "../../utils/enums";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

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
    mergeMap((action: any) =>
      client.mutate({
        mutation:
          action.payload.type === ItemTypes.event ? createEvent : createTask,
        variables: { newItem: action.payload },
      })
    )
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
