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
          <TableBody>
            {props.allData ? (
              props.allData.length > 0 &&
              props.allData.map((item) => (
                <TableRow>
                  {Object.entries(any).map(
                    ([key, value]) =>
                      key === "description" && (
                        <TableCell sx={{ textAlign: "center" }}>
                          {value}
                        </TableCell>
                      )
                  )}
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          edit(any);
                        }}
                      >
                        ✏️
                      </Button>
                      <Button
                        onClick={() => {
                          remove(any);
                        }}
                      >
                        🗑️
                      </Button>
                    </TableCell>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="h6">
                    No data exists or matches the search
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GenericTable;
