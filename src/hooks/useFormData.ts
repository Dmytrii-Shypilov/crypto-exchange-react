import { useContext } from "react";
import { TradeFormContext } from "../context/TradeFormContext";

export const useFormData = ()=> {
    const context = useContext(TradeFormContext)
    if (!context) {
        throw new Error("useFormData must be used within a FormDataProvider");
    }

    return context
}