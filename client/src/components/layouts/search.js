import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };
  //to reset search query on home
  const clearSearch = () => {
    setQuery("");
  };
  useEffect(() => {
    if (location.pathname === "/") {
      clearSearch();
    }
  }, [location]);
  return (
    <form onSubmit={searchHandler}>
      {" "}
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
