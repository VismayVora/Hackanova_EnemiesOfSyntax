import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundVideo from "../assets/videos/background.mp4";
import landscape from "../assets/images/landscape.jpg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbClipboardList } from "react-icons/tb";
import { Navbar } from "../components/Navbar";



const Card = () => {
  return (
    <div className="w-full rounded-xl shadow-lg border">
      <img className="rounded-t-xl" src={landscape} alt="" />
      <div className="px-4 py-6">
        <h1 className="text-gray-600 text-xl font-bold mb-2">Bora Bora</h1>
        <h1 className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <HiOutlineLocationMarker className="text-lg" /> New Zealand
        </h1>
        <div className="border-t border-b p-3 flex justify-between items-center">
          <h1 className="text-gray-400">Price:</h1>
          <h1 className="text-gray-600 text-2xl font-bold">$5000</h1>
        </div>
        <h1 className="text-sm text-gray-600 py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui
          adipisci, optio enim natus ab officia eius! Ex, omnis atque in alias
          iusto dignissimos, repudiandae, corrupti ipsam illo illum dolorum.
        </h1>
        <button className="flex items-center gap-2 text-white font-semibold uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
          Details <TbClipboardList />
        </button>
      </div>
    </div>
  );
}

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="w-full h-full relative">
      <video autoPlay loop muted className="absolute -z-10 w-full h-auto">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Navbar />
      <div className="h-[90vh]">
        <div className="w-full h-full px-36 py-48 bg-gray-900/50">
          <h1 className="text-white uppercase mb-2">our packages</h1>
          <h1 className="text-white text-4xl font-bold mb-12">
            Search your{" "}
            <span className="underline decoration-cyan-500 underline-offset-4">
              Holiday
            </span>
          </h1>
          <div className="relative grid grid-cols-3 bg-white w-full rounded-xl p-8 gap-8">
            <div className="">
              <h1 className="text-gray-400 font-semibold mb-3">
                Search you destination:
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
              />
            </div>
            <div className="">
              <h1 className="text-gray-400 font-semibold mb-3">
                Search you date:
              </h1>
              <DatePicker
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="">
              <div className="flex justify-between text-gray-400 font-semibold mb-3">
                <h1>Max prize:</h1>
                <h1 className="text-xl text-gray-500">$5000</h1>
              </div>
              <div className="flex items-center px-4 py-3 bg-gray-100 rounded-full">
                <input
                  type="range"
                  min={2000}
                  max={100000}
                  className="w-full focus:outline-none accent-gray-500"
                />
              </div>
            </div>
            <button className="absolute -bottom-5 left-[45%] text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
              More filters
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full px-36 py-24 bg-gray-50">
        <h1 className="text-gray-600 text-2xl font-bold mb-12">
          Most visited{" "}
          <span className="underline decoration-cyan-500">destinations</span>
        </h1>
        <div className="grid grid-cols-3 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Home;
