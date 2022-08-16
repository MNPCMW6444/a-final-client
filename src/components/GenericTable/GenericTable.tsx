import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import domain from "../../config/domain";
import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import EditForm from "../EditForm/EditForm";
import { Event, Task } from "../../interfaces/dataTypesInterfaces";

const GenericTable = (props: {
  allData: false | { tasks: false | Task[]; events: false | Event[] };
  setAllData: Function;
  type: string;
}): JSX.Element => {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [editedItem, seteditedItem] = useState<{ type: string; theItem: {} }>({
    type: "",
    theItem: {},
  });

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
        theItem:
          props.allData && props.allData.tasks && props.allData.tasks[index],
      });
    type === "Event" &&
      seteditedItem({
        type,
        theItem:
          props.allData && props.allData.events && props.allData.events[index],
      });
    openEditForm();
  };

  const remove = async (type: string, index: number) => {
    if (type === "events")
      props.setAllData({
        events: (
          await axios.delete(
            domain +
              "events/" +
              (props.allData as { events: Event[] }).events[index]._id
          )
        ).data,
        tasks: (props.allData as { tasks: Task[] }).tasks,
      });
    if (type === "tasks")
      props.setAllData({
        tasks: (
          await axios.delete(
            domain +
              "tasks/" +
              (props.allData as { tasks: Task[] }).tasks[index]._id
          )
        ).data,
        events: (props.allData as { events: Event[] }).events,
      });
  };

  return (
    <div className="allDataTable">
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
            {typeof props.allData === "object" ? (
              <>
                {props.allData.events &&
                  props.allData.events.length > 0 &&
                  props.allData.events.map((event: Event, i: number) => (
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
                {props.allData.tasks &&
                  props.allData.tasks.length > 0 &&
                  props.allData.tasks.map((task: Task, i: number) => (
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
                {props.allData.tasks &&
                  props.allData.tasks.length === 0 &&
                  props.allData.events &&
                  props.allData.events.length === 0 && (
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
};

export default GenericTable;
