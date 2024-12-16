import React from "react";
import "./App.css";
import "./Global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Navbar from './Components/Navbar/Navbar'
import Footer from "./Components/Footer/Footer";
//import Maintenance from "./Pages/maintenance";
import FullCard from "./Pages/FullCard";
import Basket from "./Pages/Basket";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-global">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />        
            <Route path="/menu" element={<FullCard />} />        
            <Route path="/panier" element={<Basket />} />        
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
