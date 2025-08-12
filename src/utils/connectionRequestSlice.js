// this slice is to handle all the input request to the user
import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
    name:'connectionRequest',
    initialState:null,
    reducers:{
        setConnectionRequest:(state, action)=>{
            return action.payload;
        },
        clearConnectionRequest:() =>{
            return null;
        }
    }
});

export const {setConnectionRequest,clearConnectionRequest} = connectionRequestSlice.actions;
export default connectionRequestSlice;