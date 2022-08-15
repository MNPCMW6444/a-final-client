//import { Table, Thead, Tbody, Tr, Th, TableCell } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import domain from "../../../domain";
import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import EditForm from "./all-table/EditForm";

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

export default function AllTable(props: {
  all: false | { tasks: false | Task[]; events: false | Event[] };
  setAll: Function;
  type: string;
}) {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editedItem, seteditedItem] = useState({ type: "", theItem: {} });

  const openEditForm = () => {
    setIsEditFormOpen(true);
  };

  const closeEditForm = () => {
    setIsEditFormOpen(false);
  };
  const edit = (type: string, index: number) => {
    type === "Task" &&
      seteditedItem({
        type,
        theItem: props.all && props.all.tasks && props.all.tasks[index],
      });
    type === "Event" &&
      seteditedItem({
        type,
        theItem: props.all && props.all.events && props.all.events[index],
      });
    openEditForm();
  };

  const remove = async (type: string, index: number) => {
    if (type === "events")
      props.setAll({
        events: (
          await axios.delete(
            domain +
              "events/" +
              (props.all as { events: Event[] }).events[index]._id
          )
        ).data,
        tasks: (props.all as { tasks: Task[] }).tasks,
      });
    if (type === "tasks")
      props.setAll({
        tasks: (
          await axios.delete(
            domain +
              "tasks/" +
              (props.all as { tasks: Task[] }).tasks[index]._id
          )
        ).data,
        events: (props.all as { events: Event[] }).events,
      });
  };

  return (
    <div className="allTable">
      <Modal
        isOpen={isEditFormOpen}
        onRequestClose={closeEditForm}
        contentLabel="Edit Form"
        style={{
          content: {
            top: "10vh",
            left: "10vw",
            right: "10vw",
            bottom: "10vh",
          },
        }}
      >
        <EditForm
          closeEditForm={closeEditForm}
          type={editedItem.type}
          item={editedItem.theItem}
        />
      </Modal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>Type</TableCell>
              {props.type !== "events" && (
                <TableCell sx={{ textAlign: "center" }}>Priority</TableCell>
              )}
              <TableCell sx={{ textAlign: "center" }}>Title</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {typeof props.all === "object" ? (
              <>
                {props.all.events &&
                  props.all.events.length > 0 &&
                  props.all.events.map((event: Event, i: number) => (
                    <TableRow key={i}>
                      <TableCell sx={{ textAlign: "center" }}>Event</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {event.title}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          onClick={() => {
                            edit("Event", i);
                          }}
                        >
                          ✏️
                        </Button>
                        <Button
                          onClick={() => {
                            remove("events", i);
                          }}
                        >
                          🗑️
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {props.all.tasks &&
                  props.all.tasks.length > 0 &&
                  props.all.tasks.map((task: Task, i: number) => (
                    <TableRow key={i}>
                      <TableCell sx={{ textAlign: "center" }}>Task</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {task.priority}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {task.title}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          onClick={() => {
                            edit("Task", i);
                          }}
                        >
                          ✏️
                        </Button>
                        <Button
                          onClick={() => {
                            remove("tasks", i);
                          }}
                        >
                          🗑️
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {props.all.tasks &&
                  props.all.tasks.length === 0 &&
                  props.all.events &&
                  props.all.events.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        No data matches the search
                      </TableCell>
                    </TableRow>
                  )}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Can not get data from server</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
