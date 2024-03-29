import React, { useContext, useRef, useState } from "react";
import { AlertContext } from "../../../context/AlertContext";
import { CartContext } from "../../../context/CartContext";
import classes from "./ProductItem.module.css";
import { ReactComponent as IconHeart } from "../../../../assets/heart.svg";
import { ReactComponent as IconFilled } from "../../../../assets/heartfilled.svg";
const ProdutoItem = ({ isRent, name, img, price, description }) => {
  const [amount] = useState(1);
  const animaTimeout = useRef();

  const { addItem } = useContext(CartContext);
  const { showAlert } = useContext(AlertContext);

  const addItemToCartHandler = (e) => {
    e.preventDefault();

    clearTimeout(animaTimeout.current);

    addItem({
      name: name,
      price: price,
      amount: +amount,
      img: img,
    });

    showAlert(`"${name}" adicionado(s) ao carrinho`);
  };

  const [isFav, setIsFav] = useState(false);
  const favAdd = (e) => {
    setIsFav(!isFav);
    e.preventDefault();
    clearTimeout(animaTimeout.current);
    if(isFav){
      setIsFav(false);
      showAlert(`"${name}" foi removido dos favoritos`);
    }else{
      setIsFav(true);
      showAlert(`"${name}" adicionado aos favoritos`);
    }
  };

  return (
    <li className={classes.card}>
      <div className={classes.imgContainer}>
        <img src={require(`../../../../assets/imgs-produtos/${img}`)} alt={name} />
      </div>
      <div className={classes.infos}>
        <div>
          <p className={classes.name}>{isRent}</p>
          <p className={classes.name}>{name}</p>
          <p className={classes.description} title={description}>
            {description}
          </p>
        </div>

        <div className={classes.flex}>
          <p className={classes.price}>€ {price}</p>
          <form className={classes.addForm}>
            <button
              className={classes.favAdd}
              onClick={favAdd}
              title="adicionar aos favoritos"
            >
              {isFav ? <IconFilled/> : <IconHeart />}
            </button>
            <button
              className={classes.btnAdd}
              onClick={addItemToCartHandler}
              title="adicionar ao carrinho"
            >
              +
            </button>
          </form>
        </div>
      </div>
    </li>
  );
};

export default ProdutoItem;
