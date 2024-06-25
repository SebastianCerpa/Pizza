import React from "react";
import { PizzaContext } from "../contexto/PizzaContext";
import { useContext } from "react";
import { formatoNumero } from "../components/formatoNumero";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { pizzas, agregarCarrito } = useContext(PizzaContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="img-cont">
        <img className="banner" src="/src/assets/img/banner.jpg" alt="" />
        <div className="titulo">
          <h1>¡Pizzería Mamma mía!</h1>
          <h4>¡Tenemos las mejores pizzas que podrás encontrar!</h4>
        </div>
      </div>

      <div className="cards">
        {pizzas.map((e) => (
          <div className="card">
            <img className="imgPizza" src={e.img} alt="" />
            <h3> {e.name} </h3>
            <hr />
            <h4>Ingredientes!</h4>
            <ul>
              {e.ingredients.map((ingredient, i) => (
                <li key={i}>🍕 {ingredient}</li>
              ))}
            </ul>
            <hr />
            <p className="precioC">Precio: ${formatoNumero(e.price)} </p>
            <div className="botones">
              <button
                to={`Pizza/${e.id}`}
                className="boton1"
                onClick={() => navigate(`/pizza/${e.id}`)}
              >
                Ver más
                <img className="ojos" src="/src/assets/img/ojos.png" alt="" />
              </button>
              <button onClick={() => agregarCarrito(e)} className="boton2">
                Añadir
                <img
                  className="carritoB"
                  src="/src/assets/img/carrito.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="contF">
        <div className="footer">
          <p>© 2024 Pizzería Mamma Mia! Todos los derechos reservados.</p>
          <p>Desarrollado por Sebastián Cerpa</p>
        </div>
      </div>
    </>
  );
}
