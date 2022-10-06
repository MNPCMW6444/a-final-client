import Axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import GenericForm from "../components/GenericForm/GenericForm";

const FormContext = createContext(GenericForm);

function formContextProvider() {
  const component: JSX.Element = new GenericForm({}) as unknown as JSX.Element;

  const [form, setForm] = useState<JSX.Element>(component);

  return (
    <UserContext.Provider value={{ form, setForm }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { formContextProvider };
