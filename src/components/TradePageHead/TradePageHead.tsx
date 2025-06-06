import s from "./head.module.scss";


import { StreamedTradeInfoType } from "../../constants";
import { formatNumber } from "../../utils/helpers";
import PriceIndicator from "../PriceIndicator/PriceIndicator";
import StarButton from "../StarButton/StarButton";


type TradePageHeadProps = {
  pair: string;
  streamedInfo: StreamedTradeInfoType["coinsInfo"];
};

const TradePageHead: React.FC<TradePageHeadProps> = ({
  pair,
  streamedInfo,
}) => {
  const [base, quote] = pair.split("-");
  const formatedInfo = formatNumber.formatTradeNums(streamedInfo, ['priceChange',"priceChangePercent"]);
  const changeSign = formatedInfo.priceChange.startsWith("-") ? "-" : "+";
  

  const className = changeSign === "+" ? s.price_change : s.price_change_neg;

  return (
    <div className={s.head}>
      <span className={s.icon}>
       <StarButton size='25' pair={`${base}/${quote}`}/> 
      </span>
      <span className={s.pair}>{`${base}/${quote}`}</span>
      <div className={s.price}>
        <PriceIndicator price={formatedInfo.lastPrice} icon={false} />
      </div>
      <ul className={s.list}>
        <li className={s.list_item}>
          <span className={s.title}>24h Change</span>
          <div className={className}>
            <span className={s.figure}>{formatedInfo.priceChange}</span>
            <span className={s.percents}>{formatedInfo.priceChangePercent}%</span>
          </div>
        </li>
        <li className={s.list_item}>
          <span className={s.title}>24h High</span>
          <span className={s.figure}>{formatedInfo.highPrice}</span>
        </li>
        <li className={s.list_item}>
          <span className={s.title}>24h Low</span>
          <span className={s.figure}>{formatedInfo.lowPrice}</span>
        </li>
        <li className={s.list_item}>
          <span className={s.title}>24h Volume{` (${base})`}</span>
          <span className={s.figure}>{formatedInfo.baseVolume}</span>
        </li>
        <li className={s.list_item}>
          <span className={s.title}>24h Volume{` (${quote})`}</span>
          <span className={s.figure}>{formatedInfo.quoteVolume}</span>
        </li>
      </ul>
    </div>
  );
};

export default TradePageHead;
