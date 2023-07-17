import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const PrivateRoute = ({ children, ...rest }) => {
  // rest operator is beeing use in function parameter that gathers all the 
  // attribute inside the Route(in this case (exact and path) is <PrivateRoute exact path='checkout ).
  // it is not the same of spread operator that only spread values inside the array.

  const {user} = useAuth0();

  return <Route {...rest} render={()=>{
            // {...rest} will place the attribute copied in the PrivateRoute in App.jsx and place it inside Route in this component
            // render the Route and check if the user(myUser) is logged then navigate to children component which is checkout page(<checkout />) in app jsx.
            // if not log in, then redirect to home page.
            return user ? children : <Redirect to='/'></Redirect>
        }}></Route>;
};
export default PrivateRoute;
