"use client";

import s from "./trade-input.module.scss";

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
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const paddingRight = currency.length > 3 ? "80px" : "70px";

  return (
    <div className={s.input}>
      <span className={s.type}>{capitalizeFirstLetter(type)}</span>
      <input
        value={value}
        id={transaction}
        name={type}
        className={s.input_field}
        type="number"
        style={{ paddingRight }}
        onChange={onChange}
      />
      <span className={s.curr_ind}>{currency}</span>
      <div className={s.side_btn_panel}>
        <span className={s.side_btn}>
          <Icons.TriangleArrowIcon transform="rotate(180, 0, 0)" />
        </span>
        <span className={s.side_btn}>
          <Icons.TriangleArrowIcon />
        </span>
      </div>
    </div>
  );
};

export default TradeFormInput;
