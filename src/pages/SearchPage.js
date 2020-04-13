
import React from 'react'
import {useParams } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';



export default function SearchPage() {
    
    const dispatch = useDispatch()

    let filtersFromState = useStore().getState().filters;
    let selectedPrice = useStore().getState().selectedPrice;
    
    let location = useParams().searchParams.split("-")


    dispatch({type:'FILTERING-DATA',filters:[{gender:location[0]},{typeClothes:location[1]}]})
    
    if (filtersFromState && filtersFromState[0].gender === location[0] && filtersFromState[1].typeClothes === location[1]){
        dispatch({ type: "FILTERING-LIST"});
        dispatch({ type: "FILTERING-LIST", selectedPrice: selectedPrice })
    } else { 
        dispatch({type:"CLEAR-FILTERS"});
        dispatch({ type: "FILTERING-LIST"});
        
    }

    return (
        <div className='search-page'>
            <Filters/>
            <ProductList/>
        </div>
    )
}
