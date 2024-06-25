import { createContext, useState, useEffect } from "react";

export const PizzaContext = createContext(); //Exportamos para usar dentro del useContext en otros archivos.

export default function PizzaProvider({ children }) {
  //Exportamos para envolver a la App en el main.jsx
  const [pizzas, setPizzas] = useState([]);
  const [carrito, setCarrito] = useState([]);

  async function getPizzas() {
    const response = await fetch("/pizzas.json");
    const data = await response.json();
    setPizzas(data);
  }
  useEffect(() => {
    getPizzas();
  }, []);
  function agregarCarrito({ id, name, price, img }) {
    //Recuperamos las props de la pizza a la que hicimos click.
    const producto = { id, name, price, img, count: 1 }; //A la nueva pizza le agregamos la cantidad en 1
    const indicePizzas = carrito.findIndex((pedido) => pedido.id === id); //Si la pizza ya existía en el carrito devolvemos su posición, o sino devolvemos -1.
    if (indicePizzas >= 0) {
      //Si encontramos la pizza
      carrito[indicePizzas].count++; // vamos a suposición y le sumamos 1
      setCarrito([...carrito]); //Actualizamos el carrito.
    } else {
      setCarrito([...carrito, producto]); //Si la pizza no estaba en el carrito, le agregamos y actualizamos.
    }
  }
  console.log(carrito);
  return (
    <>
      <PizzaContext.Provider
        value={{ pizzas, setPizzas, carrito, setCarrito, agregarCarrito }} //Compartimos estos estados a toda la aplicación.
      >
        {children}
      </PizzaContext.Provider>
    </>
  );
}
