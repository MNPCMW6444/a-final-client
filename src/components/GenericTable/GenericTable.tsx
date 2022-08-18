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
import { Item } from "../../interfaces/dataTypesInterfaces";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const GenericTable = (props: {
  allData: false | Item[];
  type: string;
  setAllData: React.Dispatch<React.SetStateAction<Item[]>>;
  openModal: (editedItem: Item) => boolean;
}) => {
  const [editedItem, seteditedItem] = useState<Item>();
  const edit = (value: Item) => {
    props.openModal(value);
    seteditedItem(value);
  };

  const remove = async (value: Item) => {
    props.setAllData((await axios.delete(domain + "all/" + value._id)).data);
  };

  return (
    <div className="allDataTable">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                Object.keys(props.allData)
              }
              <TableCell sx={{ textAlign: "center" }}>Title</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {props.allData ? (
              props.allData.length > 0 &&
              props.allData.map((item) => (
                <TableRow>
                  {Object.entries(item).map(
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
                          edit(item);
                        }}
                      >
                        ✏️
                      </Button>
                      <Button
                        onClick={() => {
                          remove(item);
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
