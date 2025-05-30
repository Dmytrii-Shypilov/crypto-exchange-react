import s from "./pairs.module.scss";

import { ChangeEvent, useState, useEffect, memo } from "react";
import { Icons } from "../SVGIcons/icons";
import { useNavigate } from "react-router-dom";
import { coinsAPI } from "../../api/coinsAPI";
import { TradedPairsResponseType } from "../../constants";
import { getFavCoins } from "../../redux/coins/coins-selector";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getFavoritePairs } from "../../redux/coins/coins-operations";
import StarButton from "../StarButton/StarButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const CoinsPairs = () => {
  const [tab, setTab] = useState<string>("BTC");
  const [searched, setSearched] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetched, setFetched] = useState<TradedPairsResponseType>({
    tradedPairs: [],
  });
  const { favs } = useSelector(getFavCoins);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (tab !== "FAV") {
      const getCoinsInfo = async () => {
        setIsLoading(true);
        const coinsInfo = await coinsAPI.fetchTradedCoins(tab);
        dispatch(getFavoritePairs());
        setIsLoading(false);
        setFetched(coinsInfo);
      };
    
      getCoinsInfo();
     
    }
   
  }, [tab, dispatch]);

  // Filter pairs based on the search input
  const filteredPairs = fetched.tradedPairs.filter((el) =>
    el.pair.toLowerCase().includes(searched.toLowerCase())
  );

  // Filter favorite coins based on the search input
  const filteredFavCoins = (favs || []).filter((el) =>
    el.toLowerCase().includes(searched.toLowerCase())
  );

  const getClassName = (coin: string) => {
    return tab === coin ? s.currency_active : s.currency;
  };
  const getTabClass = (tabVal: string) => {
    return tabVal === tab ? s.fav_icon_active : s.fav_icon;
  };

  const onSearchedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  const onTabChange = (tab: string) => {
    setTab(tab);
    setSearched("");
  };

  const pairsElements = filteredPairs.map((el) => {
    const coinParam = el.pair.split("/").join("-");
    const isChangeDown = el.change.startsWith("-");
    return (
      <li className={s.pair} key={el.pair}>
        <span className={s.icon}>
          <StarButton pair={el.pair} size={"20px"} />
        </span>
        <span
          className={s.pair_name}
          onClick={() => navigate(`/trade/${coinParam}`)}
        >
          {el.pair}
        </span>
        <span className={s.price}>{el.lastPrice}</span>
        <span className={isChangeDown ? s.change_red : s.change}>
          {el.change + "%"}
        </span>
      </li>
    );
  });

  const favCoinsElements = filteredFavCoins.map((el) => {
    const coinParam = el.split("/").join("-");
    return (
      <li key={el} className={s.pair_fav}>
        <span className={s.icon}>
          <StarButton size="20px" pair={el} />
        </span>
        <span
          onClick={() => navigate(`/trade/${coinParam}`)}
          className={s.pair_name}
        >
          {el}
        </span>
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
          <li
            className={getClassName("BTC")}
            onClick={onTabChange.bind(null, "BTC")}
          >
            BTC
          </li>
          <li
            className={getClassName("ETH")}
            onClick={onTabChange.bind(null, "ETH")}
          >
            ETH
          </li>
          <li
            className={getClassName("USDT")}
            onClick={onTabChange.bind(null, "USDT")}
          >
            USDT
          </li>
        </ul>

        <span
          className={getTabClass("FAV")}
          onClick={onTabChange.bind(null, "FAV")}
        >
          <Icons.StarIcon />
        </span>
      </div>

      <ul className={s.pairs_list}>
        {isLoading && <LoadingSpinner size="30px" />}
        {!isLoading && (tab === "FAV" ? favCoinsElements : pairsElements)}
      </ul>
    </div>
  );
};

export default memo(CoinsPairs);
