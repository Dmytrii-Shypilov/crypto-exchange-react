import s from "./head.module.scss";

import { Icons } from "../SVGIcons/icons";

type TradePageHeadProps = {
  pair: string;
};

const TradePageHead: React.FC<TradePageHeadProps> = ({ pair }) => {
  const [base, quote] = pair.split("-");

  return (
    <div className={s.head}>
      <span className={s.icon}><Icons.StarIcon /></span>
      <span className={s.pair}>{`${base}/${quote}`}</span>
      <span className={s.price}>97,500</span>
      <ul className={s.list}>
        <li className={s.list_item}>
          <span className={s.title}>24h Change</span>
          <span className={s.figure}>10,000</span>
        </li>
        <li className={s.list_item}>
          <span className={s.title}>24h High</span>
          <span className={s.figure}>10,000</span>
        </li>
        <li className={s.list_item}>
          <span className={s.title}>24h Low</span>
          <span className={s.figure}>10,000</span>
        </li>
        <li className={s.list_item}>
          <span className={s.title}>24h Volume{` (${base})`}</span>
          <span className={s.figure}>10,000</span>
        </li>
        <li className={s.list_item}>
          <span className={s.title}>24h Volume{` (${quote})`}</span>
          <span className={s.figure}>10,000</span>
        </li>
      </ul>
    </div>
  );
};

export default TradePageHead;
