import s from "./set.module.scss";
import { memo } from "react";
import { Form, InputType, Transaction, FormDataTypeObj } from "../../../constants";
import TradeFormInput from "../../ui/TradeFormInput/TradeFormInput";
import { useFormData } from "../../../hooks/useFormData";


type InputsSetProps = {
  pair: string;
  transaction: Transaction;
  formData: FormDataTypeObj
};

const InputsSet: React.FC<InputsSetProps> = ({
  pair,
  transaction,
  formData,
}) => {
  const [base, quote] = pair.split("-");
  
  const {form} = useFormData()
  console.log("INPUT SET")

  const formConfig = {
    [Form.Limit]: [
      { type: InputType.Price, currency: quote },
      { type: InputType.Amount, currency: base },
    ],
    [Form.Market]: [
      {
        type:
          transaction === Transaction.Buy ? InputType.Total : InputType.Amount,
        currency: transaction === Transaction.Buy ? quote : base,
      },
    ],
    [Form.StopLimit]: [
      { type: InputType.Stop, currency: quote },
      { type: InputType.Limit, currency: quote },
      { type: InputType.Amount, currency: base },
    ],
    [Form.StopMarket]: [
      { type: InputType.Stop, currency: quote },
      { type: InputType.Amount, currency: base },
    ],
  };
  const getFormFieldValue = (type: InputType) => {
    return formData[type as keyof FormDataTypeObj] || "";
  };
  

  return (
    <div className={s.inputs}>
      {formConfig[form]?.map(({ type, currency }) => (

      <TradeFormInput
      key={Math.random()}
        value={getFormFieldValue(type)}
        transaction={transaction}
        currency={currency}
        type={type}
      />
    ))}
    </div>
  );
};

export default memo(InputsSet);
