import React from "react";
import DropDownBTN from "./DropDownBTN";
import NavButton from "./NavButton";


export default function Navbar() {
  return (
    <header>
      <nav className="nav-wrapper">


       <NavButton title="HOME" path='home-page'/>

       <DropDownBTN title="WOMAN" />

       <DropDownBTN title="MAN" />


        <NavButton title="BASKET" path='basket'  />

       <NavButton title="LOG IN/LOG OUT" path='authorisation' />
      </nav>
    </header>
  );
}
