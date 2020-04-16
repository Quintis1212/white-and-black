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
        <>
        <div className="product-item">
                          <img
                src="https://images.ctfassets.net/04kqfsuq4bba/5nmLOIBQHXZxbYepc9Ecmv/a46396138eb1b80a346f7c6fdf2dc66d/shallow-focus-photo-of-man-wearing-black-bucket-hat-2315313.jpg"
                alt="clothes-foto"
              />
                    <ul className="product-item-list">

                    <li ><h2>{item.brand}</h2></li>
                    <li> <p>{item.gender+" "+item.typeClothes}</p></li>
                    <li> <p>{item.price} $</p></li>
                    <li><p>{item.description}</p></li>
                    <li>
                    <label htmlFor="size">Choose your size:</label>
                    <select onChange={(e)=>setSize(e.target.value)} id="size">
                        {item.size.map(el=>{

                        return  <option key={el} value={el}>{el}</option>
                        })}
                    </select>
                    </li>
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
        <div className="comments">
            <p>
                Comments :
            </p>
        </div>
        </>
    )
}
