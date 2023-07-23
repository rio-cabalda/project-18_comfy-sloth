import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {Home,Products, SingleProduct, About, Cart, Error,
  Checkout, PrivateRoute, AuthWrapper} from './pages'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ToastContainer, toast } from 'react-toastify'; // beautify toast
import 'react-toastify/dist/ReactToastify.css'; 
function App() {

  return ( 
    
    <AuthWrapper>
        <ToastContainer position="top-center"/>
        <PayPalScriptProvider option={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
            <Router>
                <Navbar />
                <Sidebar />
                <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/about'>
                    <About />
                </Route>
                <Route exact path='/cart'>
                    <Cart />
                </Route>
                <Route exact path='/products'>
                    <Products />
                </Route>
                <Route exact path='/products/:id' children={<SingleProduct />}>
                    
                </Route>
                <PrivateRoute exact path='/checkout'>  
                    {/* to view the method of Protected route, go to PrivateRoute.jsx */}
                    <Checkout />
                </PrivateRoute>
                <Route exact path='*' >
                    <Error />
                </Route>
                </Switch>

                <Footer />
            </Router>
        </PayPalScriptProvider>
    </AuthWrapper>
 )
}

export default App
