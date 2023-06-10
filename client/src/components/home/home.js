import { useEffect } from "react";
import MetaTag from "../layouts/metaTag";
import { getProducts } from "../redux/actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader";
import ProductCard from "./productCard";
import { toast } from "react-toastify";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.ProductsState
  );

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    //send dispatch to getProducts as an argument
    dispatch(getProducts);
  }, [error]);
  return (
    <>
      {!loading ? (
        <>
          <MetaTag title={"products"} />

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => <ProductCard product={product} />)}
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
