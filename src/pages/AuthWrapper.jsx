import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

// this component will check if there is an error in authentication.
// if there is no error, it will return to all route in app.js.
// this component imported to app.js

const AuthWrapper = ({children}) => { 
  const {isLoading, error} = useAuth0();

  if(isLoading){
    return (
      <Wrapper>
          <div className="loading"></div>
      </Wrapper>
    )
  }

  if(error){
    return (
      <Wrapper>
          <h1>{error.message}</h1>
      </Wrapper>
    )
  }

  return (
  <>
   {children} 
  </>)
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
