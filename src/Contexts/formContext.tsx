// App.js
import { ReactNode, createContext, useState, useContext } from 'react';
interface FormContextProps {
  formData: {};
  setFormData: React.Dispatch<React.SetStateAction<{}>>;
}
export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
);

export const FormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState({});
  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};
