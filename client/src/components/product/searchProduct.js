import { useEffect, useState } from "react";
import MetaTag from "../layouts/metaTag";
import {
  getProducts,
  getProductsPerPage,
} from "../redux/actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader";
import ProductCard from "../home/productCard/productCard";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

const SearchProduct = () => {
  const { query } = useParams();
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
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
    dispatch(getProducts(query, price, currentPageNo));
  }, [error, dispatch, currentPageNo, query, price]);
  return (
    <>
      {!loading ? (
        <>
          <MetaTag title={"products"} />

          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-4 mt-4 ">
                <div className="px-5">
                  <Slider
                    range={true}
                    marks={{ 1: "₹1", 10000: "₹10000" }}
                    min={1}
                    max={10000}
                    defaultValue={price}
                    onAfterChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`₹ ${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <ProductCard
                        col={4}
                        product={product}
                        key={product._id}
                      />
                    ))}
                </div>
              </div>
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

export default SearchProduct;
