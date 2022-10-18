import {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  ReactElement,
} from "react";

import { Item } from "../types";

interface FormState {
  form: ReactElement<any, any>;
  item: Item;
}

const initialState: FormState = {
  form: <></>,
  item: {} as Item,
};

type FormAction = {
  type: "SET_STATE";
  state: Partial<FormState>;
};

interface FormContextType extends FormState {
  dispatch: Dispatch<FormAction>;
}

const FormContext = createContext<FormContextType>(
  initialState as FormContextType
);

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
