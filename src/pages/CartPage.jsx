import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../components/CartState';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import Navbar2 from '../components/Navbar2';
import { userState } from '../components/state/RecoilState';
import { getCart, reduceQuantity, removeFromCart } from '../api/cart';
import { transformCartArray } from '../components/handles/utility';

const CartPage = () => {
  // const [cart, setCart] = useRecoilState(cartState);
  const [cart, setCart] = useState([]);
  const user = useRecoilValue(userState);
  
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await getCart(user.userId);
        const transformedRes = transformCartArray(response.cartitems);
        setCart(transformedRes);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    
    getDetails();
  }, []);
  
  const handleQuantityChange = async (id, productId, newQuantity) => {
    // const newCart = cart.map((item) =>
    // item.id === id ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item
    // );
    const response = await reduceQuantity(id, productId, newQuantity);
    console.log(response);
    setCart("");
  };
  
  // removeFromCart
  const handleDelete = async (id, productId) => {
    // const newCart = cart.filter((item) => item.id !== id);
    const response = await removeFromCart(id, productId);
    console.log(response);
    setCart(newCart);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const deliveryCharges = 50;
  const grandTotal = subtotal + deliveryCharges;

  const cartComponentSet = cart.map((item) => (
    <CartItem
      key={item.id}
      item={item}
      onQuantityChange={handleQuantityChange}
      onDelete={handleDelete}
    />
  ))

  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar2 />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="space-y-4">
          { cartComponentSet }
        </div>
        <div className="mt-4 bg-white p-4 shadow rounded-lg">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges:</span>
            <span>₹{deliveryCharges}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Grand Total:</span>
            <span>₹{grandTotal}</span>
          </div>
          <button className="bg-purple-500 text-white p-2 rounded w-full mt-4 hover:bg-purple-600">
            Check out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
