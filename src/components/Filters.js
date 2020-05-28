import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceRangeFilter from "./PriceRangeFilter";

export default function Filters() {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.data);
  let brand = useSelector((state) => state.brand);
  let size = useSelector((state) => state.size);

  function filtersSetter(data) {
    let uniqeSizeArr = [];
    let uniqeBrandArr = [];

    data.forEach((el) => {
      el.size.forEach((size) => {
        if (uniqeSizeArr.indexOf(size) === -1) {
          uniqeSizeArr.push(size);
        }
      });
      if (uniqeBrandArr.indexOf(el.brand) === -1) {
        uniqeBrandArr.push(el.brand);
      }
    });

    function filterMenuParse(property, arrayOfValues, reduxStateOfProperty) {
      let arrayOfValuesToHTML = arrayOfValues.map((el) => {
        return (
          <span key={Math.random()} className="filter-section-container">
            <label>
              {el}
              <input
                type="checkbox"
                checked={reduxStateOfProperty.includes(el)}
                onChange={() => {
                  dispatch({ type: "FILTERING-LIST", [property]: el });
                }}
              />
              <span className="checkmark"></span>
            </label>
          </span>
        );
      });

      let filterHeading = (
        <h4 className="filter-section-heading" key={Math.random()}>
          {property.toUpperCase()}
        </h4>
      );

      return [filterHeading, ...arrayOfValuesToHTML];
    }

    let filterMenuBrand = filterMenuParse("brand", uniqeBrandArr, brand);
    let filterMenuSize = filterMenuParse("size", uniqeSizeArr, size);

    return [...filterMenuBrand, ...filterMenuSize];
  }

  return (
    <div className="filter-section">
      {filtersSetter(data)}
      <PriceRangeFilter />
    </div>
  );
}
