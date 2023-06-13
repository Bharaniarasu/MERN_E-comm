import axios from "axios";
import {
  productFailure,
  productRequest,
  productSuccess,
} from "../slices/productSlice";
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest({ loading: true }));
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/product/${id}`
    );

    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFailure(error.response.data.message));
  }
};
