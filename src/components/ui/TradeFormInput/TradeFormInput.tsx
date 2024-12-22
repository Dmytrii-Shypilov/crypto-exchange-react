import s from "./trade-input.module.scss";

import { Icons } from "../../SVGIcons/icons";
import { InputType, Transaction } from "../../../constants";
import { doOperation} from "../../../utils/helpers";
import { useFormData } from "../../../hooks/useFormData";


type InputProps = {
  currency: string;
  type: InputType;
  value: string;
  transaction: Transaction;
};



const TradeFormInput: React.FC<InputProps> = ({
  currency,
  type,
  transaction,
  value,
}) => {

const {onFormChange}= useFormData()

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const paddingRight = currency.length > 3 ? "80px" : "70px";

  const onClickChange = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget as HTMLSpanElement;
    // if (value && !isNaN(Number(value))) {
      
  
      const updatedValue =
        target.id === "increment"
          ? doOperation(value, '+')
          : (Number(value) > 0? doOperation(value, '-') : '0')

      
      // setInputValue(updatedValue);
      const syntheticEvent = {
        target: {
          id: transaction, 
          name: type, 
          value: updatedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
  
      onFormChange(syntheticEvent); 
    // }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange(e)
  };

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
