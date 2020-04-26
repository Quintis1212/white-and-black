import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import BasketList from '../components/BasketList';
import axios from '../axios.js';
import { useHistory } from 'react-router-dom';

export default function Basket() {
    let basketList = useSelector(state => state.basketList);
    let userAuth = useSelector(state => state.userAuth);
    let [phoneNumber , setPhoneNumber] = useState('')
    let [userName , setUserName] = useState('')
    let history = useHistory()
    const dispatch = useDispatch()
    let total = 0;
     basketList.forEach(el => {
       return total= el.price*el.quantity+total
     });

    function sendOrder (e) {
        e.preventDefault()
        const order = {
            list:basketList,
            phone:phoneNumber,
            name:userName,
        }
        axios.post('/orders.json',order)
        .then(res=>console.log(res))
        .then(res => dispatch({type:'CLEAR-BASKET'}))
        .then( res => history.push("/order-sended") ) 
        .catch(error => console.log(error),history.push("/order-sending"))

    } 
    return (
        <div className="basket">
            {basketList.length===0 ?
             <h3>Your basket is empty, please add to basket our products</h3>
            :
            <h3> You choosed {basketList.length===1?'one item': basketList.length+' items'} </h3>
            }
            <BasketList/>
            {basketList.length > 0 && 
            <form  onSubmit={(e)=>sendOrder(e)}>
            <div className="basket-user-data">
            <h3>Total: {total} $</h3>
            <label htmlFor="phone">Enter your phone number: </label>
            <input type="tel" id="phone" name="phone" 
            pattern="[0-9]{12}" 
            placeholder="380 XX XXX XX XX"
            onChange={(e)=>setPhoneNumber(e.target.value)}
            required
            value={userAuth? userAuth.photoURL: phoneNumber}></input>
            <label htmlFor="name">Your name: </label>
            <input type="text" id="name" name="name" 
            onChange={(e)=>setUserName(e.target.value)}
            value={userAuth? userAuth.displayName : userName}
            placeholder="Your name"
            required></input>
            <button  className="dropdown-button" type="submit">SEND ORDER</button>
            </div>
            </form>
            }

        </div>
    )
}
