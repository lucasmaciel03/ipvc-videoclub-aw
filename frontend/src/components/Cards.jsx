import React from "react";
import "../styles/card.css";

const Cards = () => {
  return (
    <div className="card-container">
      <div className="cardImage">
        <img src="https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
      </div>

      <div className="card-content">
        <div className="cardTitle">
          <h3>Title</h3>
        </div>
        <div className="cardDescription">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur, quia earum?quia earum?quia earum?quia earum?
          </p>
        </div>
      </div>

      <div className="btn">
        <button>
          <a>Alugar</a>
        </button>
      </div>
    </div>
  );
};

export default Cards;
