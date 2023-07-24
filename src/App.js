import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {Home,Products, SingleProduct, About, Cart, Error,
  Checkout, PrivateRoute, AuthWrapper} from './pages'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ToastContainer } from 'react-toastify'; // beautify toast
import 'react-toastify/dist/ReactToastify.css'; 
function App() {

  return ( 
    
    <AuthWrapper>
        <ToastContainer position="top-center"/>
        <PayPalScriptProvider option={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
            <Router>
                <Navbar />
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='products' element={<Products />} />
                    <Route path='products/:id' element={<SingleProduct />} />
                    <Route path='checkout' element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    } />
                    <Route path='*' element={<Error />} />
                </Routes>

                <Footer />
            </Router>
        </PayPalScriptProvider>
    </AuthWrapper>
 )
}

export default App
