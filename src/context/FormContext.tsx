import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
} from "react";

import { Box, Fade, Modal } from "@mui/material";
import { Item } from "../types";
import GenericForm from "../components/GenericForm/GenericForm";

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

interface FormContextInterface {
  isFormOpen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  item: Item;
  setItem: Dispatch<SetStateAction<Item>>;
}

interface FormProviderProps {
  children: ReactNode;
}

const FormContext = createContext<FormContextInterface>(
  {} as FormContextInterface
);

const { Provider } = FormContext;

export const FormProvider = ({ children }: FormProviderProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const [item, setItem] = useState<Item>({} as Item);

  return (
    <Provider
      value={{
        isFormOpen,
        setIsFormOpen,
        item,
        setItem,
      }}
    >
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
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
            <GenericForm item={item} />
          </Box>
        </Fade>
      </Modal>
      {children}
    </Provider>
  );
};

export default FormContext;
