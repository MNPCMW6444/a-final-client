interface Item {
  type: string;
  id: string;
  title: string;
  description: string;
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

export type { Item, Event, Task };
