import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import MuiTable from "@mui/material/Table";

type ColumnDefinitionType = {
  key: string;
  header: string;
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType>;
};

const style = {
  borderCollapse: "collapse",
} as const;

const Table = <T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>): JSX.Element => (
  <MuiTable style={style}>
    <TableHeader columns={columns} />
    <TableRows data={data} columns={columns} />
  </MuiTable>
);

export default Table;
