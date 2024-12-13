"use client";

import s from "./set.module.scss";
import { Form, InputType, Transaction, FormDataTypeObj } from "../../../constants";
import TradeFormInput from "../../ui/TradeFormInput/TradeFormInput";

type InputsSetProps = {
  set: Form;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  pair: string;
  transaction: Transaction;
  formData: FormDataTypeObj
};

const InputsSet: React.FC<InputsSetProps> = ({
  set,
  onChange,
  pair,
  transaction,
  formData,
}) => {
  const [base, quote] = pair.split("-");

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
      {formConfig[set]?.map(({ type, currency }) => (

      <TradeFormInput
        key={type}
        value={getFormFieldValue(type)}
        transaction={transaction}
        currency={currency}
        type={type}
        onChange={onChange}
      />
    ))}
    </div>
  );
};

export default InputsSet;
