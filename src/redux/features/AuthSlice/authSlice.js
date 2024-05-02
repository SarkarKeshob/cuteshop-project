import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'activeUser',
    initialState:{user:{}},
    reducers:{
        setActiveUser:(state,action)=>{
            state.user=action.payload;
        }
    }
})

export const {setActiveUser}=authSlice.actions;
export default authSlice.reducer;

