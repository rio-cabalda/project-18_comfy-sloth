import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {
  
  // Array.from() method is used to create a new array instance from an iterable object or 
  // an array-like object. It allows you to convert an iterable or array-like object into a 
  // real array, so that you can perform array operations and use array methods on it.
  const tempStars = Array.from({ length : 5 },(_,index)=>{
    // this is a map function
    // array length is 5
    // index 0 - 4
    const number = index + 0.5;
    return (
      <span key = { index } >
        { stars >= index + 1 ? <BsStarFill /> : stars >= number ? <BsStarHalf /> : <BsStar /> }
      </span >
    )
  })
  return (
    <Wrapper>
      <div className="stars">
        {tempStars}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
