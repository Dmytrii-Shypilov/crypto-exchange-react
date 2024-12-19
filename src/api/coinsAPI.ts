import axiosInstance from "./axiosInstance"
import { ROUTES } from "../routes/routePaths"
import { TradedPairsResponseType } from "../constants";



const fetchFavoriteCoins = async (quoteCoin: string)  => {
    try {
        const response = await axiosInstance.get(ROUTES.COINS+ `/${quoteCoin}`, {
            withCredentials: true
        })
        return response.data as TradedPairsResponseType;
    } catch (error) {
        console.error("Error fetching favorite coins:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export const coinsAPI = {
    fetchFavoriteCoins
}