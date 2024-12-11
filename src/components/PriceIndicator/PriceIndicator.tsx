import s from "./price.module.scss";
import { Icons } from "../SVGIcons/icons";
import { useState, useEffect } from "react";

interface PriceIndicatorProps {
  price: string;
  icon: boolean;
}

const PriceIndicator: React.FC<PriceIndicatorProps> = ({ price, icon }) => {
  const [config, setConfig] = useState<{
    move: "up" | "down";
    color: string;
    price: string;
  }>({ move: "up", color: "", price: "" });

  useEffect(() => {
    const colors = {
      green: "#01bc8d",
      red: "#f66754",
    };

    setConfig((prevState) => {
      const previousPrice = Number(prevState.price.replace(',',''));
      const currentPrice = Number(price.replace(',',''))

      if (prevState.price === price) { 
        return prevState;
      }

      return {
        move: currentPrice > previousPrice ? "up" : "down",
        color: currentPrice > previousPrice ? colors.green : colors.red,
        price, 
      };
    });
  }, [price]);

  return (
    <div className={s.price} style={{color: config.color}}>
      <span>{price}</span>
      {icon && <Icons.ArrowIcon type={config.move} fill={config.color} />}
    </div>
  );
};

export default PriceIndicator;
