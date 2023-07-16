import { all } from 'axios'
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
switch (action.type) {
  case LOAD_PRODUCTS:
      const products = action.payload
      let maxPrice = action.payload.map((p)=> p.price)
      maxPrice = Math.max(...maxPrice) // in the array, filter all number inside the array and return value of the largest number
      
    return {...state, 
                    all_products: [...products],
                    filtered_products: [...products], 
                    filters: {...state.filters, 
                                              max_price: maxPrice,
                                              price:maxPrice}}

  case SET_GRIDVIEW:
    return { ...state,  grid_view: true }  

  case SET_LISTVIEW:
    return { ...state,  grid_view: false }  

  case UPDATE_SORT:
    return { ...state, sort: action.payload }
    
  case SORT_PRODUCTS:
    const {sort, filtered_products } = state
    let tempProducts = [...filtered_products]
      if(sort === 'price-lowest') tempProducts = tempProducts.sort((a,b)=> a.price - b.price)
      if(sort === 'price-highest') tempProducts = tempProducts.sort((a,b)=> b.price - a.price)
      if(sort === 'name-a') tempProducts = tempProducts.sort((a,b)=> a.name.localeCompare(b.name))
      if(sort === 'name-z') tempProducts = tempProducts.sort((a,b)=> b.name.localeCompare(a.name))
    return {...state, filtered_products: tempProducts}

  case UPDATE_FILTERS:
    const {name, value} = action.payload
    return {...state, filters: {...state.filters, [name]: value}}
    // [name] will look for the property inside the filter and change the value   
  
  case FILTER_PRODUCTS:
    const { all_products } = state // get all products data
    const { text,company,category, color, price, shipping} = state.filters
    let newProducts = [...all_products] 
    // before filtering get the all_product data and make a fresh set 
    // of all_products by using[...all_products].
    
    //filtering process below
    if(text){ // FOR SEARCH TEXT FILTER
      newProducts = newProducts.filter((product)=> product.name.toLowerCase().startsWith(text))
    }
    if(category !== 'all'){ // FOR CATEGORY FILTER
      newProducts = newProducts.filter((product)=> product.category === category)
    }
    if(company !== 'all'){ // FOR COMPANY FILTER
      newProducts = newProducts.filter((product)=> product.company === company)
    }
    if(color !== 'all'){ // FOR COLOR FILTER
      newProducts = newProducts.filter((product)=> {
        return product.colors.find((c)=> c === color)
      })
    }
    // FOR PRICE FILTER 
    newProducts = newProducts.filter((product)=> product.price <= price)
    
    if(shipping){ // FOR SHIPPING FILTER
      newProducts = newProducts.filter((product)=> product.shipping === true)
    }

    return {...state, filtered_products: newProducts}
 
  case CLEAR_FILTERS:
    return {...state, 
      filters: {
        ...state.filters, // this be able to update the property without destroying the structure of the object
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,} 
    }
    
    
 }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
