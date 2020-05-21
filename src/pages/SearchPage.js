
import React, { useEffect,useCallback } from 'react'
import {useParams } from 'react-router-dom';
import { useDispatch, useStore, useSelector } from 'react-redux';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';



export default function SearchPage() {
    
    const dispatch = useDispatch()
    let data  = useSelector(state => state.staticData)
    let scrollY  = useSelector(state => state.scrollY)
    let filtersFromState = useStore().getState().filters;
    let selectedPrice = useStore().getState().selectedPrice;
    
    let location = useParams().searchParams.split("-")

    const listener = useCallback((e)=>{
            let scrollPosition = window.scrollY
            console.log(scrollPosition)
            dispatch({type:'SCROLL-POSITION',scrollY:scrollPosition})
    },[dispatch])
    
    window.addEventListener('scroll', listener)

    useEffect(() => {

        return () => {
          window.removeEventListener('scroll',listener,false)
        };
      }, [listener]);

      useEffect(()=>{
         window.scrollTo(0,scrollY)
      })


    useEffect(() => {
        if (data.length) {
            dispatch({type:'FILTERING-DATA',filters:[{gender:location[0]},{typeClothes:location[1]}]})
            if (filtersFromState && filtersFromState[0].gender === location[0] && filtersFromState[1].typeClothes === location[1]){
                dispatch({ type: "FILTERING-LIST"});
                dispatch({ type: "FILTERING-LIST", selectedPrice: selectedPrice })
            } else { 
                dispatch({type:'SET-PAGE-NUMBER',numOfPage:1});
                dispatch({type:"CLEAR-FILTERS"});
                dispatch({ type: "FILTERING-LIST"});
                
            }
        }
    }, [ location, filtersFromState, selectedPrice, data.length, dispatch ]);

    let arrLength = data.length;

    return (
        <>
        {arrLength ? (
            <div className='search-page'>
            <Filters/>
            <ProductList/>
        </div>
        ):
        (        <div className="order-sended">
        <h2>Loading products ... </h2> 
        <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
     </div>)
    }
    </>

    )
}
