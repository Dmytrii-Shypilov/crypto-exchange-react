import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { FormDataType, Form, Transaction } from "../constants";
import { tradeAPI } from "../api/tradeAPI";

const formDefaults = {
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
  onFormSubmit: (pair: string,e: React.FormEvent<HTMLFormElement>) => void;
  isOrderPosted: boolean;
  setIsOrderPosted: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: { value: boolean; transaction: Transaction | null };
};

const TradeFormContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const TradeFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [choosenPrice, setChoosenPrice] = useState<string>("");
  const [form, setForm] = useState<Form>(Form.Limit);
  const [isOrderPosted, setIsOrderPosted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<{
    value: boolean;
    transaction: Transaction | null;
  }>({ value: false, transaction: null });
  const [formData, setFormData] = useState<FormDataType>({
    buy: { ...formDefaults[Form.Limit] },
    sell: { ...formDefaults[Form.Limit] },
  });

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

  const onFormSubmit = useCallback(
    async (pair: string, e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newFormData = {
        buy: { ...formDefaults[form] },
        sell: { ...formDefaults[form] },
      };
      // Get the submit button that triggered the form submission
      const submitter = (e.nativeEvent as SubmitEvent)
        .submitter as HTMLButtonElement;

      if (submitter) {
        const buttonId = submitter.id as Transaction; // Retrieve the ID of the clicked submit button
        const transaction = buttonId; // Use button ID as the transaction type
        const order = {
          type: form,
          transaction: buttonId,
          pair,
          ...formData[transaction as keyof FormDataType],
        };
        const hasEmptyFields = Object.values(order).some(
          (value) => value === "" || Number(value) === 0
        );
        if (hasEmptyFields) {
          console.log("has empty fields");
          return;
        }
        setIsLoading({ value: true, transaction: buttonId });

        await tradeAPI.postOrder(order);

        setIsOrderPosted(true);
    
        setIsLoading({ value: false, transaction: null });
        setFormData(newFormData)
      }
    },
    [form, formData]
  );

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
      setIsOrderPosted,
      isOrderPosted,
      onFormSubmit,
      isLoading,
    }),
    [form, formData, choosenPrice, isOrderPosted, onFormSubmit, isLoading]
  );

  return (
    <TradeFormContext.Provider value={TradeFormContextValue}>
      {children}
    </TradeFormContext.Provider>
  );
};

export { TradeFormContext };
