import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import AppFrame from "./components/AppFrame/AppFrame";
import Modal from "@mui/material/Modal";
import { Item } from "./types/dataTypes";
import GenericForm from "./components/GenericForm/GenericForm";

function App() {
  const [query, setQuery] = useState<string>("");

  const [editedItem, setEditedItem] = useState<Item>();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  const openModal = (editedItem: any): boolean => {
    setIsCreateFormOpen(true);
    setEditedItem(editedItem);
    return true;
  };

  const closeModal = () => setIsCreateFormOpen(false);

  return (
    <ThemeProvider theme={createTheme()}>
      <Modal open={isCreateFormOpen} onClose={closeModal}>
        <GenericForm closeForm={closeModal} item={editedItem} />
      </Modal>
      <ReactNotifications />
      <AppFrame query={query} setQuery={setQuery} openModal={openModal} />
    </ThemeProvider>
  );
}

export default App;
