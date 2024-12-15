import s from "./tabs.module.scss";

import { useState } from "react";
import { useFormData } from "../../../hooks/useFormData";
import { Form } from "../../../constants";

const FormTabs: React.FC = () => {
  const [isDropped, setIsDropped] = useState(false);
  const {form, onTabChange} = useFormData()

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
        onClick={() => onTabChange(Form.Limit)}
      >
        Limit
      </span>
      <span
        onClick={() => onTabChange(Form.Market)}
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
          onClick={() => onTabChange(Form.StopLimit)}
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
              onClick={() => onTabChange(Form.StopLimit)}
            >
              Stop Limit
            </span>
            <span
              className={getDroppedClass(Form.StopMarket)}
              onClick={() => onTabChange(Form.StopMarket)}
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
