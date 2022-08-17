import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
type validClockSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface ClockProps {
  size: validClockSize;
}
const Clock = (props: ClockProps) => {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    let interval = setTimeout(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [time]);

  return (
    <>
      <Typography
        variant={props.size}
        color="black"
        fontWeight="300"
        fontSize="1.2rem"
        lineHeight="1.467"
        letterSpacing="-0.01562em"
      >
        {time.toLocaleDateString()}
      </Typography>
      <Typography
        variant={props.size}
        color="black"
        fontWeight="300"
        fontSize="2rem"
        lineHeight="1.367"
        letterSpacing="-0.01562em"
      >
        {time.toLocaleTimeString().substring(0, 8)}
      </Typography>
    </>
  );
};
export default Clock;
