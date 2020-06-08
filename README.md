Hello everyone!This is overview solved cases with witch i countered during building this app.
Admin panel for this store - https://quintis1212.github.io/admin-panel/build/index.html#/active-items
You can add item that you whant to see on this store - https://quintis1212.github.io/white-and-black/build/index.html#/home-page

1) useMemo with firebase initialization:

```
  const firebaseConfig = useMemo(
    () => ({
      apiKey: "AIzaSyBVwgTuqBBxIn-__3LU8vOPMCw0iCE1oU0",
      authDomain: "train-39df7.firebaseapp.com",
      databaseURL: "https://train-39df7.firebaseio.com",
      projectId: "train-39df7",
      storageBucket: "train-39df7.appspot.com",
      messagingSenderId: "356224743225",
      appId: "1:356224743225:web:af9407f63996673d2d5ae8",
    }),
    []
  );
  // Initialize Firebase

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, [firebaseConfig]);  
  ```
To prevent errors of firebase initialization in admin-panel for this store I used useMemo to save initial value of firebaseConfig

2) useRef and useLayoutEffect for loading animations:
```
import React, { useState,useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";

export default function ProductCardInList({ el }) {
  let item = el.id;
  let history = useHistory();
  let [imgLoad,setImgLoad] = useState(false)
  let [style,setStyle] = useState(null)
  const liElement = React.useRef(null);

  function imgLoadSetter(){
    setImgLoad(true)
  }


  useLayoutEffect(()=>{
        let height =liElement.current.clientWidth*1.48
        setStyle({
          height: height+'px'
        })
  },[])

  return (
    <ul key={el.id} className="product-card">
      <li 
      ref={liElement} 
      className={`product-card-img-wrapper ${imgLoad ? "" : "home-page-gears"}`}
      style={style}
      >
        <img 
          className={`img-${imgLoad ? "visible" : "hidden"}`}
          onLoad={imgLoadSetter}
          src={el.img}
          alt="clothes-foto"
        />
      </li>
      <li>
        <p className="product-card-brand">{el.brand}</p>
      </li>
      <li className="product-card-info">
        <p>{el.price} $</p>{" "}
        <Link to={`${history.location.pathname}/${item}`}>
          <button className="product-card-brand">MORE INFO...</button>
        </Link>
      </li>
    </ul>
  );
}

```

To prevent compression effect while images is loading  I used useRef to get current li tag width and through useLayoutEffect set the heigth to li element and run loading animation

3) useRef in useEffect to get current value in cleanup function
```
  useEffect(() => {
    return () => {
      console.log(imgRef.current)
      if (imgRef.current){
        deleteItem(null,imgRef.current)
      }
    };
  }, []);
```
This useEffect function is from component that can post new product items to  firebase database.If user downloaded image to firebase storage and do not posted item with this image to database,  when user go to other page,cleanup  function runs and delete image by current url from firestore.

4) for await for download data from a list of url
```
 async function modernPromise() {
      let promises = [
        axios.get("/data.json").then((res) => {
          return res.data
        })
        .catch(function (error) {
          console.log(error);
        }),

        axios
          .get("https://train-39df7.firebaseio.com/data.json")
          .then((res) => {
            let data = res.data
            let resToArr = Object.keys(data).map(key =>{
              console.log({...data[key],id:key})
              return {...data[key],id:key}
            })
            return resToArr
          })
          .catch(function (error) {
            console.log(error);
          }),
      ];

      for await (const promise of promises) {

        console.log(promise)
       dispatch({ type: "SET-DATA-FROM-SERVER", data: promise});

      }
    }
```
In function modern Promise I downloaded items from two different url in a modern way.One url can be changed in admin-panel, second is a static, to demonstrate that admin panel works 
