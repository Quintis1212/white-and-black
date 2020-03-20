
import React from 'react'
import {useLocation } from 'react-router-dom';
import { useStore,useDispatch } from 'react-redux';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';



export default function SearchPage() {
    
    const dispatch = useDispatch()

    let location = useLocation().pathname.split("/")[2].split("-")

    dispatch({type:'FILTERING-DATA',filters:{gender:location[0],typeClothes:location[1]}})

    return (
        <div className='search-page'>
            <h3>{location[0]+" "+location[1]+' page'}</h3>
            <Filters/>
            <ProductList/>
        </div>
    )
}
