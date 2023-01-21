import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import backgroundVideo from "../assets/videos/background.mp4";
import axios from 'axios';

const Search = () => {
  const [params, setParams] = useState({
    location: "",
    keyword: ""
  })
  const search = () => {
    var config = {
      method: "get",
      credentials: "include",
      url: "http://api.positionstack.com/v1/forward?access_key=67a8b5378b838341e77acee4a9edf31f&query=1600 Pennsylvania Ave NW, Washington DC",
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    // var data = new FormData();
    // data.append("keywords", "restaurant");
    // data.append("latitude", "19.0760");
    // data.append("longitude", "72.8777");

    // var config = {
    //   method: "post",
    //   url: "http://vismayvora.pythonanywhere.com/tourist_app/nearbysearch",
    //   headers: {
    //     Authorization: "Token e9390b5dfd2db325de85df5bb75a6a45efd30386",
    //     Cookie:
    //       "csrftoken=oKGfFy4EQ3I7gMU8oKN92CyOwK3HflSN; sessionid=q11vtre1r0uz9e1ecamuo1m5p95jetyh",
    //     ...data.getHeaders(),
    //   },
    //   data: data,
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
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
                value={params.location}
                onChange={(e) => setParams({ ...params, location: e.target.value })}
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
                value={params.keyword}
                onChange={(e) => setParams({ ...params, keyword: e.target.value })}
              />
            </div>
            <button onClick={() => search()} className="absolute -bottom-5 left-[46%] text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
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