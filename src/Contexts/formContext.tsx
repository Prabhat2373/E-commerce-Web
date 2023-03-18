// App.js
import { ReactNode, createContext, useState, useContext } from 'react';


export interface AddressType {
  userName: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
  telephone: string
  delivery: string
}
interface FormContextProps {
  formData: {};
  setFormData: React.Dispatch<React.SetStateAction<{}>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>
}
export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
);

export const FormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0)
  return (
    <FormContext.Provider value={{ formData, setFormData, setStep, step }}>
      {children}
    </FormContext.Provider>
  );
};

export const useOrderFormContext = () => {
  return useContext(FormContext);
};
