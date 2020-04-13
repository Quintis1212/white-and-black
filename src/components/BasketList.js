import React from 'react';
import { useSelector, useDispatch } from "react-redux";


export default function BasketList() {
    let basketList = useSelector(state => state.basketList);
    let dispatch = useDispatch();

    function deleteItem (id) {
        dispatch({type:'DELETE-ITEM',id:id});

    }

    return (
        <div>
            {basketList.map(el=>{
                    return (
                        <ul key={el.id}>
                            <li><p>{el.gender}</p></li>
                            <li><p>{el.typeClothes}</p></li>
                            <li><p>{el.size}</p></li>
                            <li><p>{el.price} $</p></li>
                            <li><p>quantity : {el.quantity}</p></li>
                            <li>
                    <button  onClick={()=>deleteItem(el.id)} >DELETE</button>
                    </li>
                        </ul>

                    )
            })}
        </div>
    )
}
