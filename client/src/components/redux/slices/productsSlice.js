import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",
  initialState: { loading: false },
  reducers: {
    productsRequest: (state, action) => {
      return { loading: true };
    },
    productsSuccess: (state, action) => {
      return {
        loading: false,
        products: action.payload.data.products,
      };
    },
    productsFailure: (state, action) => {
      console.log("ERR---> ", action.payload);
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = ProductSlice;
export const { productsRequest, productsSuccess, productsFailure } = actions;
export default reducer;
