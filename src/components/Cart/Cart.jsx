import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
   // const cart = props.cart; // Option-1

   // const { cart } = props;// Option-2 

   // console.log(cart);

   let totalPrice = 0;
   let totalShipping = 0;
   for (const product of cart) {
      totalPrice = totalPrice + product.price;
      totalShipping = totalShipping + product.shipping;
   }
   const tax = totalPrice * 7 / 100;
   const grandTotal = totalPrice + totalShipping + tax;

   return (
      <div className='cart'>
         <h2 style={{ textAlign: 'center', margin: '0px' }}>Order Summary</h2>
         <p>Selected Items: {cart.length}</p>
         <p>Total Price : ${totalPrice}</p>
         <p>Total Shipping charge: ${totalShipping}</p>
         <p>Tax : ${tax.toFixed(2)}</p>
         <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>

      </div >
   );
};

export default Cart;