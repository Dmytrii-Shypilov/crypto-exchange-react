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
  const { formData, onFormSubmit, isLoading} = useFormData()


  return (
    <form className={s.form} onSubmit={onFormSubmit.bind(null, `${base}/${quote}`)}>
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
     
          <button id='buy' className={s.buy_btn}>{isLoading.value && isLoading.transaction === 'buy'? 'Posting...' :`Buy ${base}`}</button>
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
          <button id='sell'  className={s.sell_btn}>{isLoading.value && isLoading.transaction === 'sell'? 'Posting...' :`Sell ${base}`}</button>
        </div>
      </div>
    </form>
  );
};

export default memo(OrderForm);
