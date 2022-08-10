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
import domain from "../../../../domain";
import Axios from "axios";

export default function CreateForm() {
  const [itemType, setItemType] = useState("");
  const [savingStatus, setSavingStatus] = useState("Save");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [beginningTime, setBeginningTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [color, setColor] = useState("");
  const [invitedGuests, setInvitedGuests] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [untilDate, setUntilDate] = useState("");
  const [notificationTime, setNotificationTime] = useState("");

  const save = async () => {
    setSavingStatus("Saving...");
    console.log(estimatedTime);
    const dataToSave =
      itemType === "Task"
        ? {
            title,
            description,
            estimatedTime,
            status,
            priority,
          }
        : {
            title,
            description,
            beginningTime,
            endingTime,
            color,
            invitedGuests,
            location,
            estimatedTime,
          };
    const res = await Axios.post(domain + "save" + itemType, { dataToSave });
  };
  return (
    <div className="createForm">
      <div className="selectors">
        <StyledEngineProvider injectFirst>
          <br />

          <Typography variant="h2" component="h2">
            Create a New {itemType || "Item"}:
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
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e || "")}
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
              {status === "Close" && (
                <>
                  <TextField
                    required
                    id="outlined-basic"
                    label="Review"
                    variant="outlined"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  <br />
                  <TextField
                    required
                    id="outlined-basic"
                    label="Time Spent"
                    variant="outlined"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(parseFloat(e.target.value))}
                  />
                  <br />
                </>
              )}
              {(priority === "Top" || status === "Close") && (
                <>
                  <DatePicker
                    label="Until Date"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e || "")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <br />
                </>
              )}
            </>
          )}
          {itemType === "Event" && (
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
                label="Beginning time"
                value={beginningTime}
                onChange={(e) => setBeginningTime(e || "")}
                renderInput={(params) => <TextField {...params} />}
              />
              <br />
              <DatePicker
                label="ending time"
                value={endingTime}
                onChange={(e) => setEndingTime(e || "")}
                renderInput={(params) => <TextField {...params} />}
              />
              <br />
              <TextField
                required
                id="outlined-basic"
                label="Color"
                variant="outlined"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Invited guests"
                variant="outlined"
                value={invitedGuests}
                onChange={(e) => setInvitedGuests(e.target.value)}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <br />
              <DatePicker
                label="Notification time"
                value={notificationTime}
                onChange={(e) => setNotificationTime(e || "")}
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
