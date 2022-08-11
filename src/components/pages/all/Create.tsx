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
          content: {
            top: "10vh",
            left: "10vw",
            right: "10vw",
            bottom: "10vh",
          },
        }}
      >
        <CreateForm closeCreateForm={closeCreateForm} />
      </Modal>
    </div>
  );
}
