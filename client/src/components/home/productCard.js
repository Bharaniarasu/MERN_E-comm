import React from "react";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="col-sm-12 col-md-6 col-lg-3 my-3">
        <a href={`/product/${product._id}`}>
          {" "}
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={product.images[0].image}
              alt=""
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <a href="oppo f21 pro">{product.name}</a>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: (product.ratings / 5) * 100 }}
                  ></div>
                </div>
                <span id="no_of_reviews">
                  ({product.reviews.length || 0} Reviews)
                </span>
              </div>
              <p className="card-text">${product.price}</p>
              <a href="/product.id" id="view_btn" className="btn btn-block">
                View Details
              </a>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default ProductCard;
