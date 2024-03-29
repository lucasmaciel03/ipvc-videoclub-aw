import React, { useState } from "react";
import classes from "./CartItem.module.css";

const CarItem = ({ name, price, img, amount, updateAmount, removeItem }) => {
  const [newAmount, setNewAmount] = useState(amount);

  const updateAmountHandler = (e) => {
    const value = +e.target.value;
    setNewAmount(value);
    updateAmount(name, value);
  };

  const removeItemFromCart = () => {
    removeItem(name);
  };

  return (
    <li className={classes.item}>
      <div className={classes.imgDiv}>
        <img src={require(`../../../assets/imgs-produtos/${img}`)} alt={name} />
      </div>
      <div className={classes.infos}>
        <p>{name}</p>
        <p className={classes.price}>€ {Number(price * amount).toFixed(2)}</p>
        <button className={classes.btn} onClick={removeItemFromCart}>
          Excluir item
        </button>
      </div>
    </li>
  );
};

export default CarItem;
