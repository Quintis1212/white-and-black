import React, { useState } from 'react'
import { useLocation, Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';



export default function ProductPage() {
    
    const dispatch = useDispatch()
    let location =useLocation()
    let backLinkPath = location.pathname.split('/')
    backLinkPath = [backLinkPath[1],backLinkPath[2]].join("/");

    let data = useSelector(state => state.staticData)

    let itemID = location.pathname.split("/")[3];
    
    let item = data.filter(el=>{
        return el.id === itemID
    })

    item = item[0]

    let [size , setSize] = useState(item.size[0])


    function addToBasket(){
        let itemCopy = {...item,size:size,quantity:1};
     dispatch({type:'ADD-TO-BASKET',productItem:itemCopy});
    }

    return (
        <div className="product-item">
                    <ul>

                    <li><h2>{item.brand}</h2></li>
                    <li> <p>{item.gender+" "+item.typeClothes}</p></li>
                    <li> <p>{item.price} $</p></li>
                    <li>
                    <label htmlFor="size">Choose a size:</label>
                    <select onChange={(e)=>setSize(e.target.value)} id="size">
                        {item.size.map(el=>{

                        return  <option key={el} value={el}>{el}</option>
                        })}
                    </select>
                    </li>
                    <li><p>{item.description}</p></li>
                    <li>
                    <button  onClick={addToBasket} >ADD TO BASKET</button>
                    </li>
                    <li>
                        <Link to={`/${backLinkPath}/`}>
                    <button>BACK</button>
                    </Link>
                    </li>

                    </ul>

        </div>
    )
}

