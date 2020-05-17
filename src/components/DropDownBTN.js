import React, { useState } from 'react';
import DropDownMenu from './DropDownMenu';
import { useSelector } from 'react-redux';


export default function DropDownBTN(props) {
  let data = useSelector(state => state)
  let [show , setShow] = useState(false)

  function showBlock (){
    setShow(!show)
  }
    return (
        <span onClick={showBlock} className="dropdown">
          <button className="dropdown-button" >{props.title}</button>
          <DropDownMenu classNameProps={show?('show'): ''} gender={props.title.toLowerCase()} data={data} />
        </span>
    )
}
