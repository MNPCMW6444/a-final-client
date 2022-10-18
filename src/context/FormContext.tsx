import { createContext, useReducer, Dispatch, ReactNode } from "react";
import { Item } from "../types";

interface FormState {
  item: Item;
  isFormOpen: boolean;
}

const initialState: FormState = {
  item: {} as Item,
  isFormOpen: false,
};

type FormAction = {
  type: "SET_STATE";
  state: Partial<FormState>;
};

interface FormContext extends FormState {
  dispatch: Dispatch<FormAction>;
}

const FormContext = createContext<FormContext>(initialState as FormContext);

const { Provider } = FormContext;
export const FormProvider: React.FC<{ children: ReactNode }> = (props) => {
  const reducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case "SET_STATE":
        return { ...state, ...action.state };
      default:
        return { ...state };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>;
};

export default FormContext;
