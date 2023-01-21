import React from 'react'
import { Navbar } from '../components/Navbar'
import backgroundVideo from "../assets/videos/background.mp4";

const Search = () => {
  return (
    <div className="w-full h-full relative">
      <Navbar />
      <video autoPlay loop muted className="absolute -z-10 w-full h-auto">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="h-[90vh]">
        <div className="w-full h-full px-36 py-48 bg-gray-900/50">
          <h1 className="text-white uppercase mb-2">our packages</h1>
          <h1 className="text-white text-4xl font-bold mb-12">
            Search your{" "}
            <span className="underline decoration-cyan-500 underline-offset-4">
              Destination
            </span>
          </h1>
          <div className="relative grid grid-cols-2 bg-white w-full rounded-xl p-8 gap-8">
            <div className="">
              <h1 className="text-gray-400 font-semibold mb-3">
                Enter your destination:
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
                placeholder="Mumbai"
              />
            </div>
            <div className="">
              <h1 className="text-gray-400 font-semibold mb-3">
                Enter what you want to find:
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
                placeholder="Beach"
              />
            </div>
            <button className="absolute -bottom-5 left-[46%] text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
              Search
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
        </div>
      </div>
    </div>
  );
}

export default Search