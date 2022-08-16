import TextField from "@mui/material/TextField";

export default function Search(props: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <TextField
      sx={{
        width: "100%",
      }}
      label="Search By Title"
      variant="standard"
      onChange={(e) => props.setQuery(e.target.value)}
    />
  );
}
