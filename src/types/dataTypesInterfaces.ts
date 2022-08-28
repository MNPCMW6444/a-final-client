interface Event {
  id: number;
  description: string;
  location: string;
  estimatedTime: Date;
  title: string;
  status: string;
  priority: string;
  review: string;
  timeSpent: number;
  notificationTime: Date;
  untilDate: Date;
  beginningTime: Date;
  endingTime: Date;
  color: string;
  invitedGuests: string[];
}

interface Task {
  id: number;
  description: string;
  location: string;
  estimatedTime: Date;
  title: string;
  status: string;
  priority: string;
  review: string;
  timeSpent: number;
  notificationTime: Date;
  untilDate: Date;
}

export type { Event, Task };
