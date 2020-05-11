import ProductPage from "./ProductPage";
import React from "react";
import { useSelector } from "react-redux";

export default function ProductPageWrapper() {
  let data = useSelector((state) => state.staticData);
  let dataLength = data.length;
  return (
    <>
      {dataLength ? (
        <ProductPage />
      ) : (
        <div className="order-sended">
          <h2>Loading item ... </h2>
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}
