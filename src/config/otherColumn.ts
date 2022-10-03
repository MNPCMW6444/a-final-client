import { ItemTypes } from "../utils/enums";

const otherColumnMap = new Map([
  [
    ItemTypes.event,
    new Map([
      ["beginningTime", "From:"],
      ["endingTime", "Until:"],
      ["location", "Location:"],
    ]),
  ],
  [
    ItemTypes.task,
    new Map([
      ["review", "Review:"],
      ["status", "Status:"],
      ["timeSpent", "Time Spent:"],
      ["untilDate", "Until Date:"],
    ]),
  ],
]);

export default otherColumnMap;
