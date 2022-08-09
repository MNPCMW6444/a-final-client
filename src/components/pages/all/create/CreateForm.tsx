import "./createForm.css";
import { useState } from "react";
import Selectors from "./createForm/Selectors";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { StyledEngineProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function CreateForm() {
  const [itemType, setItemType] = useState("");
  const [savingStatus, setSavingStatus] = useState("Save");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(new Date());
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const save = () => {};

  return (
    <div className="createForm">
      <div className="selectors">
        <StyledEngineProvider injectFirst>
          <Typography variant="h2" component="h2">
            Create a New Item:
          </Typography>
          <br />
          <Selectors itemType={itemType} setItemType={setItemType} />
        </StyledEngineProvider>
      </div>
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormControl>
          {itemType === "Task" && (
            <>
              <TextField
                required
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <TextField
                required
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <DatePicker
                label="Estimated time"
                value={
                  estimatedTime.getDate() +
                  "/" +
                  estimatedTime.getMonth() +
                  "/" +
                  estimatedTime.getFullYear()
                }
                onChange={(e) => {
                  debugger;
                  const eString = e?.toString();
                  if (eString && eString !== null)
                    setEstimatedTime(
                      new Date(
                        parseInt(eString.split(" ")[2]),
                        parseInt("9"),
                        parseInt(eString.split(" ")[3])
                      )
                    );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <br />
              <TextField
                required
                id="outlined-basic"
                label="Status"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <br />
              <TextField
                required
                id="outlined-basic"
                label="Priority"
                variant="outlined"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
              <br />
            </>
          )}
          {itemType === "Event" && (
            <>
              <TextField
                required
                id="outlined-basic"
                label="Title"
                variant="outlined"
              />
              <br />
              <TextField
                required
                id="outlined-basic"
                label="Description"
                variant="outlined"
              />
              <br />
              <DatePicker
                label="Beginning time"
                value={
                  estimatedTime.getDate() +
                  "/" +
                  estimatedTime.getMonth() +
                  "/" +
                  estimatedTime.getFullYear()
                }
                onChange={(e) => {
                  debugger;
                  const eString = e?.toString();
                  if (eString && eString !== null)
                    setEstimatedTime(
                      new Date(
                        parseInt(eString.split(" ")[2]),
                        parseInt("9"),
                        parseInt(eString.split(" ")[3])
                      )
                    );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <br />
              <DatePicker
                label="ending time"
                value={
                  estimatedTime.getDate() +
                  "/" +
                  estimatedTime.getMonth() +
                  "/" +
                  estimatedTime.getFullYear()
                }
                onChange={(e) => {
                  debugger;
                  const eString = e?.toString();
                  if (eString && eString !== null)
                    setEstimatedTime(
                      new Date(
                        parseInt(eString.split(" ")[2]),
                        parseInt("9"),
                        parseInt(eString.split(" ")[3])
                      )
                    );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <br />
              <TextField
                required
                id="outlined-basic"
                label="Color"
                variant="outlined"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Invited guests"
                variant="outlined"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
              />
              <br />
              <DatePicker
                label="Estimated time"
                value={
                  estimatedTime.getDate() +
                  "/" +
                  estimatedTime.getMonth() +
                  "/" +
                  estimatedTime.getFullYear()
                }
                onChange={(e) => {
                  debugger;
                  const eString = e?.toString();
                  if (eString && eString !== null)
                    setEstimatedTime(
                      new Date(
                        parseInt(eString.split(" ")[2]),
                        parseInt("9"),
                        parseInt(eString.split(" ")[3])
                      )
                    );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <br />
            </>
          )}
          {itemType && (
            <Button variant="contained" onClick={save}>
              {savingStatus}
            </Button>
          )}
        </FormControl>
      </LocalizationProvider>
    </div>
  );
}
