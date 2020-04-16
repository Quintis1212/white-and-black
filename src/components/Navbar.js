import React from "react";
import DropDownBTN from "./DropDownBTN";
import NavButton from "./NavButton";
import { useSelector } from 'react-redux';


export default function Navbar() {
  let basketList = useSelector(state => state.basketList);

  return (
    <header>
      <nav className="nav-wrapper">


       <NavButton title="HOME" path='home-page'/>

       <DropDownBTN title="WOMAN" />

       <DropDownBTN title="MAN" />


        <NavButton title="BASKET" path='basket' num={basketList.length > 0 && basketList.length }  />

       <NavButton title="LOG IN/LOG OUT" path='authorisation' />
      </nav>
    </header>
  );
}
