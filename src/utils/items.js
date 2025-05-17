import { createSlice } from "@reduxjs/toolkit";

const ItemsVisibility = createSlice({
    name: "item",
    initialState : {
        item: null,
        userAddress: false,
    },
    reducers:{
        addShowItem : (state, action) => {
            state.item = action.payload;
        },
        SetNavItems : (state, action) => {
            state.userAddress = action.payload;
        }
    }
})

export const {addShowItem, SetNavItems}  = ItemsVisibility.actions
export default ItemsVisibility.reducer;
