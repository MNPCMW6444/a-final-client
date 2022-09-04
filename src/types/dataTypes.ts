interface Item {
  type: string;
  id: string;
  title: string;
  description: string;
}

interface Event extends Item {
  beginningTime: Date;
  endingTime: Date;
  color: string;
  location?: string;
  invitedGuests?: string[];
  notificationTime?: Date;
}

interface Task extends Item {
  estimatedTime: string;
  status: string;
  priority: string;
  review?: string;
  timeSpent?: string;
  untilDate: Date;
}

export type { Item, Event, Task };
