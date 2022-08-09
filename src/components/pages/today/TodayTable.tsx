//import { Table, Thead, Tbody, Tr, Th, TableCell } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./todayStyles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Item {
  type: string;
  priority: string;
  title: string;
  other: string;
  actions: string;
}

interface Event extends Item {
  type: "event";
}

interface Task extends Item {
  type: "task";
}

export default function TodayTable(props: {
  all: false | { tasks: Task[]; events: Event[] };
}) {
  return (
    <div className="todayTable">
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
                {props.all.events.length > 0 &&
                  props.all.events.map((event: Event, i: number) => (
                    <TableRow key={i}>
                      <TableCell>Event</TableCell>
                      <TableCell>{event.priority}</TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{event.other}</TableCell>
                      <TableCell>{event.actions}</TableCell>
                    </TableRow>
                  ))}
                {props.all.tasks.length > 0 &&
                  props.all.tasks.map((task: Task, i: number) => (
                    <TableRow key={i}>
                      <TableCell>Task</TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.other}</TableCell>
                      <TableCell>{task.actions}</TableCell>
                    </TableRow>
                  ))}
                {props.all.tasks.length === 0 && props.all.tasks.length === 0 && (
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
