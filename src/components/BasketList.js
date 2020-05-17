import React from 'react';
import { useSelector, useDispatch } from "react-redux";


export default function BasketList() {
    let basketList = useSelector(state => state.basketList);
    let dispatch = useDispatch();

    function deleteItem (id) {
        dispatch({type:'DELETE-ITEM',id:id});
    }

    function quantityHandler (id,quantity) {
        console.log(id,quantity);
        dispatch({type:'QUANTITY',id:id,quantity:quantity});
    }

    return (
        <>
            {basketList.map(el=>{
                    return (
                        <ul key={el.id} className="basket-list" >
                            <li>
                            <img
                src={el.img}
                alt="clothes-foto"
              />
                            </li>
                            <li><p>{el.gender}</p></li>
                            <li><p>{el.typeClothes}</p></li>
                            <li><p>size: {el.size}</p></li>
                            <li><p>{el.price} $</p></li>
                            <li>
                                <p>quantity : </p>
                                <input type="text" 
                                    onChange={(e)=>quantityHandler(el.id ,e.target.value)}
                                    value={el.quantity}></input>
                                
                                </li>
                            <li><p>sum :{el.price*el.quantity}$</p></li>
                            <li>
                    <button  onClick={()=>deleteItem(el.id)} >DELETE</button>
                    </li>
                        </ul>

                    )
            })}
        </>
    )
}
