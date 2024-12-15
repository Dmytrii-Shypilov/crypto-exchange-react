import { useContext } from "react";
import { OrderFormContext } from "../context/TradeFormContext";

export const useFormData = ()=> {
    const context = useContext(OrderFormContext)
    if (!context) {
        throw new Error("useFormData must be used within a FormDataProvider");
    }

    return context
}