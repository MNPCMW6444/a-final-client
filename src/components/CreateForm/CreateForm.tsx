import { useState } from "react";
import Selectors from "../Selectors/Selectors";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { StyledEngineProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import domain from "../../config/domain";
import Axios from "axios";
import { Store } from "react-notifications-component";
import defaultSettings from "../../config/notificationDefaultSettings";
import Grid from "@mui/material/Grid";

const CreateForm = (props: { closeCreateForm: Function }) => {
  const [itemType, setItemType] = useState<string>("");
  const [savingStatus, setSavingStatus] = useState<string>("Save");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [beginningTime, setBeginningTime] = useState<string>("");
  const [endingTime, setEndingTime] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [invitedGuests, setInvitedGuests] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [untilDate, setUntilDate] = useState<string>("");
  const [notificationTime, setNotificationTime] = useState<string>("");

  const save = () => {
    setSavingStatus("Saving...");
    console.log(estimatedTime);
    const dataToSave =
      itemType === "Task"
        ? { title, description, estimatedTime, status, priority }
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
    Axios.post(domain + "save" + itemType, { dataToSave })
      .then((res) => {
        if (res.status === 200) props.closeCreateForm();
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
    <Grid container justifyContent="space-around">
      <StyledEngineProvider injectFirst>
        <Typography variant="h2" component="h2">
          Create a New {itemType || "Item"}:
        </Typography>
        <Selectors itemType={itemType} setItemType={setItemType} />
      </StyledEngineProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormControl>
          {itemType === "Task" && (
            <Grid container rowSpacing={3}>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}></Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Estimated time"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e || "")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Status"
                  variant="outlined"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Priority"
                  variant="outlined"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </Grid>
              {status === "Close" && (
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-basic"
                    label="Time Spent"
                    variant="outlined"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(parseFloat(e.target.value))}
                  />
                </Grid>
              )}
              {status === "Close" && (
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-basic"
                    label="Review"
                    variant="outlined"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </Grid>
              )}
              {(priority === "Top" || status === "Close") && (
                <Grid item xs={6}>
                  <DatePicker
                    label="Until Date"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e || "")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              )}
              <Grid item xs={6}></Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          )}
          {itemType === "Event" && (
            <Grid container rowSpacing={3}>
              <Grid item xs={6}></Grid> <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Beginning time"
                  value={beginningTime}
                  onChange={(e) => setBeginningTime(e || "")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="ending time"
                  value={endingTime}
                  onChange={(e) => setEndingTime(e || "")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Color"
                  variant="outlined"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Invited guests"
                  variant="outlined"
                  value={invitedGuests}
                  onChange={(e) => setInvitedGuests(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Notification time"
                  value={notificationTime}
                  onChange={(e) => setNotificationTime(e || "")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}></Grid> <Grid item xs={6}></Grid>
            </Grid>
          )}
          {itemType && (
            <Button variant="contained" onClick={save}>
              {savingStatus}
            </Button>
          )}
        </FormControl>
      </LocalizationProvider>
    </Grid>
  );
};

export default CreateForm;
