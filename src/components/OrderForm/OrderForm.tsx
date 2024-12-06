"use client";

import s from "./form.module.scss";
import InputsSet from "./InputsSet/InputsSet";
import FormTabs from "./FormTabs/FormTabs";
import { useState } from "react";
import { Form, Transaction, FormDataType } from "../../constants";

const InitState = {
  buy: {
    price: "",
    amount: "",
    stop: "",
    limit: "",
    total: "",
  },
  sell: {
    price: "",
    amount: "",
    stop: "",
    limit: "",
    total: "",
  },
};

const OrderForm: React.FC<{ pair: string }> = ({ pair }) => {
  const [form, setForm] = useState<Form>(Form.Limit);
  const [formData, setFormData] = useState<FormDataType>(InitState);
  const [base, quote] = pair.split("-");


  const onTabChange = (tabName: Form) => {
    setFormData(InitState)
    setForm(tabName)
  }

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

  return (
    <form className={s.form} action="">
      <FormTabs form={form} setForm={onTabChange} />
      <div className={s.fields}>
        <div className={s.fields_block}>
          <InputsSet
            pair={pair}
            transaction={Transaction.Buy}
            set={form}
            onChange={onFormChange}
            formData={formData.buy}
          />

          <div>
            <div className={s.balance}>
              <span>Avbl</span>
              <span>{`-- ${quote}`}</span>
            </div>
            <div className={s.balance}>
              <span>MaxBuy</span>
              <span>{`-- ${base}`}</span>
            </div>
          </div>
          <button className={s.buy_btn}>{`Buy ${base}`}</button>
        </div>
        <div className={s.fields_block}>
          <div>
            <InputsSet
              pair={pair}
              transaction={Transaction.Sell}
              set={form}
              onChange={onFormChange}
              formData={formData.sell}
            />

            <div className={s.balance}>
              <span>Avbl</span>
              <span>{`-- ${base}`}</span>
            </div>
            <div className={s.balance}>
              MaxSell<span></span>
              <span>{`-- ${quote}`}</span>
            </div>
          </div>
          <button className={s.sell_btn}>{`Sell ${base}`}</button>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
