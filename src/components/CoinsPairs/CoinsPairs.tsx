import s from "./pairs.module.scss";

import { ChangeEvent, useState, useEffect, memo } from "react";
import { Icons } from "../SVGIcons/icons";
import { useNavigate } from "react-router-dom";
import { coinsAPI } from "../../api/coinsAPI";
import { TradedPairsResponseType } from "../../constants";


const CoinsPairs = () => {
  const [tab, setTab] = useState<string>("BTC");
  const [searched, setSearched] = useState<string>("");
  const [fetched, setFetched] = useState<
    TradedPairsResponseType
  >({tradedPairs: [], favCoins: []});

  const navigate = useNavigate();

  useEffect(() => {
    const getCoinsInfo = async () => {
      if (tab !== 'FAV') {
        const coinsInfo = await coinsAPI.fetchFavoriteCoins(tab);
        setFetched(coinsInfo);
      } else {
      return
      }
      
    };
    getCoinsInfo();
  }, [tab]);

  const getClassName = (coin: string) => {
    return tab === coin ? s.currency_active : s.currency;
  };
  const getTabClass = (tabVal: string) => {
    return tabVal === tab ? s.fav_icon_active : s.fav_icon;
  };

  const onSearchedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  const pairsElements = fetched.tradedPairs.map((el) => {
    const coinParam = el.pair.split("/").join("-");
    return (
      <li className={s.pair}>
        <span onClick={() => navigate(`/trade/${coinParam}`)}>
          {el.pair}
          <span className={s.icon}>
            <Icons.StarIcon />
          </span>
        </span>
        <span>{el.lastPrice}</span>
        <span>{el.change + "%"}</span>
      </li>
    );
  });

  const favCoinsElements = fetched.favCoins.map((el)=> {
    return <li className={s.pair}><span><Icons.StarIcon/></span><span>{el}</span></li>
  })

  return (
    <div className={s.pairsBlock}>
      <div className={s.search_field}>
        <input
          onChange={onSearchedChange}
          value={searched}
          className={s.search_input}
          type="text"
          placeholder={`Search for ${tab}`}
        />
        <span className={s.search_icon}>
          <Icons.SearchIcon />
        </span>
      </div>
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

        <span className={getTabClass("FAV")} onClick={() => setTab("FAV")}>
          <Icons.StarIcon />
        </span>
      </div>

      <ul className={s.pairs_list}>{tab === 'FAV'? favCoinsElements: pairsElements}</ul>
    </div>
  );
};

export default memo(CoinsPairs);
