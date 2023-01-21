import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";
import Package from "./pages/Package";

function App() {
  useEffect(() => {
    alanBtn({
      key: "86e893def59fa09ea3ab18c2643b5c9e2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/package/:id" element={<Package />} />
      </Routes>
    </>
  );
}

export default App;
