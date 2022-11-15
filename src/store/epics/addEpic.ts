import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { mergeMap } from "rxjs/operators";
import { Epic, ofType } from "redux-observable";
import { ItemTypes } from "../../utils/enums";
import { Item } from "../../types";
import { itemActions } from "../constants/constans";
import { ItemsState } from "../reducers/itemsReducer";

import { ActionsType, StoreEnhancer } from "../store";
import domain from "../../config/domain";

const client = new ApolloClient({
  uri: "http://" + domain + "/graphql",
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

const addItemsEpic: Epic<
  ActionsType,
  ActionsType,
  ItemsState,
  StoreEnhancer
> = (action$) =>
  action$.pipe(
    ofType(itemActions.addItem),
    mergeMap(async ({ payload }: ActionsType) => {
      const item = payload as Item;
      delete item?._id;
      delete item?.__typename;
      const res = await client.mutate({
        mutation: item?.type === ItemTypes.event ? createEvent : createTask,
        variables: { newItem: item },
      });
      if (!res.errors)
        return {
          type: itemActions.addItemLocally,
          payload: res.data.createTask || res.data.createEvent,
        };
      else
        return {
          type: "error",
          payload: res.data.createTask || res.data.createEvent,
        };
    })
  );

export default addItemsEpic;
