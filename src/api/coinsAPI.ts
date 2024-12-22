import axiosInstance from "./axiosInstance"
import { ROUTES } from "../routes/routePaths"
import { TradedPairsResponseType } from "../constants";




const fetchTradedCoins = async (quoteCoin: string)  => {
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

 const fetchFavoriteCoins = async ()  => {
  
    try {
        const response = await axiosInstance.get(ROUTES.COINS+ `/getFavs`, {
            withCredentials: true
        })
        return response.data 
    } catch (error) {
        console.error("Error fetching favorite coins:", error);
    } 
};

const addPairToFavorites= async (pair: string)  => {
        try {
            const response = await axiosInstance.post(ROUTES.COINS+ `/addFav/${pair}`, {}, {
                withCredentials: true
            })
            return response.data 
        } catch (error) {
            console.error("Error handling favorite coins:", error)
        }
    };
    
    const removePairFromFavorites= async (pair: string)  => {
        try {
            const response = await axiosInstance.delete(ROUTES.COINS+ `/removeFav/${pair}`, {
                withCredentials: true
            })
            return response.data 
        } catch (error) {
            console.error("Error handling favorite coins:", error);
            
     
        }
    };


export const coinsAPI = {
    fetchTradedCoins,
    addPairToFavorites,
    removePairFromFavorites,
    fetchFavoriteCoins
}