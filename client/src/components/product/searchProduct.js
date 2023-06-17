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
  const [price, setPrice] = useState([1, 1000]);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(null);
  const categories = [
    "Laptops",
    "Mobiles",
    "Electronics",
    "Accessories",
    "Headphones",
    "Books",
    "Footwear",
    "Sports",
    "Home",
  ];
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
    dispatch(getProducts(query, price, category, rating, currentPageNo));
  }, [error, dispatch, currentPageNo, query, updatedPrice, category, rating]);
  return (
    <>
      {!loading ? (
        <>
          <MetaTag title={"products"} />

          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-4 mt-4 ">
                {/*price filter start*/}
                {/* //mouse up to change price filter on mouse leave ffrom slider */}
                <div className="px-5" onMouseUp={() => setUpdatedPrice(price)}>
                  <Slider
                    range={true}
                    marks={{ 1: "₹1", 1000: "₹1000" }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
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
                {/*price filter end*/}

                {/* Category filter start*/}
                <hr className="my-5" />
                <div className="mt-5">
                  <h3 className="mb-4">Catagories</h3>
                  <ul className="pl-0">
                    {categories.map((category) => (
                      <li
                        className="p-1"
                        style={{ cursor: "pointer", listStyle: "none" }}
                        key={category}
                        onClick={(e) => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* catagory filter end*/}
                {/* Ratings Filter start*/}
                <hr className="my-5" />
                <h3>Ratings</h3>
                <ul className="pl-0">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      className="p-1"
                      style={{ cursor: "pointer", listStyle: "none" }}
                      key={star}
                      onClick={(e) => setRating(star)}
                    >
                      <div className="rating-outer">
                        <div
                          className="rating-inner"
                          style={{ width: `${star * 20}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Ratings Filter end*/}

                <hr className="my-5" />
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
