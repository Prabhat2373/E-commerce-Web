import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
    value: number;
}

const initialState: ProductState = {
    value: 0
}

export const ProductSlice = createSlice({
    name: "productsReducer",
    initialState,
    reducers: {
        AddProductToCart: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
        removeReservation: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    }
})

export const { AddProductToCart } = ProductSlice.actions
export const { removeReservation } = ProductSlice.actions

export default ProductSlice.reducer

