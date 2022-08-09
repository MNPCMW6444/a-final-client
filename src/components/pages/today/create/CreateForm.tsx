import "./createForm.css";
import Demo from "./Demo";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { StyledEngineProvider } from "@mui/material/styles";

export default function CreateForm() {
  return (
    <div className="createForm">
      <h1>Create a New Item:</h1>
      <div className="selectors">
        <Button className="selector">Task</Button>
        <Button className="selector">Event</Button>
        <StyledEngineProvider injectFirst>
          <Demo />
        </StyledEngineProvider>
      </div>
      <TextField id="filled-basic" label="Filled" variant="filled" />
    </div>
  );
}
