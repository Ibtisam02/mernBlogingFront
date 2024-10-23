import React, { useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Card from "../components/compos/Card";
import Metadata from "../components/layout/Metadata";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

function Home() {
  let [iamges, setImages] = useState([
    {
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Slide 2",
    },
    {
      url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 3",
    },
  ]);
  return (
    <>
    <Metadata title={"Ecommerce"}/>
      <div className="slide-container">
        <Slide>
          {iamges.map((iamges, index) => (
            <div key={index}>
              <div
                style={{ ...divStyle, backgroundImage: `url(${iamges.url})` }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>
     
      <div className="my-10 w-screen px-10 flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl font-bold">Latest</h1>
        <div className="py-5 flex flex-wrap gap-10 justify-center items-center">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <button className="bg-red-500 w-24 text-white text-xl px-3 py-1 rounded-md">More</button>
      </div>
      <div className="my-10 w-screen px-10 flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl font-bold">Top Discounts</h1>
        <div className="py-5 flex flex-wrap gap-10 justify-center items-center">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <button className="bg-red-500 w-24 text-white text-xl px-3 py-1 rounded-md">More</button>
      </div>
      <div className="my-10 w-screen px-10 flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl font-bold">Top Trending</h1>
        <div className="py-5 flex flex-wrap gap-10 justify-center items-center">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <button className="bg-red-500 w-24 text-white text-xl px-3 py-1 rounded-md">More</button>
      </div>
      
    </>
  );
}

export default Home;
