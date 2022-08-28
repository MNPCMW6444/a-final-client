interface Event {
  id: string;
  title: string;
  description: string;
  beginningTime: string;
  endingTime: string;
  color: string;
  invitedGuests: string[];
  notificationTime: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  status: string;
  priority: string;
  review: string;
  timeSpent: string;
  untilDate: string;
}

export type { Event, Task };
