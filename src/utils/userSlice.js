import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    emailAddress: null,
  };

const userSlice = createSlice({
    name: 'user',

    initialState ,

    reducers : {
        addUser: (state, action) => {
            if (!state) return initialState;
            state.currentUser  = action.payload;
             
        },
        removeUser: (state) => {
            if (!state) return initialState;
           state.currentUser = null;
        },
        AddEmailAddress: (state, action) => {
            if (!state) return initialState;
             state.emailAddress = action.payload;
        },
        
    }


})

export const {addUser, removeUser, AddEmailAddress } = userSlice.actions;

export default userSlice.reducer;