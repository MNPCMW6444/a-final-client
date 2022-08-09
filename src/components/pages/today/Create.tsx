import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import CreateForm from "./create/CreateForm";

export default function Create() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const openCreateForm = () => {
    setIsCreateFormOpen(true);
  };

  const closeCreateForm = () => {
    setIsCreateFormOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={openCreateForm}>
        Create a New Item
      </Button>
      <Modal
        isOpen={isCreateFormOpen}
        onRequestClose={closeCreateForm}
        contentLabel="Create Form"
        style={{
          overlay: {
            top: "5vw",
            left: "5vw",
            right: "5vw",
            bottom: "5vw",
          },
          content: {
            top: "5vw",
            left: "5vw",
            right: "5vw",
            bottom: "5vw",
          },
        }}
      >
        <CreateForm />
      </Modal>
    </div>
  );
}
