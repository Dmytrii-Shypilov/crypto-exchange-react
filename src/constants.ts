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
  buy:FormDataTypeObj
  sell: FormDataTypeObj
};

export type FormDataTypeObj = 
  | { price: string; amount: string } 
  | { total: string }              
  | { amount: string; stop: string; limit: string } 
  | { amount: string; stop: string }; 

  export type StreamedTradeInfoType = {
    coinsInfo: {
    lastPrice: string,
    priceChange: string,
    priceChangePercent:string,
    highPrice: string,
    lowPrice: string,
    baseVolume: string,
    quoteVolume: string
  },
  orderBook: {
    lastUpdatedId: string,
    bids: [string[]],
    asks: [string[]]
  }  
  }

  export type UserSignupType = {firstName: string, lastName: string, email: string, password: string}
  export type UserLoginType = {email: string, password: string}
  export type StoreUserType = {firstName: string, lastName: string, email: string, isLoading: boolean, isAuthenticated: boolean}


  export type TradedPairsResponseType = {tradedPairs: { pair: string; change: string; lastPrice: string }[]}