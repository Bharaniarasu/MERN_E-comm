import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.ProductState
  );
  //   console.log(product.nam);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  return <div>{product}</div>;
};

export default Product;
