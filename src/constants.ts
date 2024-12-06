export enum Form {
  Limit = "Limit",
  Market = "Market",
  StopLimit = "Stop Limit",
  StopMarket = "Stop Market",
}

export enum Transaction {
  Sell = "sell",
  Buy = "buy",
}

export const enum InputType {
  Stop = "stop",
  Limit = "limit",
  Amount = "amount",
  Total = "total",
  Price = "price",
}

export type FormDataType = {
  buy: {
    price: string;
    amount: string;
    stop: string;
    limit: string;
    total: string;
  };
  sell: {
    price: string;
    amount: string;
    stop: string;
    limit: string;
    total: string;
  };
};
