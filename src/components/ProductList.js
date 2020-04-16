import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css"; 

export default function ProductList() {
  let data = useSelector(state => state.listOfItems);
  let history = useHistory();

  let [currentPage , setCurrentPage] = useState(1)



  function changeCurrentPage (num) {
    setCurrentPage(num);
    window.scrollTo(0, 0)
  }

  return (
    <div className="product-list-wrapper">
      {data.slice(currentPage*12-12,currentPage*12).map(el => {
        let item = el.id;
        return (
          <ul key={el.id} className="product-card">
            <li>
              <img
                src="https://images.ctfassets.net/04kqfsuq4bba/5nmLOIBQHXZxbYepc9Ecmv/a46396138eb1b80a346f7c6fdf2dc66d/shallow-focus-photo-of-man-wearing-black-bucket-hat-2315313.jpg"
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
                      <Pagination   currentPage={currentPage}
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

