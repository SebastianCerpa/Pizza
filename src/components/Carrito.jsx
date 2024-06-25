import React, { useContext } from "react";
import { PizzaContext } from "../contexto/PizzaContext";
import { formatoNumero } from "../components/formatoNumero";

export default function Carrito() {
  const { carrito, pizzas, setCarrito } = useContext(PizzaContext);

  // Función para calcular el total del carrito
  const calcularTotalCarrito = () => {
    let total = 0;
    carrito.forEach((item) => {
      const pizza = pizzas.find((p) => p.id === item.id);
      if (pizza) {
        total += pizza.price * item.count;
      }
    });
    return total;
  };

  // Función para incrementar la cantidad de un pedido
  const incrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setCarrito(nuevoCarrito);
  };

  // Función para decrementar la cantidad de un pedido
  const decrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id && item.count > 0
        ? { ...item, count: item.count - 1 }
        : item
    );
    setCarrito(nuevoCarrito);
  };

  const totalCarrito = calcularTotalCarrito();

  return (
    <div className="contC">
      <h2>Carrito de Compras</h2>
      <div className="carrito">
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            <ul className="contenidoL">
              {carrito.map((item) => (
                <li className="datos" key={item.id}>
                  <img className="imgC" src={item.img} alt="" />
                  <h3>{item.name}</h3>

                  <div className="botonesCarrito">
                    <p className="precioC">${formatoNumero(item.price)}</p>
                    <button
                      className="botonC1"
                      onClick={() => incrementarCantidad(item.id)}
                    >
                      +
                    </button>
                    <p>{item.count}</p>
                    <button
                      className="botonC2"
                      onClick={() => decrementarCantidad(item.id)}
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="total">Total: ${formatoNumero(totalCarrito)}</p>
            <button className="pagar">Ir a Pagar</button>
          </>
        )}
      </div>
    </div>
  );
}
