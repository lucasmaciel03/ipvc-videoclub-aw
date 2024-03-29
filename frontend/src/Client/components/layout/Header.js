import React, { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
import { ReactComponent as IconCart } from "../../../assets/cart.svg";
import { ReactComponent as IconSun } from "../../../assets/sun.svg";
import { ReactComponent as IconMoon } from "../../../assets/moon.svg";
import { ReactComponent as IconUser } from "../../../assets/user.svg";
import { ReactComponent as IconExit } from "../../../assets/exit.svg";
import { CartContext } from "../../context/CartContext";
import { ColorModeContext } from "../../context/ColorModeContext";
import SearchField from "./SearchField";
import Modal from "../user/UserModal";

const Header = ({ onShow }) => {
  const { itemsCart } = useContext(CartContext);
  const { changeMode, isDarkMode } = useContext(ColorModeContext);
  const [pageScrolled, setPageScrolled] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setOpenModal(false);
    }
  };

  const totalItemsInTheCart = itemsCart.items.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  useEffect(() => {
    const scrollPage = () => {
      if (window.scrollY > 16) {
        setPageScrolled(true);
      } else {
        setPageScrolled(false);
      }
    };

    window.addEventListener("scroll", scrollPage);

    return () => {
      window.removeEventListener("scroll", scrollPage);
    };
  }, []);

  return (
    <header
      className={`${classes.header} ${pageScrolled ? classes.scroll : ""}`}
    >
      <div className={`container ${classes.container}`}>
        <span className={classes.logo}>MovieAL</span>

        <SearchField />
        <button className={classes.cart} onClick={onShow}>
          <span className={classes.amount}>
            <IconCart />
            <span className={classes.value}>{totalItemsInTheCart}</span>
          </span>
        </button>
        <button
          className={classes.user}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <IconUser />
        </button>
        {openModal && (
          <div onClick={handleOutsideClick}>
            <button onClick={() => setOpenModal(false)}>Close Modal</button>
            <Modal />
          </div>
        )}
        
        <button
        className={classes.exit}
        title="Sair">
          <IconExit/>
        </button>
        <button
          className={classes.btnColorMode}
          onClick={changeMode}
          title={isDarkMode ? "Ativar White Mode" : "Ativar Dark Mode"}
        >
          {isDarkMode ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
