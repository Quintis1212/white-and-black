import React from "react";
import { useSelector } from "react-redux";

export default function ProductList() {
  let data = useSelector(state => state.data);


  let pagination = data.length

  console.log(pagination)

  return (
    <div className="product-list-wrapper">
      {data.map(el => {
        return (
          <ul key={el.id} className="product-card">
            <li>
              <img
                src="https://images.ctfassets.net/04kqfsuq4bba/5nmLOIBQHXZxbYepc9Ecmv/a46396138eb1b80a346f7c6fdf2dc66d/shallow-focus-photo-of-man-wearing-black-bucket-hat-2315313.jpg"
                alt="clothes-foto"
              />
            </li>

            <li>
              <p>{el.brand}</p>
            </li>
            <li className="product-card-info">
              <p>{el.price} $</p> <button>ADD TO BASKET</button>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
