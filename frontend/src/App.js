import Header from "./Client/components/layout/Header";
import Products from "./Client/components/layout/products/Products";
import Cart from "./Client/components/cart/Cart";
import React, { useContext, useState, useEffect } from "react";
import PurchaseSuccess from "./Client/components/cart/finishedPurchase/PurchaseSuccess";
import { ColorModeContext } from "./Client/context/ColorModeContext";
import "./App.css";
import Alert from "./Client/components/alert/Alert";
import { AlertContext } from "./Client/context/AlertContext";
import Login from "./Client/components/login/Login";
import Register from "./Client/components/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ErrorPage from "./Error/Error404";
import UserPage from "./Client/Pages/User/UserPage";
// Admin Imports
import Dashboard from "./Admin/Dashboard/Dashboard";
import CreateUser from "./Admin/Dashboard/User/CreateUser";
import CreateCategory from "./Admin/Dashboard/Category/CreateCaterogy";


function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [purchaseFinishedModal, setPurchaseFinishedModal] = useState(false);
  const { isDarkMode } = useContext(ColorModeContext);
  const { alertIsShown, alertContent } = useContext(AlertContext);

  const closeCartHandler = () => {
    setIsCartVisible(false);
  };
  const showCartHandler = () => {
    setIsCartVisible(true);
  };
  const closeFinalModalHandler = () => {
    setPurchaseFinishedModal(false);
  };
  const showFinalModalHandler = () => {
    setPurchaseFinishedModal(true);
  };

  const [userType, setUserType] = useState();

  useEffect(() => {
    const hasToken = localStorage.getItem("token");

    if (hasToken) {
      const info = jwtDecode(hasToken);

      setUserType(info.userType);
      console.log("---------------------" + info.isAdmin);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <div className={`app ${isDarkMode ? "darkMode" : ""}`}>
              <Alert alertIsShown={alertIsShown} content={alertContent} />
              {isCartVisible && (
                <Cart
                  onClose={closeCartHandler}
                  onShowFinal={showFinalModalHandler}
                />
              )}
              {purchaseFinishedModal && (
                <PurchaseSuccess onClose={closeFinalModalHandler} />
              )}
              <Header onShow={showCartHandler} />
              <Products />
            </div>
          }
        ></Route>
        {/* About User */}
        {/* <Route path="admin/userpage" element={<UserPage />} /> */}
        <Route path="admin/createuser" element={<CreateUser />} />
        <Route path="admin/updateuser" element={<CreateCategory />} />
        <Route path="admin/deleteuser" element={<CreateCategory />} />

        {/* About fILMES */}
        <Route path="admin/updatefilmes" element={<CreateCategory />} />
        <Route path="admin/eliminarfilmes" element={<CreateCategory />} />

        {/* About Categorias */}
        <Route path="admin/createcategory" element={<CreateCategory />} />
        <Route path="admin/updatecategory" element={<CreateCategory />} />
        <Route path="admin/deletecategory" element={<CreateCategory />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
