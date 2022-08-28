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

const GenericTable = (props: {
  allData: any;
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

  const allData: (Event | Task)[] = [...mockData.events, ...mockData.tasks];

  return (
    <div className="allDataTable">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(props.allData)}
              <TableCell sx={{ textAlign: "center" }}>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GenericTable;
