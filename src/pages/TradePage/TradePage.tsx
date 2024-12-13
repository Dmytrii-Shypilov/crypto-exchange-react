import s from "./trade-page.module.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StreamedTradeInfoType } from "../../constants";
import TradePageHead from "../../components/TradePageHead/TradePageHead";
import TradingViewWidget from "../../components/CandlestickChart/CandlestickChart";
import OrderBook from "../../components/OrderBook/OrderBook";
import OrderForm from "../../components/OrderForm/OrderForm";
import MyOrders from "../../components/MyOrders/MyOrders";
import CoinsPairs from "../../components/CoinsPairs/CoinsPairs";

const TradePage: React.FC = () => {
  const [choosenPrice, setChoosenPrice] = useState("");
  const [streamedtData, setStreamedData] =
    useState<StreamedTradeInfoType | null>(null);
  const { tradedPair } = useParams();
  const pair = tradedPair ?? "BTC-USDT";

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/trade/${tradedPair}`);
    socket.onmessage = (event) => {
      const newStreamedData = JSON.parse(event.data);
      setStreamedData(newStreamedData);
    };

    return () => {
      socket.close();
    };
  }, [tradedPair]);

  const changeChoosenPrice = (price: string) => {
    setChoosenPrice(price);
  };

  return (
    <main>
      {!streamedtData && (
        <div
          style={{
            height: "100%",
            width: "100%",
            textAlign: "center",
            fontSize: 30,
          }}
        >
          LOADING....
        </div>
      )}
      {streamedtData && (
        <section className={s.section}>
          <TradePageHead pair={pair} streamedInfo={streamedtData.coinsInfo} />
          <div className={s.trio_wrapper}>
            <OrderBook
              streamedInfo={streamedtData}
              pair={pair}
              changeChoosenPrice={changeChoosenPrice}
            />
            <div className={s.chart_form_wrapper}>
              <TradingViewWidget token={pair} />
              <OrderForm pair={pair} choosenPrice={choosenPrice} />
            </div>
            <CoinsPairs />
          </div>
          <MyOrders />
        </section>
      )}
    </main>
  );
};

export default TradePage;
