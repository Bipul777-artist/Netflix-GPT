import { createSlice } from "@reduxjs/toolkit";

const ItemsVisibility = createSlice({
    name: "item",
    initialState : {
        item: null
    },
    reducers:{
        addShowItem : (state, action) => {
            state.item = action.payload;
        }
    }
})

export const {addShowItem}  = ItemsVisibility.actions
export default ItemsVisibility.reducer;
