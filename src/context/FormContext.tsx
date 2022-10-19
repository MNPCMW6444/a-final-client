import {
  createContext,
  Dispatch,
  ReactNode,
  ReactElement,
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
  form: ReactElement<any, any>;
  isFormOpen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  item: Item;
  setItem: Dispatch<SetStateAction<Item>>;
}

const FormContext = createContext<FormContextInterface>(
  {} as FormContextInterface
);

const { Provider } = FormContext;

export const FormProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const [item, setItem] = useState<Item>({} as Item);

  const form = (
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
          <GenericForm item={item} refresh={() => {}} />
        </Box>
      </Fade>
    </Modal>
  );

  return (
    <Provider
      value={{
        form,
        isFormOpen,
        setIsFormOpen,
        item,
        setItem,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default FormContext;
