import React, { useState,useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";

export default function ProductCardInList({ el }) {
  let item = el.id;
  let history = useHistory();
  let [imgLoad,setImgLoad] = useState(false)
  let [style,setStyle] = useState(null)
  const imgElement = React.useRef(null);
  const liElement = React.useRef(null);

  function imgLoadSetter(){
    setImgLoad(true)
  }


  useLayoutEffect(()=>{
        let height =liElement.current.clientWidth*1.48
        setStyle({
          height: height+'px'
        })
  },[])

  return (
    <ul key={el.id} className="product-card">
      <li 
      ref={liElement} 
      className={`product-card-img-wrapper ${imgLoad ? "" : "home-page-gears"}`}
      style={style}
      >
        <img 
          className={`img-${imgLoad ? "visible" : "hidden"}`}
          onLoad={imgLoadSetter}
          ref={imgElement}
          src={el.img}
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
}
