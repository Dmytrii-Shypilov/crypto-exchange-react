"use client";

import s from "./tabs.module.scss";

import { useState } from "react";
import { Form } from "../../../constants";

const FormTabs: React.FC<{
  form: string;
  setForm: (tabName: Form) => void;
}> = ({ form, setForm }) => {
  const [isDropped, setIsDropped] = useState(false);

  const getTabClass = (tabVal: Form) => {
    return tabVal === form ? s.tabs_list_item_active : s.tabs_list_item;
  };
  const getDroppedClass = (tabVal: Form) => {
    return tabVal === form ? s.dropMenu_item_active : s.dropMenu_item;
  };

  return (
    <div className={s.tabs_list}>
      <span
        className={getTabClass(Form.Limit)}
        onClick={() => setForm(Form.Limit)}
      >
        Limit
      </span>
      <span
        onClick={() => setForm(Form.Market)}
        className={getTabClass(Form.Market)}
      >
        Market
      </span>
      <div
        className={s.dropMenu_wrapper}
        onMouseEnter={() => setIsDropped(true)}
        onMouseLeave={() => setIsDropped(false)}
      >
        <span
          onClick={() => setForm(Form.StopLimit)}
          className={getTabClass(
            form === Form.StopLimit ? Form.StopLimit : Form.StopMarket
          )}
        >
          {form.includes("Stop") ? form : Form.StopLimit}
        </span>
        {isDropped && (
          <div className={s.dropMenu}>
            <span
              className={getDroppedClass(Form.StopLimit)}
              onClick={() => setForm(Form.StopLimit)}
            >
              Stop Limit
            </span>
            <span
              className={getDroppedClass(Form.StopMarket)}
              onClick={() => setForm(Form.StopMarket)}
            >
              Stop Market
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormTabs;
