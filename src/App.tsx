import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import Login from "./pages/login";
import Register from "./pages/register";
import Store from "./pages/store";
function App() {
  return (
    <section className="MainBody">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Store" element={<Store />} />
      </Routes>
    </section>
  );
}

export default App;
