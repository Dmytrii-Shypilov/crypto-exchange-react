import axiosInstance from "./axiosInstance";
import { ROUTES } from "../routes/routePaths";
import { UserSignupType } from "../constants";



const  signUpUser = async(user: UserSignupType) => {
    const response = await axiosInstance.post(ROUTES.SIGNUP, user)
    return response.data
}





export const userApi = {
    signUpUser
}