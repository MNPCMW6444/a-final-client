import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Item, Event, Task } from "../types";
import { ItemTypes } from "../utils/enums";

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

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const getAllItems = gql`
  query Query {
    allTasks {
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

    allEvents {
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

const fetchItems = (): Promise<any[] | Item[] | undefined> => {
  return client.query({ query: getAllItems }).then((data: any) => {
    const res = {
      tasks: data ? data.allTasks : [],
      events: data ? data.allEvents : [],
    };

    res.tasks = res.tasks.map((task: Task) => {
      return { ...task, type: ItemTypes.task };
    });
    res.events = res.events.map((event: Event) => {
      return { ...event, type: ItemTypes.event };
    });

    let processedData = [...res.tasks, ...res.events];

    if (processedData.length > 0) {
      const dbprocessedData = structuredClone(processedData);
      const jsonEvents = (dbprocessedData as Item[]).filter(
        (item: Item) => item.type === ItemTypes.event
      ) as Event[];
      const jsonTasks = (dbprocessedData as Item[]).filter(
        (item: Item) => item.type === ItemTypes.task
      ) as Task[];

      let parsedEvents: Event[];
      parsedEvents = jsonEvents.map((event: Event) => {
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

        return event;
      });
      let parsedTasks: Task[];
      parsedTasks = jsonTasks.map((task: Task) => {
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
        return task;
      });
      return [...parsedEvents, ...parsedTasks];
    }
  });
};

export { fetchItems };
