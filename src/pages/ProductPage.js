import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios";
import ProductDiscription from "../components/ProductDiscription";

export default function ProductPage() {
  let location = useLocation();
  let [commentList, setCommentList] = useState(null);
  let [comment, setComment] = useState("");

  let data = useSelector((state) => state.staticData);
  let userAuth = useSelector((state) => state.userAuth);
  let [initFetch, setInitFetch] = useState(null);

  if (data.length) {
  }
  let itemID = location.pathname.split("/")[3];

  let item = data.filter((el) => {
    return el.id === itemID;
  });

  item = item[0];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    axios
      .get(`/comments/${location.pathname}.json`)
      .then(function (response) {
        // handle success
        setCommentList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [initFetch, location.pathname]);



  function sendComment() {
    if (
      userAuth &&
      userAuth.displayName &&
      userAuth.displayName !== "" &&
      comment !== ""
    ) {
      let name = userAuth.displayName;
      const commentToServer = {
        comment: comment,
        name: name,
      };
      axios
        .post(`/comments/${location.pathname}.json`, commentToServer)
        .then((res) => {
          setInitFetch([]);
          setComment("");
          console.log(res);
        })
        .catch((error) => console.log(error));
    } else if (!userAuth) {
      alert("Please log in or sign up !");
    } else if (comment.length < 1) {
      alert("Please, type more characters");
    } else if (!userAuth.displayName) {
      alert("Please, set your name");
    }
  }

  return (
    <>
      <ProductDiscription item={item} />
      <div className="comments">
        <h2>Comments :</h2>
        {commentList &&
          Object.keys(commentList).map((el) => {
            return (
              <div className="comments-list" key={el}>
                <h4>{commentList[el]["name"]}</h4>
                <p>{commentList[el]["comment"]}</p>
              </div>
            );
          })}
        <textarea
          className="comment-text"
          rows="5"
          cols="90"
          placeholder="type comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button onClick={sendComment}>SEND COMMENT</button>
      </div>
    </>
  );
}
