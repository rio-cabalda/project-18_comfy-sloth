import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [], // the value WILL CHANGE according to a sorted option/ filter
  all_products: [], // the value WILL NOT CHANGE and will use when clearing the filter.
  grid_view: true,
  sort: 'price-lowest',
  filters: {// this is a controlled input
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    dispatch({type: LOAD_PRODUCTS, payload: products})
  },[products])

  useEffect(()=>{
    dispatch({type: FILTER_PRODUCTS}) // this dispatch will before the SORT_PRODUCTS
    dispatch({type: SORT_PRODUCTS}) // this function  will update if change the sort(the product sort from lowest-hight, a-z)
  }, [products, state.sort, state.filters]) // this will trigger the sort when changing product(when render), sort, filter property of the state.

  const setGridView = () =>{
    dispatch({type: SET_GRIDVIEW})
  }
  const setListView = () =>{
    dispatch({type: SET_LISTVIEW})
  }

  const updateSort = (e) =>{
    // no e.preventDefault(); because this is no submit button in the form
    // this target.name will make sense if there are many controlled input like filters that need to put a 
    // name to identify the property in the state (sort: '').
    //const name = e.target.name
    const value = e.target.value
    dispatch({type: UPDATE_SORT, payload: value})
  }
  const updateFilters = (e) =>{
    let name = e.target.name
    let value = e.target.value
    if(name === 'category'){ 
      // in the category button, its not possible to get value by using e.target.value
      // instead, use e.target.textContent to get the value inside the button.
      value = e.target.textContent
    }
    if(name === 'color'){ 
      // in the color button, there is data-color attribute set to color in the products 
      // and to get that value in the data-color use e.target.dataset.color
      value = e.target.dataset.color
    }
    if(name === 'price'){ 
      // in default, the value is in number but when updating the value it will change to string.
      // the solution is when it is updating the value use Number() method to always pass value to a number
      value = Number(e.target.value)
    }
    if(name === 'shipping'){ 
      // like in the button, checkbox also can't pass value attribute.
      // to get the state of the checkbox whether true or false use e.target.checked
      value = e.target.checked
      console.log(value);
    }
    dispatch({type: UPDATE_FILTERS, payload:{value,name}})
  }
  const clearFilters = () =>{
    dispatch({type: CLEAR_FILTERS})
  }
  return (
    <FilterContext.Provider 
      value={{...state, setGridView, setListView, updateSort, updateFilters, clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
