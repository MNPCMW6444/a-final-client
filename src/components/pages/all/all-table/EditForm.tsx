import { useState } from "react";
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
import { Store } from "react-notifications-component";
import defaultSettings from "../../../../config/notificationDefaultSettings";

interface Event {
  _id: String;
  title: String;
  description: String;
  beginningTime: Date;
  endingTime: Date;
  color: String;
  invitedGuests: String;
  location: String;
  estimatedTime: Date;
}

interface Task {
  _id: String;
  title: String;
  description: String;
  estimatedTime: Date;
  status: String;
  priority: String;
  review: String;
  timeSpent: number;
  location: string;
  notificationTime: Date;
}

export default function EditForm(props: {
  closeEditForm: Function;
  type: string;
  item: {} | Task | Event;
}) {
  const [itemType, setItemType] = useState(props.type);
  const [savingStatus, setSavingStatus] = useState("Save");
  const [title, setTitle] = useState(
    props.type === "Event"
      ? (props.item as Event).title
      : (props.item as Task).title
  );
  const [description, setDescription] = useState(
    props.type === "Event"
      ? (props.item as Event).description
      : (props.item as Task).description
  );
  const [estimatedTime, setEstimatedTime] = useState(
    props.type === "Event"
      ? ((props.item as Event).estimatedTime as Date | "")
      : ((props.item as Task).estimatedTime as Date | "")
  );
  const [status, setStatus] = useState(
    props.type === "Task" && (props.item as Task).status
  );
  const [priority, setPriority] = useState(
    props.type === "Task" && (props.item as Task).priority
  );
  const [beginningTime, setBeginningTime] = useState(
    props.type === "Event" ? (props.item as Event).beginningTime : ""
  );
  const [endingTime, setEndingTime] = useState(
    props.type === "Event" ? (props.item as Event).endingTime : ""
  );
  const [color, setColor] = useState(
    props.type === "Event" && (props.item as Event).color
  );
  const [invitedGuests, setInvitedGuests] = useState(
    props.type === "Event" && (props.item as Event).invitedGuests
  );
  const [location, setLocation] = useState(
    props.type === "Event" && (props.item as Event).location
  );
  const [review, setReview] = useState(
    props.type === "Task" && (props.item as Task).review
  );
  const [timeSpent, setTimeSpent] = useState(
    props.type === "Task" && (props.item as Task).timeSpent
  );
  const [untilDate, setUntilDate] = useState(
    props.type === "Task" && (props.item as Task).location
  );
  const [notificationTime, setNotificationTime] = useState(
    props.type === "Task" ? (props.item as Task).notificationTime : ""
  );

  const save = () => {
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
    Axios.put(domain + "save" + itemType, { dataToSave })
      .then((res) => {
        if (res.status === 200) props.closeEditForm();
      })
      .catch((err) => {
        debugger;
        setSavingStatus("Save");
        Store.removeAllNotifications();
        Store.addNotification({
          title: "Error!",
          message: "code " + err.message,
          type: "danger",
          ...defaultSettings,
        });
      });
  };

  return (
    <div>
      <div className="selectors">
        <StyledEngineProvider injectFirst>
          <br />
          <Typography variant="h2" component="h2">
            Edit:
          </Typography>
          <br />
        </StyledEngineProvider>
      </div>
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormControl>
          {itemType === "Task" && (
            <>
              <TextField
                required
                sx={{ width: "70vw", textAlign: "center" }}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <TextField
                required
                sx={{ width: "70vw", textAlign: "center" }}
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
                sx={{ width: "70vw", textAlign: "center" }}
                id="outlined-basic"
                label="Status"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <br />
              <TextField
                required
                sx={{ width: "70vw", textAlign: "center" }}
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
                    sx={{ width: "70vw", textAlign: "center" }}
                    id="outlined-basic"
                    label="Review"
                    variant="outlined"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  <br />
                  <TextField
                    required
                    sx={{ width: "70vw", textAlign: "center" }}
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
                sx={{ width: "70vw", textAlign: "center" }}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <TextField
                required
                sx={{ width: "70vw", textAlign: "center" }}
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
                sx={{ width: "70vw", textAlign: "center" }}
                id="outlined-basic"
                label="Color"
                variant="outlined"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <br />
              <TextField
                id="outlined-basic"
                sx={{ width: "70vw", textAlign: "center" }}
                label="Invited guests"
                variant="outlined"
                value={invitedGuests}
                onChange={(e) => setInvitedGuests(e.target.value)}
              />
              <br />
              <TextField
                id="outlined-basic"
                sx={{ width: "70vw", textAlign: "center" }}
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
