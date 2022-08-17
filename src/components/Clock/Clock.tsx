import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
type validClockSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Clock = (props: { size: validClockSize }) => {
  const [time, setTime] = useState<JSX.Element>(<></>);
  useEffect(() => {
    let interval = setTimeout(
      () =>
        setTime(
          <>
            <Typography
              variant={props.size}
              color="black"
              fontWeight="300"
              fontSize="1.2rem"
              lineHeight="1.467"
              letterSpacing="-0.01562em"
            >
              {new Date().toLocaleDateString()}
            </Typography>
            <Typography
              variant={props.size}
              color="black"
              fontWeight="300"
              fontSize="2rem"
              lineHeight="1.367"
              letterSpacing="-0.01562em"
            >
              {new Date().toLocaleTimeString().substring(0, 8)}
            </Typography>
          </>
        ),
      1000
    );
    return () => {
      clearTimeout(interval);
    };
  }, [time]);

  return time;
};
export default Clock;
