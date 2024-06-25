import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Carrito from "./components/Carrito";
import { Pizza } from "./components/Pizza";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pizza/:id" element={<Pizza />} />
      </Routes>
    </>
  );
}

export default App;
