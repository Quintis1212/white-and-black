import { createStore } from "redux";
import objData from "../data";


function reducer(state = objData, action) {
  switch (action.type) {
    case "SET-DATA":
      return state;
    case "FILTERING-DATA":
      let dispatchedFilters = action.filters;

      let data = [...state.staticData];

      dispatchedFilters.forEach(filterOBJ => {
        let result = data.filter(el => {
          return (
            el[Object.keys(filterOBJ)] === filterOBJ[Object.keys(filterOBJ)]
          );
        });
        return (data = result);
      });

      let priceArray = []
      data.forEach(el=>{
        priceArray.push(el.price)
      })

      let minPrice = Math.min(...priceArray)
      let maxPrice = Math.max(...priceArray)

      !Array.isArray(data) && console.warn(`variable 'data' must be an array`);
      !Array.isArray(dispatchedFilters) && console.warn(`variable 'dispatchedFilters' must be an array`);
      !Number.isInteger(minPrice)  && console.warn(`variable 'minPrice' must be a number`);
      !Number.isInteger(maxPrice)  && console.warn(`variable 'minPrice' must be a number`);
      
      return {
        ...state,
        data: data,
        listOfItems: data,
        filters: dispatchedFilters,
        price:[minPrice,maxPrice],
        selectedPrice:[minPrice,maxPrice],
      };


    case "FILTERING-LIST":
      let stateBrandArr = state.brand;
      let dispatchedBrandItem = action.brand;
      let resultArr = [];

      typeof action.brand !== 'string' && action.brand && console.warn(`variable 'action.brand' must be a string`)
      typeof action.size !== 'string'&& action.size && console.warn(`variable 'action.size' must be a string`)
      !Array.isArray(action.selectedPrice) && action.selectedPrice && console.warn(`variable 'action.selectedPrice' must be an array`);

      if (
        stateBrandArr.indexOf(dispatchedBrandItem) === -1 &&
        dispatchedBrandItem
      ) {
        stateBrandArr = [...stateBrandArr, dispatchedBrandItem];
      } else if (stateBrandArr.indexOf(dispatchedBrandItem) !== -1) {
        stateBrandArr.splice(stateBrandArr.indexOf(dispatchedBrandItem), 1);
      }

      if (stateBrandArr.length > 0) {
        resultArr = state.data.filter(el => {
          return stateBrandArr.indexOf(el.brand) > -1;
        });
      }

      if (resultArr.length === 0) {
        resultArr = state.data;
      }

      let stateSizeArr = state.size;
      let dispatchedSizeItem = action.size;

      if (
        stateSizeArr.indexOf(dispatchedSizeItem) === -1 &&
        dispatchedSizeItem
      ) {
        stateSizeArr = [...stateSizeArr, dispatchedSizeItem];
      } else if (stateSizeArr.indexOf(dispatchedSizeItem) !== -1) {
        stateSizeArr.splice(stateSizeArr.indexOf(dispatchedSizeItem), 1);
      }

     

      if (stateSizeArr.length > 0) {
        let sizeArr = [];

        resultArr.forEach(el1 => {
          let result = 0;
          el1.size.forEach(el2 => {
            if (stateSizeArr.indexOf(el2) >= 0) {
              result = result + 1;
            }
          });
          if (result > 0) {
            sizeArr.push(el1);
          }
        });
        resultArr = [...sizeArr];
      }

      let priceArr = []
      resultArr.forEach(el=>{
        priceArr.push(el.price)
      })

      let min = Math.min(...priceArr)
      let max = Math.max(...priceArr)

      let minValue,maxValue

if (action.selectedPrice){
  let selectedPriceArray=action.selectedPrice
   minValue = selectedPriceArray[0]
   maxValue = selectedPriceArray[1]

  resultArr = resultArr.filter(el=>{
    return el.price>=minValue && el.price<=maxValue
  })
}

let copyData = [...state.data]

      return {
        ...state,
        data:copyData,
       listOfItems: resultArr,
        brand: stateBrandArr,
        size: stateSizeArr,
        price:[min,max],
        selectedPrice:[minValue||min,maxValue || max],
      };
      case "ADD-TO-BASKET":
        let item = action.productItem;

        let checkForDuplicates =state.basketList.some(el=>el.id === item.id)

        if (state.basketList && !checkForDuplicates){

          item=[...state.basketList,item]

        } 
        else if(checkForDuplicates) {
          item = state.basketList.map(el=>{
            if (el.id === item.id) {
              if (el.size === item.size){
                let addItem =Number(el.quantity)+1 ;
                return {...el,quantity:addItem};
              } else {
                let newItem = {...el};
                newItem.id = item.id+item.size
                newItem.size = item.size
                newItem.quantity = 1
                return [newItem,el]
              }

            } else {
              return el
            }

            
          })
          item = item.flat()

          let keysArr = item.map(el=>el.id)
          
          for (let i = 0; i < keysArr.length; i++) {

              if ( keysArr.indexOf(keysArr[i])  !==  keysArr.lastIndexOf(keysArr[i])){
                let firstKeyIndex = keysArr.indexOf(keysArr[i])
                let secondKeyIndex = keysArr.lastIndexOf(keysArr[i])
                item[firstKeyIndex].quantity=item[firstKeyIndex].quantity+1
                console.log(88)
               item.splice(secondKeyIndex, 1)
                break
              }

          }
          console.log(keysArr)
        }
        
        console.log(item)

        
        return {
          ...state,
          basketList:item,
        }
        case "DELETE-ITEM":
          let updateList = state.basketList.filter(el=>{
            return el.id !== action.id
          })

        return {
          ...state,
          basketList:updateList,
        }
        case "CLEAR-FILTERS":

          return {
            ...state,
            brand:[],
            size:[],
            price:[],
          }
  
    default:
      return state;
  }
}



let store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
