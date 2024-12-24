import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../redux/user/user-selector";

type TradeStreamDataType = { orders: object[]; trades: object[] };

type TradeStreamContextType = {
  data: TradeStreamDataType;
  closeTradeStreamConnection: ()=> void
};

const TradeStreamContext = createContext<TradeStreamContextType | undefined>(
  undefined
);

export const TradeStreamProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setData] = useState<TradeStreamDataType>({
    orders: [],
    trades: [],
  });

  const { user } = useSelector(getUserData);

  const closeTradeStreamConnection = useCallback(()=> {
    if (socket) {
        socket.close()
    }
  }, [socket])

  useEffect(() => {
    // const isSocketOpen = sessionStorage.getItem(`socket-open-${user.id}`);

    if (!user.id) return;

    // if (isSocketOpen) {
    //   console.log("WebSocket already connected for this user");
    //   return;
    // }

    const socket = new WebSocket(
      `ws://localhost:8000/paperTrade/stream/${user.id}`
    );
    setSocket(socket)

    socket.onopen = () => {
      console.log("WebSocket connected");
    //   sessionStorage.setItem(`socket-open-${user.id}`, "true");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        setSocket(null)
    }

    return () => {
      // sessionStorage.removeItem(`socket-open-${user.id}`);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
        console.log("WebSocket closed on cleanup");
      }
    };
  }, [user.id]);

  const TradeStreammContextValue = useMemo(
    () => ({
      data,
      closeTradeStreamConnection
    }),
    [data, closeTradeStreamConnection]
  );

  return (
    <TradeStreamContext.Provider value={TradeStreammContextValue}>
      {children}
    </TradeStreamContext.Provider>
  );
};
