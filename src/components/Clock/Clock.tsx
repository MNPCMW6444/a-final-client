import Typography from "@mui/material/Typography";
import { useState } from "react";

const Clock = (props: {
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}): JSX.Element => {
  const [time, setTime] = useState<string>(new Date().toLocaleString());
  setTimeout(() => setTime(new Date().toLocaleString()), 1000);
  return <Typography variant={props.size}>{time}</Typography>;
};
export default Clock;
