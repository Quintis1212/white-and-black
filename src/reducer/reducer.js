import { createStore } from "redux";
import objData from "../data";

function reducer(state = objData, action) {
  switch (action.type) {
    case "SET-DATA":
      return state;
    case "FILTERING-DATA":
      let filteredObj = state.staticData.filter(el=>{
       return el.gender===action.filters.gender && el.typeClothes === action.filters.typeClothes
      })
      return {...state,data:filteredObj};
    default:
      return state;
  }
}

let store = createStore(reducer);

export default store;
