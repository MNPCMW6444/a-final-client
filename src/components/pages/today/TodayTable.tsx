import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./todayStyles.css";

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
      <Table>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Priority</Th>
            <Th>Title</Th>
            <Th>Other</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {typeof props.all === "object" ? (
            <>
              {props.all.events.length > 0 &&
                props.all.events.map((event: Event, i: number) => (
                  <Tr key={i}>
                    <Td>Event</Td>
                    <Td>{event.priority}</Td>
                    <Td>{event.title}</Td>
                    <Td>{event.other}</Td>
                    <Td>{event.actions}</Td>
                  </Tr>
                ))}
              {props.all.tasks.length > 0 &&
                props.all.tasks.map((task: Task, i: number) => (
                  <Tr key={i}>
                    <Td>Task</Td>
                    <Td>{task.priority}</Td>
                    <Td>{task.title}</Td>
                    <Td>{task.other}</Td>
                    <Td>{task.actions}</Td>
                  </Tr>
                ))}
              {props.all.tasks.length === 0 && props.all.tasks.length === 0 && (
                <Tr>
                  <Td colSpan={5}>No data matches the search</Td>
                </Tr>
              )}
            </>
          ) : (
            <Tr>
              <Td colSpan={5}>Can not get data from server</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
}
