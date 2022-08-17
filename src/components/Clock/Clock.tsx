import Typography from "@mui/material/Typography";
import { useState } from "react";
type validClockSize=
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
const Clock = (props: {
  size:validClockSize;
}) => {
  const [time, setTime] = useState<string>(new Date().toLocaleString());
  setTimeout(() => setTime(new Date().toLocaleString()), 1000);
  return <Typography variant={props.size}>{time}</Typography>;
};
export default Clock;
