import { createSlice } from "@reduxjs/toolkit";

const UserActions  =createSlice({
    name:"allusers",
    initialState:{
        arr:[]
    },
    reducers:{
        adduser(state,action){
            state.arr.push(action.payload);
        },

        removeuser(state,action){
            const id = action.payload
            state.arr = state.arr.filter((each) => each.id !== id);
        }

    }
})

export const UserActionsBtn = UserActions.actions

export default UserActions;