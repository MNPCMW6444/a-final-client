import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Modal from "react-modal";
import { useState } from "react";
import { Item } from "./types/dataTypes";

import MainAppBar from "./MainDrawer";

function App() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<Item>();

  const openModal = (editedItem: any): boolean => {
    setIsCreateFormOpen(true);
    setEditedItem(editedItem);
    return true;
  };

  const closeModal = () => {
    setIsCreateFormOpen(false);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Modal
        isOpen={isCreateFormOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "10vh",
            left: "10vw",
            right: "10vw",
            bottom: "10vh",
          },
        }}
      >
        {/*  {editedItem ? (
          <EditForm closeEditForm={closeModal} item={editedItem} />
        ) : (
          <CreateForm closeCreateForm={closeModal} />
        )} */}
      </Modal>
      <ReactNotifications />
      <MainAppBar />
    </ThemeProvider>
  );
}

export default App;
