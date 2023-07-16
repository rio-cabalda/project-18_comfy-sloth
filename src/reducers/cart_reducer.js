import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_QUANTITY,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:  
      const {id,color,quantity,product} = action.payload
      const tempItem = state.cart.find((itemData)=> itemData.id == id + color)
      // if tempItem is true or has return value, this function will combine the same product with different color
      if(tempItem){
        const tempCart = state.cart.map((cartItem)=>{// mapping all product in the cart and checking for the existing item

            if(cartItem.id === id + color) { //--------checking if the new adding product to cart has already in the cart section
              let newQuantity = cartItem.quantity + quantity // if the product and color is already exist in the cart. simply add the quantity
                    if(newQuantity > cartItem.max_item){ 
                      // if the newQuantity is larger than the stock(all quantity of product) 
                      // just put newQuantity is equal to the stock.
                      newQuantity = cartItem.max_item

                    }
              return {...cartItem, quantity: newQuantity} // update the quantity
              }//--------------------------------------END of checking if the new adding product to cart has already in the cart section
              
          return cartItem; // --- if there is no existing product just return to what it is 
                          //  and just run else state below to create new Item to the cart.
        })
       
        return {...state, cart: tempCart}
      }else{ 
        // ADDING NEW PRODUCT TO CART 
        // if tempItem has no value return. create new item in the cart (newItem)
        //create new item and adding to cart property
        const newItem = {
          id: id+color,
          name: product.name,
          color, //this the same as color:color, ES6 function
          quantity, //this the same as amount:amount, ES6 function
          image: product.images[0].url,
          price: product.price,
          max_item: product.stock,
        }
        return {...state, cart: [...state.cart, newItem]} 
        //[...state.cart,] will copy data from previous array and add 'newItem'
      }
    
    case REMOVE_CART_ITEM: 
      const tempCart = state.cart.filter((item)=> item.id !== action.payload)
      return {...state, cart: tempCart}

    case CLEAR_CART:  
      return {...state, cart:[]}

    case TOGGLE_CART_ITEM_QUANTITY:  
     const {id:id_q, value} = action.payload
      
      let tempQuantityCart = state.cart.map((cartItem)=>{
        
        if(cartItem.id === id_q) {
          if(value === 'increase'){
              let newQuantity = cartItem.quantity + 1
              if(newQuantity > cartItem.max_item){
                newQuantity = cartItem.max_item
              }
             return {...cartItem, quantity: newQuantity}
          }
          if(value === 'decrease'){
            let newQuantity = cartItem.quantity - 1
              if(newQuantity < 1){
                newQuantity = 1
              }
             return {...cartItem, quantity: newQuantity}
            
          }
        }else {
          return cartItem
        }
      })

      return {...state, cart: tempQuantityCart}

    case COUNT_CART_TOTALS:  
      // state.cart.reduce() is use to calculating total amount/ total cost inside an shopping cart(array)
      const {total_items, total_amount} = state.cart.reduce((total,cartItem)=>{
        // this will loop inside the array. Will look each value inside an array
        // first parameter (total) is the initial value below set to zero and changes value every loop
        // second parameter (cartItem) is actual value inside an array.
          const {quantity, price} = cartItem
          total.total_items += quantity
          total.total_amount += price * quantity
        return total
      }, {// this is to set initial value
          total_items: 0,
          total_amount: 0,
      })
       return {...state, total_items, total_amount}
  }

  //return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
