import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: { loading: false },
  reducers: {
    productRequest: (state, action) => {
      return action.payload;
    },
    productSuccess: (state, action) => {
      return { loading: false, product: action.payload.product };
    },
    productFailure: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});
const { actions, reducer } = ProductSlice;
export const { productRequest, productSuccess, productFailure } = actions;
export default reducer;
