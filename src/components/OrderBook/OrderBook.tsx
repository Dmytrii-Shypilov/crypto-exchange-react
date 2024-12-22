import s from "./order-book.module.scss";

import { StreamedTradeInfoType } from "../../constants";
import PriceIndicator from "../PriceIndicator/PriceIndicator";
import { formatNumber } from "../../utils/helpers";
import { useFormData } from "../../hooks/useFormData";

type OrderBookProps = {
  pair: string;
  streamedInfo: StreamedTradeInfoType;
};

const OrderBook: React.FC<OrderBookProps> = ({ pair, streamedInfo }) => {
  const [base, quote] = pair.split("-");

  const { setChoosenPrice } = useFormData();

  const choosePrice = (price: string) => {
    const formatted = formatNumber.removeExtraZeros(price);
    setChoosenPrice(formatted);
  };

  const bids = streamedInfo.orderBook["bids"].map((data, idx) => {
    const total = formatNumber.abreviateNumber(
      Number(data[0]) * Number(data[1])
    );

    return (
      <li key={idx} className={s.bid_order}>
        <span className={s.cell} onClick={() => choosePrice(data[0])}>
          {formatNumber.removeExtraZeros(data[0])}
        </span>
        <span className={s.cell}>{formatNumber.abreviateNumber(data[1])}</span>
        <span className={s.cell}>{total}</span>
      </li>
    );
  });

  const asks = streamedInfo.orderBook["asks"].reverse().map((data, idx) => {
    const total = formatNumber.abreviateNumber(
      Number(data[0]) * Number(data[1])
    );
    return (
      <li key={idx} className={s.ask_order}>
        <span className={s.cell} onClick={() => choosePrice(data[0])}>
          {formatNumber.removeExtraZeros(data[0])}
        </span>
        <span className={s.cell}>{formatNumber.abreviateNumber(data[1])}</span>
        <span className={s.cell}>{total}</span>
      </li>
    );
  });

  return (
    <div className={s.book}>
      <span className={s.name}>Order Book</span>

      <div className={s.tables}>
        <ul className={s.head}>
          <li className={s.cell}>Price{` (${quote})`}</li>
          <li className={s.cell}>Amount{` (${base})`}</li>
          <li className={s.cell}>Total</li>
        </ul>

        <ul>{bids}</ul>
        <div className={s.price_display}>
          <PriceIndicator
            price={formatNumber.convertToUs(streamedInfo.coinsInfo.lastPrice)}
            icon={true}
          />
        </div>
        <ul>{asks}</ul>
      </div>
    </div>
  );
};

export default OrderBook;
