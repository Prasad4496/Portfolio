import React, { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Errorpage from "./components/Errorpage.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Navbar from "./components/Navbar.js";
import Signup from "./components/Signup.js";
import Logout from "./components/Logout";
import { initialState, reducer } from "./reducer/UseReducer";

// 1. contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      <Route path="/about" element={<About />} exact />

      <Route path="/contact" element={<Contact />} exact />

      <Route path="/login" element={<Login />} exact />

      <Route path="/signup" element={<Signup />} exact />

      <Route path="/logout" element={<Logout />} exact />

      <Route element={<Errorpage />} />
    </Routes>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
