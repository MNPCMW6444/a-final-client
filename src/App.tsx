import { styled } from "@mui/material";
import Select from "react-select";

const MySelect = styled(Select)({
  width: "200px",
  fontSize: "16px",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid gray",
});

function App() {
  return (
    <MySelect
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
    />
  );
}

export default App;
