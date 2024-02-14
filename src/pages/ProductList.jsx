import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../features/cart/cartSlice';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/src/db/products.json');
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados dos produtos:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col justify-center items-center mx-auto p-6">
        <h1 className="text-2xl text-center font-semibold mb-4 mt-12">Products:</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde laborum aliquid, porro vel sapiente voluptate quo quos.
        </p>

        <p>
          Expedita, sunt voluptate aut tempora nesciunt assumenda modi rerum, commodi tempore officiis cumque.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center flex-col my-12">
          <span className="loading loading-bars loading-lg"></span>
          <h2 className='text-2xl'>Loading</h2>
        </div>
      ) : (
        <div className='grid grid-cols-1 mx-auto p-4 mb-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {products.map((product) => (
            <div key={product.id} className="cursor-pointer card bg-base-100 shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105">
              <figure className='h-40 overflow-hidden'>
                <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-4">
                  <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
