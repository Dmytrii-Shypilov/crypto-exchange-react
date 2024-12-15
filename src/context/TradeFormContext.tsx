import React, { createContext, useEffect, useState, useMemo } from "react";

import { FormDataType, Form } from "../constants";


const formDefaults= {
  [Form.Limit]: {
    price: "",
    amount: "",
  },
  [Form.Market]: {
    total: "",
  },
  [Form.StopLimit]: {
    amount: "",
    stop: "",
    limit: "",
  },
  [Form.StopMarket]: {
    amount: "",
    stop: "",
  },
};

type FormDataContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  choosenPrice: string;
  setChoosenPrice: React.Dispatch<React.SetStateAction<string>>;
  onTabChange: (tabName: Form) => void;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const OrderFormContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const OrderFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [choosenPrice, setChoosenPrice] = useState<string>("");
  const [form, setForm] = useState<Form>(Form.Limit);

  const [formData, setFormData] = useState<FormDataType>({
    buy: { ...formDefaults[Form.Limit] },
    sell: { ...formDefaults[Form.Limit] },
  });

  //   useEffect(() => {

  //     setFormData({ buy: { ...formDefaults[form] }, sell: { ...formDefaults[form] }});
  //     if (choosenPrice) {
  //       setFormData((prevState) => {
  //         const updatedFields = ["price", "limit", "stop"].reduce(
  //           (state, field) => {
  //             if (field in prevState.buy) {
  //               state[field] = choosenPrice;
  //             }
  //             return state;
  //           },
  //           {} as Record<string, string>
  //         );
  //         return {
  //           buy: {
  //             ...prevState.buy,
  //             ...updatedFields,
  //           },
  //           sell: {
  //             ...prevState.sell,
  //             ...updatedFields,
  //           },
  //         };
  //       });
  //     }

  //   }, [form, choosenPrice]);

  useEffect(() => {
    // Reset form data based on the selected form
    const newFormData = {
      buy: { ...formDefaults[form] },
      sell: { ...formDefaults[form] },
    };
    // Apply chosen price to applicable fields
    if (choosenPrice) {
      ["price", "limit", "stop"].forEach((field) => {
        if (field in newFormData.buy) {
          (newFormData.buy as Record<string, string>)[field] = choosenPrice;
          (newFormData.sell as Record<string, string>)[field] = choosenPrice;
        }
      });
    }
    setFormData(newFormData);
  }, [form, choosenPrice]);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id as keyof FormDataType],
        [name]: value,
      },
    }));
  };

  const onTabChange = (tabName: Form) => {
    setForm(tabName);
  };

  const TradeFormContextValue = useMemo(
    () => ({
      formData,
      setFormData,
      form,
      setForm,
      choosenPrice,
      setChoosenPrice,
      onFormChange,
      onTabChange,
    }),
    [form, formData, choosenPrice]
  );

  return (
    <OrderFormContext.Provider value={TradeFormContextValue}>
      {children}
    </OrderFormContext.Provider>
  );
};

export { OrderFormContext };
