import { useEffect, useState } from "react";
import MetaTag from "../layouts/metaTag";
import { getProducts } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader";
import ProductCard from "./productCard/productCard";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
const Home = () => {
  const [currentPageNo, setCurrentPageNo] = useState(1);
  // console.log(currentPageNo);
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, productPerPage } =
    useSelector((state) => state.ProductsState);
  const pageNoHandler = (pageNo) => {
    setCurrentPageNo(pageNo);
  };
  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    //send dispatch to getProducts as an argument
    dispatch(getProducts(null, null, null, null, currentPageNo));
  }, [error, dispatch, currentPageNo]);
  return (
    <>
      {!loading ? (
        <>
          <MetaTag title={"products"} />

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <ProductCard col={3} product={product} key={product._id} />
                ))}
            </div>
          </section>

          {/* //pagination
          add 2 bs classes to style pagination component */}
          <div className="d-flex mt-5 justify-content-center">
            {productsCount > productPerPage ? (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={currentPageNo}
                totalItemsCount={productsCount}
                onChange={pageNoHandler}
                itemsCountPerPage={productPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
              />
            ) : null}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
