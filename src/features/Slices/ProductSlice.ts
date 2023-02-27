import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { Product } from "../../app/api";
export interface Product {
    _id: string;
    name: string;
    price: number;
    desc: string;
    image: string;
}

export interface ProductsState {
    products: { [_id: string]: Product } | any
}

const initialState: ProductsState = {
    products: {}
}

const productsSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        Products(state, action: PayloadAction<Product[]>) {
            const products = action.payload;
            // products?.forEach(product => {
            //     console.log("PRODUCTS", product);
            //     state.products[product._id] = product;
            // })
            state.products = products
            console.log("PRODUCTS :", products)

        }
    },
});

export const { Products } = productsSlice.actions;
export default productsSlice.reducer;