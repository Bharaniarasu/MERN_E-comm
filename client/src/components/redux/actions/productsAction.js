import axios from "axios";
import {
  productsFailure,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";
export const getProducts = async (dispatch) => {
  try {
    dispatch(productsRequest({ loading: true }));
    const { data } = await axios.get("http://localhost:8000/api/v1/products");
    dispatch(productsSuccess({ data }));
  } catch (error) {
    dispatch(productsFailure(error.response.data.message));
  }
};
