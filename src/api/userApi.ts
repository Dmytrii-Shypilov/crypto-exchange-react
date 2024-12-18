import axiosInstance from "./axiosInstance";
import { ROUTES } from "../routes/routePaths";
import { UserSignupType, UserLoginType } from "../constants";



const  signUpUser = async(user: UserSignupType) => {
    const response = await axiosInstance.post(ROUTES.SIGNUP, user)
    return response.data
}

const logOutUser = async(userId: string | null) => {
    const response = await axiosInstance.post(ROUTES.LOGOUT, userId)
    return response.data
}

const loginUser = async(user: UserLoginType) => {
    const response = await axiosInstance.post(ROUTES.LOGIN, user)
    return response.data
}


export const userApi = {
    signUpUser, logOutUser, loginUser
}