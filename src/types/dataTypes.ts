interface AbstractItem {
  id: string;
  title: string;
  description: string;
}

interface Event extends AbstractItem {
  beginningTime: string;
  endingTime: string;
  color: string;
  location?: string;
  invitedGuests?: string[];
  notificationTime?: string;
}

interface Task extends AbstractItem {
  estimatedTime: string;
  status: string;
  priority: string;
  review?: string;
  timeSpent?: string;
  untilDate: string;
}

type Item = Event | Task;

export type { Item, Event, Task };
