import s from "./form.module.scss";
import InputsSet from "./InputsSet/InputsSet";
import FormTabs from "./FormTabs/FormTabs";
import { useState, useEffect } from "react";
import { Form, Transaction, FormDataType } from "../../constants";

const forms = {
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


const OrderForm: React.FC<{ pair: string; choosenPrice: string }> = ({
  pair,
  choosenPrice,
}) => {
  const [form, setForm] = useState<Form>(Form.Limit);
  const [formData, setFormData] = useState<FormDataType>({
    buy: { price: "", amount: "" },
    sell: { price: "", amount: "" },
  });

  const [base, quote] = pair.split("-");

  useEffect(() => {
    setFormData({ buy: { ...forms[form] }, sell: { ...forms[form] }});
  }, [form]);

  useEffect(() => {
    setFormData((prevState) => {
      const updatedFields = ["price", "limit", "stop"].reduce(
        (state, field) => {
          if (field in prevState.buy) {
            state[field] = choosenPrice;
          }
          return state;
        },
        {} as Record<string, string>
      );
      return {
        buy: {
          ...prevState.buy,
          ...updatedFields,
        },
        sell: {
          ...prevState.sell,
          ...updatedFields,
        },
      };
    });
  }, [choosenPrice]);

  const onTabChange = (tabName: Form) => {
    setForm(tabName);
  };

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
