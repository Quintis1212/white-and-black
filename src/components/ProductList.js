import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css"; 

export default function ProductList() {
  let data = useSelector(state => state.listOfItems);
  let numOfPage = useSelector(state => state.numOfPage);
  let dispatch = useDispatch()
  let history = useHistory();
 

  function changeCurrentPage (num) {
    dispatch({type:'SET-PAGE-NUMBER',numOfPage:num});
    window.scrollTo(0, 0)
  }

  return (
    <div className="product-list-wrapper">
      {data.slice(numOfPage*12-12,numOfPage*12).map(el => {
        let item = el.id;
        return (
          <ul key={el.id} className="product-card">
            <li>
              <img
                src={el.img || "https://images.ctfassets.net/04kqfsuq4bba/5nmLOIBQHXZxbYepc9Ecmv/a46396138eb1b80a346f7c6fdf2dc66d/shallow-focus-photo-of-man-wearing-black-bucket-hat-2315313.jpg"}
                alt="clothes-foto"
              />
            </li>

            <li>
              <p className="product-card-brand">{el.brand}</p>
            </li>
            <li className="product-card-info">
              <p>{el.price} $</p>{" "}
              <Link to={`${history.location.pathname}/${item}`}>
                <button className="product-card-brand">MORE INFO...</button>
              </Link>

            </li>

          </ul>
        );
      })}
         <div className="product-list-pagination">

                      {data.length > 12 ?  ( 
                      <Pagination   currentPage={numOfPage}
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

