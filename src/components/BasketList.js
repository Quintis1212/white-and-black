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
                        <ul key={el.id} className="basket-list" >
                            <li>
                            <img
                src="https://images.ctfassets.net/04kqfsuq4bba/5nmLOIBQHXZxbYepc9Ecmv/a46396138eb1b80a346f7c6fdf2dc66d/shallow-focus-photo-of-man-wearing-black-bucket-hat-2315313.jpg"
                alt="clothes-foto"
              />
                            </li>
                            <li><p>{el.gender}</p></li>
                            <li><p>{el.typeClothes}</p></li>
                            <li><p>size: {el.size}</p></li>
                            <li><p>{el.price} $</p></li>
                            <li><p>quantity : {el.quantity}</p></li>
                            <li><p>sum :{el.price*el.quantity}$</p></li>
                            <li>
                    <button  onClick={()=>deleteItem(el.id)} >DELETE</button>
                    </li>
                        </ul>

                    )
            })}
        </div>
    )
}
