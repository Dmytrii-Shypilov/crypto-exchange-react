import { userApi } from "../../api/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserSignupType } from "../../constants";

export const signUpUser = createAsyncThunk('auth/SignUp', async (data: UserSignupType, {rejectWithValue}) => {
    try {
        const user = userApi.signUpUser(data)
        return user
    } catch (error) {
        return rejectWithValue(error)
    }
})