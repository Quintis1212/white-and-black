import React from 'react';
import DropDownMenu from './DropDownMenu';
import { useSelector } from 'react-redux';


export default function DropDownBTN(props) {
  let data = useSelector(state => state)
    return (
        <span className="dropdown">
          <button className="dropdown-button">{props.title}</button>
          <DropDownMenu gender={props.title.toLowerCase()} data={data} />
        </span>
    )
}
