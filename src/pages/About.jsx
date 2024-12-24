import React from 'react'
import { useNavigate } from 'react-router-dom'
import productImg from "../assets/product.jpg"
import productImg2 from "../assets/product2.jpg"
function About() {
  let navigate=useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
    <div className="space-y-12">
      {/* Section 1: Introduction */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Welcome to Shop Here
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          Shop Here is your go-to destination for all things e-commerce. We provide a seamless, personalized shopping experience with a vast collection of products tailored to meet your unique needs.
        </p>
      </section>

      {/* Section 2: Vision and Mission */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-[#1e293b]">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To revolutionize online shopping by bringing together quality, convenience, and exceptional customer service. We aim to make shopping more than just a task—an enjoyable journey.
          </p>
        </div>
        <img
          src={productImg}
          alt="Vision"
          className="rounded-lg shadow-md h-[400px] w-[600px] object-cover"
        />
      </section>

      {/* Section 3: Commitment to Customers */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src={productImg2}
          alt="Vision"
          className="rounded-lg shadow-md h-[400px] w-[600px] object-cover"
        />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-[#1e293b]">Our Commitment</h2>
          <p className="text-lg leading-relaxed">
            We are committed to connecting people with products they love. Our secure platform and user-friendly design ensure a smooth shopping experience for all our customers.
          </p>
        </div>
      </section>

      {/* Section 4: Call to Action */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-back">
          Join Us Today
        </h2>
        <p className="text-lg leading-relaxed">
          Experience the best in e-commerce with Shop Here. Explore our wide range of products and join a community built on trust and satisfaction.
        </p>
        <button
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-110 duration-300 ease-out"
          onClick={()=>{navigate("/products")}}
        >
          Start Shopping
        </button>
      </section>
    </div>
  </div>
  )
}

export default About