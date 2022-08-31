import GenericTableHead from "./GenericTableHead";
import GenericTableBody from "./GenericTableBody";
import Table from "@mui/material/Table";

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

const GenericTable = <T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>) => (
  <Table style={style}>
    <GenericTableHead columns={columns} />
    <GenericTableBody data={data} columns={columns} />
  </Table>
);

export default GenericTable;
