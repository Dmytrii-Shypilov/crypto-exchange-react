import s from "./trade-page.module.scss";

import { OrderFormProvider } from "../../context/TradeFormContext";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [streamedData, setStreamedData] =
    useState<StreamedTradeInfoType | null>(null);
  const { tradedPair } = useParams();
  const pair = tradedPair ?? "BTC-USDT";

  useEffect(() => {
    setIsLoading(true);
    const socket = new WebSocket(`ws://localhost:8000/trade/${pair}`);

    socket.onmessage = (event) => {
      const newStreamedData = JSON.parse(event.data);
      setStreamedData(newStreamedData);
      setIsLoading(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [pair]);

  return (
    <OrderFormProvider>
      <main>
        {isLoading && (
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
        {!isLoading && streamedData && (
          <section className={s.section}>
            <TradePageHead pair={pair} streamedInfo={streamedData.coinsInfo} />
            <div className={s.trio_wrapper}>
              <OrderBook streamedInfo={streamedData} pair={pair} />
              <div className={s.chart_form_wrapper}>
                <TradingViewWidget token={pair} />
                <OrderForm pair={pair} />
              </div>
              <CoinsPairs />
            </div>
            <MyOrders />
          </section>
        )}
      </main>
    </OrderFormProvider>
  );
};

export default TradePage;
