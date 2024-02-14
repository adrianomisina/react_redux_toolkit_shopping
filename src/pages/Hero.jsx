import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Redux Toolkit Shooping</h1>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea officia vero quaerat quasi doloremque magni? Excepturi soluta inventore corporis consequuntur delectus autem sapiente at laborum? Quis perspiciatis fuga eius.
          </p>
          <Link to='/products'>
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero