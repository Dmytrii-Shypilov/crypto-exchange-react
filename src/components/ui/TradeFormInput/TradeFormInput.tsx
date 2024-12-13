import s from "./trade-input.module.scss";

import { useState, useEffect } from "react";
import { Icons } from "../../SVGIcons/icons";
import { InputType, Transaction } from "../../../constants";

type InputProps = {
  currency: string;
  type: InputType;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  transaction: Transaction;
};

// ChangeEvent<HTMLInputElement>

const TradeFormInput: React.FC<InputProps> = ({
  currency,
  type,
  transaction,
  value,
  onChange,
}) => {
const [inputValue, setInputValue] = useState('')

useEffect(() => {
  setInputValue(value);
}, [value]);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const paddingRight = currency.length > 3 ? "80px" : "70px";

  const onClickChange = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget as HTMLSpanElement;
    if (inputValue && !isNaN(Number(inputValue))) {
      const newValue =
        target.id === "increment"
          ? String(Number(inputValue) + 1)
          : String(Number(inputValue) - 1);

      setInputValue(newValue);
      const syntheticEvent = {
        target: {
          id: transaction, 
          name: type, 
          value: newValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
  
      onChange(syntheticEvent); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update local state
    onChange(e); // Update parent state
  };

  return (
    <div className={s.input}>
      <span className={s.type}>{capitalizeFirstLetter(type)}</span>
      <input
        value={inputValue}
        id={transaction}
        name={type}
        className={s.input_field}
        type="number"
        style={{ paddingRight }}
        onChange={handleInputChange}
      />
      <span className={s.curr_ind}>{currency}</span>
      <div className={s.side_btn_panel}>
        <span id='increment' className={s.side_btn} onClick={onClickChange}>
          <Icons.TriangleArrowIcon transform="rotate(180, 0, 0)" />
        </span>
        <span id='decrement' className={s.side_btn} onClick={onClickChange}>
          <Icons.TriangleArrowIcon />
        </span>
      </div>
    </div>
  );
};

export default TradeFormInput;
