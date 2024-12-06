import s from "./trade-page.module.scss";

// import { useState } from "react";

// import Container from "@/components/Container/Container";
import TradePageHead from "../../components/TradePageHead/TradePageHead";
import TradingViewWidget from "../../components/CandlestickChart/CandlestickChart";
import OrderBook from "../../components/OrderBook/OrderBook";
import OrderForm from "../../components/OrderForm/OrderForm";
import MyOrders from "../../components/MyOrders/MyOrders";
import CoinsPairs from "../../components/CoinsPairs/CoinsPairs";

import { useParams } from "react-router-dom";

const TradePage: React.FC = () => {
  const { tradedPair } = useParams();
  const pair = tradedPair ?? "BTC-USDT";

  return (
    <main>
      <section className={s.section}>
        <TradePageHead pair={pair} />
        <div className={s.trio_wrapper}>
          <OrderBook pair={pair} />
          <div className={s.chart_form_wrapper}>
            <TradingViewWidget token={pair} />
            <OrderForm pair={pair} />
          </div>
          <CoinsPairs />
        </div>
        <MyOrders />
      </section>
    </main>
  );
};

export default TradePage;
