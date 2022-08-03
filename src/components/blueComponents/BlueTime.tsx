import { useState } from "react";

export default function BlueTime() {
  const [time, setTime] = useState(new Date().toLocaleString());
  setTimeout(() => setTime(new Date().toLocaleString()), 1000);
  return <div>{time}</div>;
}
