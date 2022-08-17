import Button from "@mui/material/Button";

const Create = (props: { openModal: Function }) => {
  return (
    <Button
      variant="contained"
      onClick={() => props.openModal({ type: "", theItem: {} })}
    >
      Create a New Item
    </Button>
  );
};

export default Create;
