"use client";

import s from "./set.module.scss";
import { Form, InputType, Transaction } from "../../../constants";
import TradeFormInput from "../../ui/Input/TradeFormInput";


type InputsSetProps = {
  set: Form;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  pair: string;
  transaction: Transaction;
  formData: {limit: string, amount: string, price: string, stop: string, total: string, };
  };


const InputsSet: React.FC<InputsSetProps> = ({
  set,
  onChange,
  pair,
  transaction,
  formData,
}) => {
  const [base, quote] = pair.split("-");

  const renderTradeFormInput = (
    type: InputType,
    currency: string,
    value: string
  ) => (
    <TradeFormInput
      value={value}
      transaction={transaction}
      currency={currency}
      type={type}
      onChange={onChange}
    />
  );

  return (
    <div className={s.inputs}>
      {set === Form.Limit && (
        <>
          {renderTradeFormInput(InputType.Price, quote, formData.price)}
          {renderTradeFormInput(InputType.Amount, base, formData.amount)}
        </>
      )}

      {set === Form.Market && (
        <>
          {renderTradeFormInput(
            transaction === Transaction.Buy
              ? InputType.Total
              : InputType.Amount,
            transaction === Transaction.Buy ? quote : base,
            transaction === Transaction.Buy ? formData.total : formData.amount
          )}
        </>
      )}
      {set === Form.StopLimit && (
        <>
          {renderTradeFormInput(InputType.Stop, quote, formData.stop)}
          {renderTradeFormInput(InputType.Limit, quote, formData.limit)}
          {renderTradeFormInput(InputType.Amount, base, formData.amount)}
        </>
      )}
      {set === Form.StopMarket && (
        <>
          {renderTradeFormInput(InputType.Stop, quote, formData.stop)}
          {renderTradeFormInput(InputType.Amount, base, formData.amount)}
        </>
      )}
    </div>
  );
};

export default InputsSet;
