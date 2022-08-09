import "./createForm.css";
import { useState } from "react";
import Selectors from "./createForm/Selectors";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { StyledEngineProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

export default function CreateForm() {
  const [itemType, setItemType] = useState("");
  const [savingStatus, setSavingStatus] = useState("Save");

  const save = () => {};

  return (
    <div className="createForm">
      <div className="selectors">
        <StyledEngineProvider injectFirst>
          <Typography variant="h2" component="h2">
            Create a New Item:
          </Typography>
          <Selectors itemType={itemType} setItemType={setItemType} />
        </StyledEngineProvider>
      </div>
      <br />
      <div className="form">
        <FormControl>
          {itemType === "Task" && (
            <>
              <TextField
                className="field"
                id="filled-basic"
                label="Title"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Description"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Estimated time"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Status"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Priority"
                variant="filled"
              />
            </>
          )}
          {itemType === "Event" && (
            <>
              <TextField
                className="field"
                id="filled-basic"
                label="Title"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Description"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Beginning time"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Ending time"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Color"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Invited guests"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Location"
                variant="filled"
              />
              <TextField
                className="field"
                id="filled-basic"
                label="Notification time"
                variant="filled"
              />
            </>
          )}
          {itemType && (
            <Button variant="contained" onClick={save}>
              {savingStatus}
            </Button>
          )}
        </FormControl>
      </div>
    </div>
  );
}
