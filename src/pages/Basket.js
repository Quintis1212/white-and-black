import React from 'react';
import { useSelector } from "react-redux";
import BasketList from '../components/BasketList'

export default function Basket() {
    let basketList = useSelector(state => state.basketList);

    return (
        <div>
            <h3>I AM BASKET</h3>
            <h3> you choose {basketList?basketList.length: 'no one'} items  </h3>
            <BasketList/>
        </div>
    )
}
