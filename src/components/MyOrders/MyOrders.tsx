import s from "./orders.module.scss";

import { useEffect, useState } from "react";
import { useFormData } from "../../hooks/useFormData";
import { tradeAPI } from "../../api/tradeAPI";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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

type OrderType = {
  _id: string,
  orderTime: string,
  pair: string,
  type: string,
  transaction: string,
  price: string,
  amount: string,
  executed: string,
  total:string,
  filled: string
}

const MyOrders = () => {
  const [tab, setTab] = useState<string>("open");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isOpenOrder = tab === "open";

  const { isOrderPosted, setIsOrderPosted } = useFormData();

  useEffect(()=> {
    const getOrders = async () => {
      setIsLoading(true);
      const orders = await tradeAPI.fetchOrders();
      setOrders(orders);
      setIsLoading(false);
    };
    getOrders();
   
   
  }, [])

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

  const onOrderCancel = async(id: string) => {
    const result = await tradeAPI.cancelOrder(id)
    if (result?.deleted) {
      const filtered = orders.filter(el => el._id !== id)
      setOrders(filtered)
    }
  }


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
          {`Open Orders(${orders.length})`}
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
      {isLoading && <LoadingSpinner size={'25px'}/>}
      {!orders.length && !isLoading && <div className={s.placeholder}><span>No orders posted</span></div> }
      {!isLoading&&  <ul className={s.order_list}>
        {orders.map((order) => (
          <li key={order._id} className={s.order}>
            {isOpenOrder && <span className={s.order_item}>{order.orderTime}</span>}
            {!isOpenOrder && (
              <span className={s.order_item}>{executed[0].orderTime}</span>
            )}
            <span className={s.order_item}>{order.pair}</span>
            <span className={s.order_item}>{order.type}</span>
            <span className={order.transaction === "buy" ? s.order_buy : s.order_sell}>
              {order.transaction}
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
              <span id={order._id} className={s.btn} onClick={onOrderCancel.bind(null, order._id)}>
                cancel
              </span>
            )}
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default MyOrders;
