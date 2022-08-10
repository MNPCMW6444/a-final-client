//import { Table, Thead, Tbody, Tr, Th, TableCell } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Event {
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
  title: String;
  description: String;
  estimatedTime: Date;
  status: String;
  priority: String;
}

export default function allTable(props: {
  all: false | { tasks: false | Task[]; events: false | Event[] };
}) {
  console.log(props);
  return (
    <div className="allTable">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Other</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {typeof props.all === "object" ? (
              <>
                {props.all.events &&
                  props.all.events.length > 0 &&
                  props.all.events.map((event: Event, i: number) => (
                    <TableRow key={i}>
                      <TableCell>Event</TableCell>
                      <TableCell></TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                {props.all.tasks &&
                  props.all.tasks.length > 0 &&
                  props.all.tasks.map((task: Task, i: number) => (
                    <TableRow key={i}>
                      <TableCell>Task</TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
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
