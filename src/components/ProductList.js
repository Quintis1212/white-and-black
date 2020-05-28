import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import ProductCardInList from "./ProductCardInList";

export default function ProductList() {
  let data = useSelector((state) => state.listOfItems) || [];
  let numOfPage = useSelector((state) => state.numOfPage);
  let dispatch = useDispatch();

  function changeCurrentPage(num) {
    dispatch({ type: "SET-PAGE-NUMBER", numOfPage: num });
    window.scrollTo(0, 0);
  }

  return (
    <div className="product-list-wrapper">
      {data.length > 12
        ? data.slice(numOfPage * 12 - 12, numOfPage * 12).map((el) => {
            return <ProductCardInList el={el} key={el.id} />;
          })
        : data.map((el) => {
            return <ProductCardInList el={el} key={el.id} />;
          })}
      <div className="product-list-pagination">
        {data.length > 12 ? (
          <Pagination
            currentPage={numOfPage}
            totalSize={data.length}
            sizePerPage={12}
            changeCurrentPage={changeCurrentPage}
            firstPageText="first"
            lastPageText="last"
            showFirstLastPages={true}
            nextPageText="next"
            previousPageText="prev"
          />
        ) : null}
      </div>
    </div>
  );
}
