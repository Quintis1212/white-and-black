import React,{useState} from 'react';
import { useLocation, Link } from "react-router-dom";
import {  useDispatch } from "react-redux";



export default function ProductDiscription({item}) {
    let [size, setSize] = useState(item.size[0]);
    const dispatch = useDispatch();
    let location = useLocation();
    let backLinkPath = location.pathname.split("/");
    backLinkPath = [backLinkPath[1], backLinkPath[2]].join("/");

    function addToBasket() {
        let itemCopy = { ...item, size: size, quantity: 1 };
        dispatch({ type: "ADD-TO-BASKET", productItem: itemCopy });
        if (window.matchMedia("(max-width: 400px)").matches) {
          alert("Item is added to basket !");
        }
      }

    return (
<div className="product-item">
        <img src={item.img} alt="clothes-foto" />
        <ul className="product-item-list">
          <li>
            <h2>{item.brand}</h2>
          </li>
          <li>
            <p>{item.gender + " " + item.typeClothes}</p>
          </li>
          <li>
            <p>{item.price} $</p>
          </li>
          <li>
            <p>{item.description}</p>
          </li>
          <li>
            <label htmlFor="size">Choose your size:</label>
            <select onChange={(e) => setSize(e.target.value)} id="size">
              {item.size.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </li>
          <li>
            <button onClick={addToBasket}>ADD TO BASKET</button>
          </li>
          <li>
            <Link to={`/${backLinkPath}/`}>
              <button>BACK</button>
            </Link>
          </li>
        </ul>
      </div>
    )
}
