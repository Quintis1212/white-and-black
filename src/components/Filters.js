import React from 'react'
import { useSelector } from 'react-redux'

export default function Filters() {

    let data=useSelector(state=>state.data)

    function filterSetter(data){
        let uniqeSizeArr = []

        let uniqeBrandArr = []

        let minMaxPrice = []

        data.forEach(el=>{
            el.size.forEach(size=>{
                if (uniqeSizeArr.indexOf(size) === -1){
                    uniqeSizeArr.push(size)
                }
            })
            if ( uniqeBrandArr.indexOf(el.brand) === -1){
                uniqeBrandArr.push(el.brand)
            }
            if ( minMaxPrice.indexOf(el.price) === -1){
                minMaxPrice.push(el.price)
            }

        })

        let min = Math.min(...minMaxPrice)
        let max = Math.max(...minMaxPrice)

        minMaxPrice = [min,max]


        console.log(uniqeSizeArr)
        console.log(uniqeBrandArr)
        console.log(minMaxPrice)
        
 let b =   uniqeBrandArr.map(el=>{
              return <p>{el}</p>
             })

             
let c =  uniqeSizeArr.map(el=>{
                return <p>{el}</p>
               })

               let a = [b,c]
               return a
             

    }

    filterSetter(data)

    return (
        <div >
{   filterSetter(data)}

        </div>
    )
}
