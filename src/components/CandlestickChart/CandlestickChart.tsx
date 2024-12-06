
import s from './candlestick.module.scss'
import React, { useEffect, useRef} from "react";


type ChartProps = {
  token: string;
};

const TradingViewWidget: React.FC<ChartProps> = ({ token }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure the DOM is available
    if (!containerRef.current) return;

    // Clear previous script content if any
    containerRef.current.innerHTML = "";

    const pair = token.split("-").join("");

    // Dynamically load the script
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${pair}`,
      interval: "1",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      calendar: false,
      hide_side_toolbar: false,
    });

    // Append the script to the container
    containerRef.current.appendChild(script);
  }, [token]);

  return (
  <div className={s.container}>
          <div
        suppressHydrationWarning={true}
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
  </div>

   
  );
};

export default React.memo(TradingViewWidget);
