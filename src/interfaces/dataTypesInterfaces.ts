interface Event {
  _id: string;
  title: string;
  description: string;
  beginningTime: Date;
  endingTime: Date;
  color: string;
  invitedGuests: string;
  location: string;
  estimatedTime: Date;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  estimatedTime: Date;
  status: string;
  priority: string;
  review: string;
  timeSpent: number;
  location: string;
  notificationTime: Date;
}

export type { Event, Task };
