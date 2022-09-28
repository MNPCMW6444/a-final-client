import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    let interval = setTimeout(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [time]);

  return (
    <>
      <Typography fontSize="1.2rem">{time.toLocaleDateString()}</Typography>
      <Typography fontSize="2rem">
        {time.toLocaleTimeString().substring(0, 8)}
      </Typography>
    </>
  );
};
export default Clock;
