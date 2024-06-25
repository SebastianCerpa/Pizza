import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PizzaContext } from "../contexto/PizzaContext";
import { formatoNumero } from "../components/formatoNumero"; // Asegúrate de importar formatoNumero

export const Pizza = () => {
  const [detalle, setDetalle] = useState(null);
  const { pizzas, agregarCarrito } = useContext(PizzaContext);
  const { id } = useParams();

  const getData = () => {
    const dataPizza = pizzas.find((pizza) => pizza.id === id);
    setDetalle(dataPizza || {});
  };

  useEffect(() => {
    getData();
  }, [pizzas]);

  if (!detalle) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="containerP">
      <div className="cont2">
        <div className="contP2">
          <img src={detalle.img} className="imagenP" alt={detalle.name} />
        </div>
        <div className="">
          <div className="descripcion">
            <h5>{detalle.name}</h5>
            <p>{detalle.desc}</p>
            <h4>Ingredientes:</h4>
            <ul>
              {detalle.ingredients?.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
            <div className="botonPrecio">
              <h4>
                Precio: ${detalle.price ? formatoNumero(detalle.price) : "N/A"}
              </h4>
              <button
                className="boton2"
                onClick={() => agregarCarrito(detalle)}
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
