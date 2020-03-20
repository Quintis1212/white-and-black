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

        <NavButton title="BLOG" path='home-page' />

        <NavButton title="BASKET" path='home-page'  />

       <NavButton title="LOG IN/LOG OUT" />
      </nav>
    </header>
  );
}
