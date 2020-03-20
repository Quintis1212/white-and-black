import React from 'react';
import DropDownMenu from './DropDownMenu';
import objData from '../data';

export default function DropDownBTN(props) {
    return (
        <span className="dropdown">
          <button className="dropdown-button">{props.title}</button>
          <DropDownMenu gender={props.title.toLowerCase()} data={objData} />
        </span>
    )
}
