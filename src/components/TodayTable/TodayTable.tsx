import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
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
import { Event, Task } from "../../types/dataTypesInterfaces";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import mockData from "../../assets/mock.json";
import { keys } from "@mui/system";

const TodayTable = (props: {
  allData: false | (Event | Task)[];
  type: string;
  setAllData: React.Dispatch<React.SetStateAction<any[]>>;
  openModal: (editedItem: any) => boolean;
}) => {
  const [editedItem, setEditedItem] = useState<any>();
  const edit = (value: any) => {
    props.openModal(value);
    setEditedItem(value);
  };

  const remove = async (value: any) => {
    props.setAllData((await axios.delete(domain + "all/" + value._id)).data);
  };

  return (
    <div className="allDataTable">
      <TableContainer component={Paper}>
        <Table>
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
            {props.allData &&
              props.allData.map((row) => {
                let indexesToIgnore: number[] = [];
                return (
                  <TableRow>
                    <TableCell>{"review" in row ? "Task" : "Event"}</TableCell>
                    <TableCell>
                      {"review" in row ? row.priority : "-"}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      <TableRow>
                        {Object.keys(row).map((key, i) => {
                          if (
                            key !== "id" &&
                            key !== "title" &&
                            key !== "priority" &&
                            key !== "description"
                          )
                            return <TableCell>{key + ":"}</TableCell>;
                          else indexesToIgnore.push(i);
                          return null;
                        })}
                      </TableRow>
                      <TableRow>
                        {Object.values(row).map(
                          (value, i) =>
                            indexesToIgnore.indexOf(i) === -1 && (
                              <TableCell>{value}</TableCell>
                            )
                        )}
                      </TableRow>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TodayTable;
