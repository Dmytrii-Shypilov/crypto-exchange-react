import s from "./orders.module.scss";

import { useEffect, useState } from "react";
import { useFormData } from "../../hooks/useFormData";
import { tradeAPI } from "../../api/tradeAPI";

const  Orders = [
  {
    id: "1212",
    date: "23-12-2024",
    pair: "BTC/USDT",
    type: "limit",
    side: "sell",
    price: 900,
    amount: 10000,
    filled: 8000,
    total: 9000000,
  },
  {
    id: "3322",
    date: "23-12-2024",
    pair: "BTC/USDT",
    type: "limit",
    side: "buy",
    price: 900,
    amount: 10000,
    filled: 8000,
    total: 9000000,
  },
];

const executed = [
  {
    id: "1212",
    orderTime: "23-12-2024",
    pair: "BTC/USDT",
    type: "limit",
    side: "sell",
    price: 900,
    amount: 10000,
    executed: "23-12-2024",
    total: 9000000,
  },
  {
    id: "3322",
    orderTime: "23-12-2024",
    pair: "BTC/USDT",
    type: "limit",
    side: "buy",
    price: 900,
    amount: 10000,
    executed: "23-12-2024",
    total: 9000000,
  },
];

const MyOrders = () => {
  const [tab, setTab] = useState<string>("open");
  const [orders, setOrders] = useState<[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const isOpenOrder = tab === "open";

  const { isOrderPosted, setIsOrderPosted } = useFormData();

  useEffect(() => {
    if (isOrderPosted) {
      const getOrders = async () => {
        // setIsLoading(true);
        const orders = await tradeAPI.fetchOrders();
        setOrders(orders);
        // setIsLoading(false);
      };
      getOrders();
      setIsOrderPosted(false)
      console.log('orders fetched')
    }
  }, [isOrderPosted, setIsOrderPosted]);

  const names = [
    isOpenOrder ? "Date" : "Order Time",
    "Pair",
    "Type",
    "Side",
    "Price",
    "Amount",
    isOpenOrder ? "Filled" : "Executed",
    "Total",
    "Cancel",
  ];
  if (tab === "history") {
    names.pop();
  }
  const getTabClass = (curr: string) => (curr === tab ? s.tab_open : s.tab);
  return (
    <div className={s.orders_block}>
      <ul className={s.tab_list}>
        <li className={getTabClass("open")} onClick={() => setTab("open")}>
          {`Open Orders(${MyOrders.length})`}
        </li>
        <li
          className={getTabClass("history")}
          onClick={() => setTab("history")}
        >
          Trade History
        </li>
      </ul>
      <ul className={s.name_list}>
        {names.map((name) => (
          <li key={name} className={s.name}>
            {name}
          </li>
        ))}
      </ul>
      <ul className={s.order_list}>
        {Orders.map((order) => (
          <li key={order.id} className={s.order}>
            {isOpenOrder && <span className={s.order_item}>{order.date}</span>}
            {!isOpenOrder && (
              <span className={s.order_item}>{executed[0].orderTime}</span>
            )}
            <span className={s.order_item}>{order.pair}</span>
            <span className={s.order_item}>{order.type}</span>
            <span className={order.side === "buy" ? s.order_buy : s.order_sell}>
              {order.side}
            </span>
            <span className={s.order_item}>{order.price}</span>
            <span className={s.order_item}>{order.amount}</span>
            {isOpenOrder && (
              <span className={s.order_item}>{order.filled}</span>
            )}
            {!isOpenOrder && (
              <span className={s.order_item}>{executed[0].executed}</span>
            )}
            <span className={s.order_item}>{order.total}</span>
            {isOpenOrder && (
              <span id={order.id} className={s.btn}>
                cancel
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
