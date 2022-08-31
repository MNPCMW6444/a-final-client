type idType = [key: string];
type titleType = [key: string];
type descriptionType = [key: string];
type beginningTimeType = [key: string];
type endingTimeType = [key: string];
type colorType = [key: string];
type locationType = [key: string];
type invitedGuestsType = [key: string[]];
type notificationTimeType = [key: string];
type estimatedTimeType = [key: string];
type statusType = [key: string];
type priorityType = [key: string];
type reviewType = [key: string];
type timeSpentType = [key: string];
type untilDateType = [key: string];

interface Item {
  id: idType;
  title: titleType;
  description: descriptionType;
}

interface Event extends Item {
  beginningTime: beginningTimeType;
  endingTime: endingTimeType;
  color: colorType;
  location?: locationType;
  invitedGuests?: invitedGuestsType;
  notificationTime?: notificationTimeType;
}

interface Task extends Item {
  estimatedTime: estimatedTimeType;
  status: statusType;
  priority: priorityType;
  review?: reviewType;
  timeSpent?: timeSpentType;
  untilDate: untilDateType;
}

export type { Item, Event, Task };
