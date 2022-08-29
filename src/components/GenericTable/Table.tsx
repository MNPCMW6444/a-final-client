import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

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
  <table style={style}>
    <TableHeader columns={columns} />
    <TableRows data={data} columns={columns} />
  </table>
);

export default Table;
