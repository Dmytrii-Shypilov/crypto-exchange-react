"use client";

import s from "./order-book.module.scss";

import { Dispatch, SetStateAction } from "react";
import { priceData } from "../../service/dummy-data";
import { Icons } from "../SVGIcons/icons";

type OrderBookProps = {
  pair: string;
  setChoosenPrice: Dispatch<SetStateAction<string>>
};

const OrderBook: React.FC<OrderBookProps> = ({ pair, setChoosenPrice }) => {
  const [base, quote] = pair.split("-");

  // const getTradedSum = (position: 'bids' | 'asks') => {
  //   if (!priceData[position] || !Array.isArray(priceData[position])) {
  //     throw new Error(`Invalid data for position: ${position}`);
  //   }
    
  //   return priceData[position].reduce((acc, curr) => {
  //     const value = curr[1];
  //     if (typeof value !== 'number') {
  //       throw new Error(`Invalid data format: expected number but got ${typeof value}`);
  //     }
  //     return acc + value;
  //   }, 0);
  // };
  

  return (
    <div className={s.book}>
      <span className={s.name}>Order Book</span>

      <div className={s.tables}>
        <table className={s.table}>
          <thead className={s.head}>
            <tr>
              <th className={s.cell} >Price{` (${quote})`}</th>
              <th className={s.cell}>Amount{` (${base})`}</th>
              <th className={s.cell}>Total{` (${base})`}</th>
            </tr>
          </thead>
          <tbody>
            {priceData["asks"].map((data, idx) => {
              return (
                <tr key={idx} className={s.ask_order}>
                  <th className={s.cell} onClick={()=>setChoosenPrice(data[0])}>{data[0]}</th>
                  <th className={s.cell}>{data[1]}</th>
                  <th className={s.cell}>
                    {Number(data[0]) * Number(data[1])}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={s.price_display}>
          <span
            className={s.price}
            style={{
              color: priceData.changedUp ? "#31D0AA" : "rgb(246, 103, 84)",
            }}
          >
            97,500
          </span>
          <Icons.ArrowIcon fill={"#31D0AA"} />
        </div>
        <table className={s.table}>
          <tbody>
            {priceData["bids"].map((data, idx) => {
              return (
                <tr key={idx} className={s.bid_order}>
                  <th className={s.cell} onClick={()=>setChoosenPrice(data[0])}>{data[0]}</th>
                  <th className={s.cell}>{data[1]}</th>
                  <th className={s.cell}>
                    {Number(data[0]) * Number(data[1])}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className={s.status_bar}>
        <span className={s.buy_perc}></span>
        <div className={s.bar}>
          <span className={s.bar_buy}></span>
          <span className={s.bar_sell}></span>
        </div>
        <span className={s.sell_perc}></span>
      </div> */}
    </div>
  );
};

export default OrderBook;
