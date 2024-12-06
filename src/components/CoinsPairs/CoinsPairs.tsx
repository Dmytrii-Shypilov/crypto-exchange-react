
import s from "./pairs.module.scss";

import { useState } from "react";
import { Icons } from "../SVGIcons/icons";

const CoinsPairs = () => {
  const [tab, setTab] = useState<string>("BTC");

  const getClassName = (coin: string) => {
    return tab === coin ? s.currency_active : s.currency;
  };
  const getTabClass = (tabVal: string) => {
    return tabVal === tab ? s.fav_icon_active : s.fav_icon;
  };
  return (
    <div className={s.pairsBlock}>
      <div className={s.tabs}>
        <ul className={s.curr_list}>
          <li className={getClassName("BTC")} onClick={() => setTab("BTC")}>
            BTC
          </li>
          <li className={getClassName("ETH")} onClick={() => setTab("ETH")}>
            ETH
          </li>
          <li className={getClassName("USDT")} onClick={() => setTab("USDT")}>
            USDT
          </li>
        </ul>

        <span className={getTabClass('FAV')} onClick={() => setTab("FAV")}>
          <Icons.StarIcon />
        </span>
      </div>

      <ul className={s.pairs_list}>
        <li className={s.pair}>
          <div className={s.star_pair}>
            <span className={s.icon}>
              <Icons.StarIcon />
            </span>
            <span>BTC/USDT</span>
          </div>

          <span>-26%</span>
        </li>
        <li className={s.pair}>
          <div className={s.star_pair}>
            <span className={s.icon}>
              <Icons.StarIcon />
            </span>
            <span>BTC/USDT</span>
          </div>

          <span>-26%</span>
        </li>
        <li className={s.pair}>
          <div className={s.star_pair}>
            <span className={s.icon}>
              <Icons.StarIcon />
            </span>
            <span>BTC/USDT</span>
          </div>

          <span>-26%</span>
        </li>
      </ul>
    </div>
  );
};

export default CoinsPairs;
