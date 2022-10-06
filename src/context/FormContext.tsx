import { createContext, useState } from "react";
import { Item } from "../types";
import Modal from "@mui/material/Modal";
import GenericForm from "../components/GenericForm/GenericForm";
import { Box, Fade } from "@mui/material";

export const FormContext = createContext<FormContextType | null>(null);

interface FormContextType {
  component: JSX.Element;
  isFormOpen: boolean;
  openForm: (editedItem: Item) => void;
  closeForm: () => void;
  editedItem: Item;
}

const modalStyle = {
  backgroundColor: "white",
  position: "fixed",
  minWidth: "540px",
  maxWidth: "700px",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  overflowX: "hidden",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "",
  },
};

const FormProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [editedItem, setEditedItem] = useState<Item>({} as Item);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const openForm = (editedItem: any) => {
    setIsFormOpen(true);
    setEditedItem(editedItem);
  };

  const closeForm = () => setIsFormOpen(false);

  const component = (
    <Modal
      open={isFormOpen}
      onClose={closeForm}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isFormOpen}>
        <Box
          sx={modalStyle}
          width="42vw"
          height="80vh"
          border="0.2rem solid #000"
          boxShadow={24}
          borderRadius="5vw"
          padding="4vw"
        >
          <GenericForm item={editedItem} refresh={/* refresh */ () => {}} />
        </Box>
      </Fade>
    </Modal>
  );

  return (
    <FormContext.Provider
      value={{ component, isFormOpen, openForm, closeForm, editedItem }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
