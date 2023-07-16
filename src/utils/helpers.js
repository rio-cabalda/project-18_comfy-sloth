export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
    }).format(number/100)
  
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item)=> item[type]) 
    //this method use to filter the property passing in type argument
    // if the type pass 'category', will filter all data has 'category' property and put into an one array (unique) variable.
    if(type === 'colors'){
        unique = unique.flat(); 
        // if you have nested array(array inside an array), use flat() to go to array with 1 depth. 
        // all values with the same name is not repeatedly put to array. 
    }
    return ['all', ...new Set(unique)] 
    // adding 'all' values inside an array then the values from data.
    // result will no duplication of values.
    // new Set(array), it creates a new Set instance and initializes it with the 
    // elements from the array. The Set automatically eliminates any duplicate values, 
    // as it only allows unique values to be stored.
}
