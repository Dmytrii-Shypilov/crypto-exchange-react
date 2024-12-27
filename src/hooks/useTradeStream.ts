import { useContext } from "react";
import { TradeStreamContext } from "../context/TradeStreamContext";

export const useTradeStream = ()=> {
    const context = useContext(TradeStreamContext)
    if (!context) {
        throw new Error("useFormData must be used within a FormDataProvider");
    }

    return context
}