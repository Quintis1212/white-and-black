import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceRangeFilter from "./PriceRangeFilter";

export default function Filters() {
  const dispatch = useDispatch();

  let data = useSelector(state => state.data);

  let brand = useSelector(state => state.brand)

  let size = useSelector(state => state.size)


  function filtersSetter(data) {
    let uniqeSizeArr = [];

    let uniqeBrandArr = [];

    data.forEach(el => {
      el.size.forEach(size => {
        if (uniqeSizeArr.indexOf(size) === -1) {
          uniqeSizeArr.push(size);
        }
      });
      if (uniqeBrandArr.indexOf(el.brand) === -1) {
        uniqeBrandArr.push(el.brand);
      }
    });

    let filterMenuBrand = ["BRAND:", ...uniqeBrandArr].map((el, i) => {
      return el === "BRAND:" ? (
        <h4 className="filter-section-heading" key={i}>
          {el}
        </h4>
      ) : (
        <span key={i} className="filter-section-container">
          <label>
            {el}
            <input
              type="checkbox"
              checked={brand.includes(el)}
              onChange={() => {
                dispatch({ type: "FILTERING-LIST", brand: el });
              }}
            />
            <span className="checkmark"></span>
          </label>
        </span>
      );
    });

    let filterMenuSize = ["SIZE:", ...uniqeSizeArr].map((el, i) => {
      return el === "SIZE:" ? (
        <h4 className="filter-section-heading" key={Math.random()}>
          {el}
        </h4>
      ) : (
        <span key={Math.random()} className="filter-section-container">
          <label>
            {el}
            <input
              type="checkbox"
              checked={size.includes(el)}
              onChange={() => {
                dispatch({ type: "FILTERING-LIST", size: el });
              }}
            />
            <span className="checkmark"></span>
          </label>
        </span>
      );
    });

    return [...filterMenuBrand, ...filterMenuSize];
  }

  return (
    <div className="filter-section">
      {filtersSetter(data)}
      <PriceRangeFilter />
    </div>
  );
}
