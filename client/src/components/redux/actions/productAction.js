import axios from "axios";
import {
  productFailure,
  productRequest,
  productSuccess,
} from "../slices/productSlice";
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
