import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PizzaContext } from "../contexto/PizzaContext";
import { formatoNumero } from "./formatoNumero";

export default function Navbar() {
  const { carrito, pizzas } = useContext(PizzaContext);
  const [totalCarrito, setTotalCarrito] = useState(0);

  // Calculamos el total del carrito cuando carrito o pizzas cambian
  useEffect(() => {
    calcularTotalCarrito();
  }, [carrito, pizzas]);

  // Función para calcular el total del carrito
  const calcularTotalCarrito = () => {
    let total = 0;
    carrito.forEach((item) => {
      const pizza = pizzas.find((p) => p.id === item.id);
      if (pizza) {
        total += pizza.price * item.count;
      }
    });
    setTotalCarrito(total);
  };

  return (
    <div className="navbar">
      <NavLink className="link1" to="/">
        <img className="pizzaI" src="/src/assets/img/pizza.png" alt="" />
        Pizzería Mamma Mía!
      </NavLink>
      <nav className="nab">
        <NavLink to="/carrito">
          <img className="pizzaI" src="/src/assets/img/carrito.png" alt="" />
        </NavLink>
        <p className="carritoM">{formatoNumero(totalCarrito)}</p>
      </nav>
    </div>
  );
}
