import React, { useState } from 'react'
import { useLocation, Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import axios from '../axios';

export default function ProductPage() {
    const dispatch = useDispatch()
    let location =useLocation()
    let [commentList,setCommentList] = useState(null)
    let [comment , setComment] = useState('')
    let backLinkPath = location.pathname.split('/')
    backLinkPath = [backLinkPath[1],backLinkPath[2]].join("/");
    let data = useSelector(state => state.staticData)
    let userAuth = useSelector(state => state.userAuth)
    let [initFetch,setInitFetch]=useState(null)
    let productPage=useSelector(state=> state.productPage)

    
    if (data.length){

    }
    let itemID = location.pathname.split("/")[3];
    
    let item = data.filter(el=>{
        return el.id === itemID
    })

    item = item[0]
    
    let [size , setSize] = useState(item.size[0])

    
    let pathProduct= backLinkPath+itemID
    if (productPage !== pathProduct ) {
        dispatch({ type: "PRODUCT-PAGE", productPage:pathProduct })
        window.scrollTo(0,0)
    }

    React.useEffect(()=>{

        axios.get(`/comments/${location.pathname}.json`)
        .then(function (response) {
          // handle success
          setCommentList(response.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })

    },[initFetch,location.pathname])

    function addToBasket(){
        let itemCopy = {...item,size:size,quantity:1};
     dispatch({type:'ADD-TO-BASKET',productItem:itemCopy});
     if(window.matchMedia('(max-width: 400px)').matches){
         alert('Item is added to basket !')
     }
    }

    function sendComment () {
        if (userAuth && userAuth.displayName && userAuth.displayName !== '' && comment !== ''){
            let name = userAuth.displayName
            const commentToServer = {
                comment:comment,
                name: name,
            }
            axios.post(`/comments/${location.pathname}.json`, commentToServer)
            .then(res=>{
                setInitFetch([])
                setComment('')
                console.log(res)})
            .catch(error => console.log(error))
        } else if(!userAuth) {
            alert('Please log in or sign up !')
        } else if(comment.length < 1) {
            alert('Please, type more characters')
        } else if(!userAuth.displayName ) {
            alert('Please, set your name')
        }

    }
    return (<>
        
        <div className="product-item">
                          <img
                src={item.img || "https://images.ctfassets.net/04kqfsuq4bba/5nmLOIBQHXZxbYepc9Ecmv/a46396138eb1b80a346f7c6fdf2dc66d/shallow-focus-photo-of-man-wearing-black-bucket-hat-2315313.jpg"}
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
            <h2>Comments :</h2>
            {commentList && Object.keys(commentList).map(el=>{
                return <div className="comments-list" key={el}>
                <h4>{commentList[el]['name']}</h4>
                <p>{commentList[el]['comment']}</p>
                         </div>
            })}
            <textarea className="comment-text" rows="5" cols="90" placeholder="type comment here"
            value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            <button onClick={sendComment}>SEND COMMENT</button>
        </div>
        </>)
    
}

