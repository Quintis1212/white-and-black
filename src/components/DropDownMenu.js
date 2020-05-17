import React from 'react'
import {Link } from "react-router-dom";


export default function DropDownMenu(props) {
    let menuArr = []
    function menuItemList () {

        props.data.staticData.map((el,i)=>{
            if (el.gender === props.gender ) {
                menuArr.push(el.typeClothes)
            }
            return null 
        })

        let menuArrUniqe = [...new Set(menuArr)]

     return   menuArrUniqe.map((el,i)=>{
         let searchParams = props.gender+'-'+el;
        return <Link key={i} to={`/search/${searchParams}`}><li >{el}</li></Link>
        })

    }

    return (
        <ul className={window.matchMedia('(max-width: 400px)').matches?"dropdown-for-mobile "+props.classNameProps: "dropdown-content"}>
        {menuItemList()}
          </ul>
    )
}
