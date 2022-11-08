interface Item {
  _id: string;
  title: string;
  description: string;
  type: string;
  __typename: any;
}

interface Event extends Item {
  beginningTime: string;
  endingTime: string;
  color: string;
  location?: string;
  invitedGuests?: string[];
  notificationTime?: string;
}

interface Task extends Item {
  estimatedTime: string;
  status: string;
  priority: string;
  review?: string;
  timeSpent?: string;
  untilDate: string;
}

type FilterFunction = (item: Item) => boolean;

type SortFunction = (itemA: Item, itemB: Item) => number;

SortFunction;

export type { Item, Event, Task, FilterFunction, SortFunction };
