import axios from "axios";
import {
  productsFailure,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";
export const getProducts =
  (query, price, category, rating, pageNo) => async (dispatch) => {
    try {
      dispatch(productsRequest({ loading: true }));
      let uri = `http://localhost:8000/api/v1/products?page=${pageNo}`;
      if (query) {
        uri += `&keyword=${query}`;
      }
      if (price) {
        uri += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (category) {
        uri += `&category=${category}`;
      }
      if (rating) {
        uri += `&ratings=${rating}`;
      }
      console.log(uri);
      const { data } = await axios.get(uri);
      dispatch(productsSuccess({ data }));
    } catch (error) {
      dispatch(productsFailure(error.response.data.message));
    }
  };
