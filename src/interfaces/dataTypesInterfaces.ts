interface Item {
  _id: string;
  title: string;
  description: string;
  location: string;
  estimatedTime: Date;
}

interface Event extends Item {
  beginningTime: Date;
  endingTime: Date;
  color: string;
  invitedGuests: string;
}

interface Task extends Item {
  status: string;
  priority: string;
  review: string;
  timeSpent: number;
  notificationTime: Date;
}

export type { Item, Event, Task };
