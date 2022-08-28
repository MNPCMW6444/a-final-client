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

const GenericTable = (props: {
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
              {props.allData &&
                Object.keys({
                  ...(props.type === "events" && props.allData[0]),
                  ...(props.type === "tasks" && props.allData[3]),
                }).map((header) => <TableCell>{header}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allData &&
              props.allData.map((row) => (
                <TableRow>
                  {Object.values(row).map((value) => (
                    <TableCell>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GenericTable;
