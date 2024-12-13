import s from "./order-book.module.scss";

import { StreamedTradeInfoType } from "../../constants";
import PriceIndicator from "../PriceIndicator/PriceIndicator";
import { formatNumber } from "../../utils/helpers";



type OrderBookProps = {
  pair: string;
  changeChoosenPrice: (price: string) => void;
  streamedInfo: StreamedTradeInfoType;
};

const OrderBook: React.FC<OrderBookProps> = ({
  pair,
  changeChoosenPrice,
  streamedInfo,
}) => {
  const [base, quote] = pair.split("-");

  const bids =streamedInfo.orderBook["bids"].map((data, idx) => {
    const total = formatNumber.abreviateNumber(Number(data[0]) * Number(data[1]))
    return (
      <tr key={idx} className={s.bid_order}>
        <th
          className={s.cell}
          onClick={() => changeChoosenPrice(Number(data[0]).toString())}
        >
          {Number(data[0]).toString()}
        </th>
        <th className={s.cell}>{formatNumber.abreviateNumber(data[1])}</th>
        <th className={s.cell}>{total}</th>
      </tr>
    );
  })

  const asks = streamedInfo.orderBook["asks"].reverse().map((data, idx) => {
    const total = formatNumber.abreviateNumber(Number(data[0]) * Number(data[1]))
    return (
      <tr key={idx} className={s.ask_order}>
        <th
          className={s.cell}
          onClick={() => changeChoosenPrice(Number(data[0]).toString())}
        >
         {Number(data[0]).toString()}
        </th>
        <th className={s.cell}>{formatNumber.abreviateNumber(data[1])}</th>
        <th className={s.cell}>{total}</th>
      </tr>
    );
  })

  return (
    <div className={s.book}>
      <span className={s.name}>Order Book</span>

      <div className={s.tables}>
        <table className={s.table}>
          <thead className={s.head}>
            <tr>
              <th className={s.cell}>Price{` (${quote})`}</th>
              <th className={s.cell}>Amount{` (${base})`}</th>
              <th className={s.cell}>Total</th>
            </tr>
          </thead>

          <tbody>
            {bids}
          </tbody>
        </table>
        <div className={s.price_display}>
          <PriceIndicator
            price={formatNumber.convertToUs(streamedInfo.coinsInfo.lastPrice)}
            icon={true}
          />
        </div>
        <table className={s.table}>
          <tbody>
            {asks}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
