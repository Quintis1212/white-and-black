import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useSelector, useDispatch } from "react-redux";

export default function PriceRangeFilter() {
  const dispatch = useDispatch();

  const price = useSelector(state => state.price);

  const minPrice = price[0];
  const maxPrice = price[1];

  const defaultRange = [minPrice, maxPrice];
  const selectedPriceArray = useSelector(state => state.selectedPrice) || defaultRange;

  return (
    <div className="price-filter">
      <p className="price-range-info">Min price:{selectedPriceArray[0]} $ </p>
      <p className="price-range-info">Max price:{selectedPriceArray[1]} $</p>
      <Range
        key={"filter"}
        min={minPrice}
        max={maxPrice}
        value={[selectedPriceArray[0], selectedPriceArray[1]]}
        step={1}
        allowCross={false}
        onChange={e => dispatch({ type: "FILTERING-LIST", selectedPrice: e })}
      />
    </div>
  );
}
