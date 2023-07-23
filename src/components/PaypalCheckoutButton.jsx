import { PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react"
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'


const PaypalCheckoutButton = ({products,clearCart}) => {
    const [error, setError] = useState(null) // this is for error process state
    const navigate = useNavigate()
    console.log(products);


    if(error) {
        // display success message
        toast.error(`Error: ${error}`)
    }

  return (
    <PayPalButtons 
    style={{
            color: "blue",
            layout: "horizontal",
            height: 48,
            tagline: false,
            shape: 'rect',
            label: 'checkout'
        }}
    onClick={(data,actions)=>{
        //this function will validate on button click whether client or server side
        const hasAlreadyBoughtProduct = false
        if(hasAlreadyBoughtProduct){
            setError('You already bought this product. Go to your account to view your list of products.')
            toast.info(error)
            return actions.reject()
        }
        else {
            return actions.resolve()
        }
    }}    
    createOrder={(data,actions)=>{
        const checkout = actions.order.create({
            purchase_units: [{
                description: products.description,
                amount:{
                    value: products.total_amount
                }
            }]
        })
        return checkout
    }}
    onApprove={async(data, actions)=>{ 
        // it must capture the order to deduct the amount to the buyers account 
        // capture is a promise function therefore use async await
        const order = await actions.order.capture()
        const {given_name, surname} = order.payer.name
        console.log('order',order);
        if(order.status==='COMPLETED'){
            setTimeout(()=>{
                clearCart();
                toast.success(`Thank you for your purchase! ${given_name} ${surname}`)
                navigate('/');
            },1000)
            
        }
        // call handleApprove function to personalize user experience after checking out successfully
        // then passing the order ID to data param
    }}
    onCancel={()=>{
        //cancel message, modal or redirect user to cancel page, redirect back to cart
        navigate('/cart');
        toast.warning('You cancel the order')
    }}
    onError={(err)=>{
        setError(err)
        toast.error(error)
        console.log('error',error);
    }}
    />
  )
}

export default PaypalCheckoutButton