import React from 'react';
import {Link } from 'react-router-dom';

export default function NavButton(props) {

    return (

        <Link to={`/${props.path}`} replace><span className="dropdown">
         {props.num? <p>{props.num}</p>: null}
          <button className="dropdown-button">{props.title}</button>
        </span></Link>
    )
}
