import axiosInstance from "./axiosInstance";
import { ROUTES } from "../routes/routePaths";

const postOrder = async (order: object) => {
    try {
        const response = await axiosInstance.post(ROUTES.TRADE+'/postOrder', order)
        return response.data
    } catch (error) {
        console.log(error)
        // return ''
    }

}




const fetchOrders = async () => {
    try {
        const response = await axiosInstance.get(ROUTES.TRADE+'/getOrders')
        return response.data
    } catch (error) {
        console.log(error)
    }
}


const cancelOrder = async (orderId: string) => {
    try {
        const response = await axiosInstance.delete(ROUTES.TRADE+`/cancelOrder/${orderId}`)
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