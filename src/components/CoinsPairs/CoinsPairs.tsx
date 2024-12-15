
import s from "./pairs.module.scss";

import { ChangeEvent, useState } from "react";
import { Icons } from "../SVGIcons/icons";
import { useNavigate } from "react-router-dom";

const CoinsPairs = () => {
  const [tab, setTab] = useState<string>("BTC");
  const [searched, setSearched] = useState<string>('')
  // const [fetched, setFetched] = useState({})

  const navigate = useNavigate()

  const getClassName = (coin: string) => {
    return tab === coin ? s.currency_active : s.currency;
  };
  const getTabClass = (tabVal: string) => {
    return tabVal === tab ? s.fav_icon_active : s.fav_icon;
  };

  const onSearchedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value)
  }
  
  return (
    <div className={s.pairsBlock}>
      <div className={s.tabs}>
        <div>
          <input onChange={onSearchedChange} value={searched} className={s.search_input} type="text" />
        </div>
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
            <span onClick={()=> navigate('/trade/LUNC-USDT')}>LUNC/USDT</span>
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
