import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, removeAllFromCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoArrowBack } from "react-icons/io5";

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (itemId) => {
    dispatch(addToCart({ id: itemId }));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllFromCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    dispatch(removeAllFromCart());
    toast.success('Compra realizada com sucesso!');
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col p-8">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-semibold mb-2">Cart</h2>
        <Link to="/products" className="text-2xl font-semibold">
          <button className='btn btn-primary '>
            <IoArrowBack /> Back
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto mt-4 border rounded-md border-gray-300">
        <table className="min-w-full bg-base-200 p-4">
          <thead className='text-left'>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300">Product</th>
              <th className="px-6 py-3 border-b border-gray-300">Price</th>
              <th className="px-6 py-3 border-b border-gray-300">Quantity</th>
              <th className="px-6 py-3 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 border-b border-gray-300">{item.name}</td>
                <td className="px-6 py-4 border-b border-gray-300">${item.price}</td>
                <td className="px-6 py-4 border-b border-gray-300">{item.quantity}</td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <span className='flex flex-row gap-2'>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded text-2xl"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded text-2xl"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>

                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='text-right p-4'>
        <div className="mt-4 font-medium text-2xl">
          <strong>Total: ${calculateTotal().toFixed(2)}</strong>
        </div>

        <div className='flex justify-end space-x-4 mt-4 text-right'>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleRemoveAll}
          >
            Remove
          </button>

          <Link to="/products">
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isCartEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleCheckout}
              disabled={isCartEmpty}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
