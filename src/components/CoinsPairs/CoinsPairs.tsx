import s from "./pairs.module.scss";

import { ChangeEvent, useState, useEffect, memo } from "react";
import { Icons } from "../SVGIcons/icons";
import { useNavigate } from "react-router-dom";
import { coinsAPI } from "../../api/coinsAPI";
import { TradedPairsResponseType } from "../../constants";
import { getFavCoins } from "../../redux/coins/coins-selector";
import { useSelector, useDispatch } from "react-redux";
import { setFavoriteCoins } from "../../redux/coins/coins-slice";
import StarButton from "../StarButton/StarButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const CoinsPairs = () => {
  const [tab, setTab] = useState<string>("BTC");
  const [searched, setSearched] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fetched, setFetched] = useState<TradedPairsResponseType>({
    tradedPairs: [],
    favCoins: [],
  });
  const favoriteCoins = useSelector(getFavCoins);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tab !== "FAV") {
      const getCoinsInfo = async () => {
        setIsLoading(true)
        const coinsInfo = await coinsAPI.fetchTradedCoins(tab);
        setFetched(coinsInfo);
        setIsLoading(false)
        
      };
     
      getCoinsInfo();
     
    }
  }, [tab]);

  useEffect(() => {
    dispatch(setFavoriteCoins(fetched.favCoins));
  }, [tab, dispatch, fetched]);

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
    const isChangeDown = el.change.startsWith('-')
    return (
      <li
        className={s.pair}
        key={el.pair}
      >
        <span className={s.icon}>
          <StarButton pair={el.pair} size={'20px'}/>
        </span>
        <span className={s.pair_name}  onClick={() => navigate(`/trade/${coinParam}`)}>{el.pair}</span>
        <span className={s.price}>{el.lastPrice}</span>
        <span className={isChangeDown? s.change_red : s.change}>{el.change + "%"}</span>
      </li>
    );
  });

  const favCoinsElements = favoriteCoins.map((el) => {
    const coinParam = el.split("/").join("-");
    return (
      <li key={el} className={s.pair_fav}>
        <span className={s.icon}>
          <StarButton size='25px' pair={el}/>
        </span>
        <span onClick={() => navigate(`/trade/${coinParam}`)} className={s.pair_name}>{el}</span>
      </li>
    );
  });

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

      <ul className={s.pairs_list}>
        {isLoading && <LoadingSpinner/>}
        {!isLoading && (tab === "FAV" ? favCoinsElements : pairsElements)}
      </ul>
    </div>
  );
};

export default memo(CoinsPairs);
