import axiosInstance from "./axiosInstance";
import { ROUTES } from "../routes/routePaths";

const postOrder = async (order: object) => {
    try {
        const response = await axiosInstance.post(ROUTES.PAPER_TRADE+'/postOrder', order, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error)
        // return ''
    }

}




const fetchOrders = async () => {
    try {
        const response = await axiosInstance.get(ROUTES.PAPER_TRADE+'/getOrders', {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


const cancelOrder = async (orderId: string) => {
    try {
        console.log(orderId)
        const response = await axiosInstance.delete(ROUTES.PAPER_TRADE+`/cancelOrder/${orderId}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const tradeAPI = {
    postOrder,
    fetchOrders,
    cancelOrder
}