import React, { useState } from "react";
import "./searchForm.scss";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";

const SearchForm = () => {
  let location = useLocation();
  const [inputValue, setInputValue] = useState(
    qs.parse(location.search, { ignoreQueryPrefix: true }).search
  );
  let history = useHistory();
  const search = () => {
    event.preventDefault();
    console.log("search work");
    location.search += "&" + inputValue;
    history.push(`${location.pathname}?search=${inputValue}`);
  };
  return (
    <div className="flight-search">
      <h2 className="flight-search__title">search flight</h2>
      <form className="flight-search__form" onSubmit={search}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="search-line"
          placeholder="Airline, destination or flight #"
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
