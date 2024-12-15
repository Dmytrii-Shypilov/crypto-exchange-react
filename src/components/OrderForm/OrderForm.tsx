import s from "./form.module.scss";
import InputsSet from "./InputsSet/InputsSet";
import FormTabs from "./FormTabs/FormTabs";
import {   memo } from "react";
import { useFormData } from "../../hooks/useFormData";
import {  Transaction } from "../../constants";




const OrderForm: React.FC<{ pair: string}> = ({
  pair,
}) => {

  const [base, quote] = pair.split("-");
  const { formData} = useFormData()

console.log("Form")
  return (
    <form className={s.form} action="">
      <FormTabs  />
      <div className={s.fields}>
        <div className={s.fields_block}>
          <InputsSet
            pair={pair}
            transaction={Transaction.Buy}
            formData={formData.buy}
          />

            <div className={s.balance}>
              <span>Avbl</span>
              <span>{`-- ${quote}`}</span>
            </div>
     
          <button className={s.buy_btn}>{`Buy ${base}`}</button>
        </div>
        <div className={s.fields_block}>
          <div>
            <InputsSet
              pair={pair}
              transaction={Transaction.Sell}
              formData={formData.sell}
            />

            <div className={s.balance}>
              <span>Avbl</span>
              <span>{`-- ${base}`}</span>
            </div>
       
          </div>
          <button className={s.sell_btn}>{`Sell ${base}`}</button>
        </div>
      </div>
    </form>
  );
};

export default memo(OrderForm);
