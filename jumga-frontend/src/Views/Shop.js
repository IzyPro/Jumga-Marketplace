import React from "react";
import "./Shop.css";
import { Link, useParams } from "react-router-dom";
import { useAxiosGet } from "../Hooks/HttpRequests";
import CustomLoader from "../Components/CustomLoader";
import Error404 from "../Components/Error404";
import AlertFailure from "../Components/AlertFailure";
import ProductItem from "../Components/ProductItem";
import ShopHeader from "../Components/ShopHeader";
import Cart from "../Icons/cartIcon.svg";
import { setShopCountry, setShopDetails } from "../UserResources/ShopCountry";
import ShopFooter from "../Components/ShopFooter";

function Shop() {
  var cartItems = JSON.parse(localStorage.getItem("Cart"));
  let id = null;
  id = useParams();

  let loader = null;
  let userData = useAxiosGet(`/api/shops/name/${id.username}`);

  
  if(id === null){
    loader = <Error404/>;
  }
  else{
    loader = null;
  }

  // if(useParams()){
  //   loader = <Error404/>
  // }
  // else{
  //   loader = null;
  // }
  
  if (userData.isError) {
    if (id.username === null) {
      loader = <Error404 />;
    }
    if (userData.errorCode === 404) {
      loader = <Error404 />;
    } 
    else {
      loader = <AlertFailure error={userData.error} />;
    }
    if(userData.errorCode === 400){
      loader = <Error404/>;
    }
  }
  // else {
  //   loader = null;
  // }

  if (userData.loading) {
    loader = <CustomLoader />;
  }
  // else {
  //   loader = null;
  // }

  if (userData.data) {
    setShopCountry(userData.data.country);
    setShopDetails(JSON.stringify(userData.data));

    if (userData.data.isApproved) {
      let products = null;
      let content = null;

      if (userData.data.products.length < 1) {
        content = <p className="text-center m-5">Your shop is empty</p>;
      } else {
        products = userData.data.products.map((data, key) => (
          <ProductItem key={data.id} data={data} />
        ));
        content = <div className="row p-3">{products}</div>;
      }

      loader = (
        <div className="home p-3">
          <div className="row text-right mb-3">
            <Link className="col text-right cart m-0 p-0" to="../Cart">
              <span className="col text-right align-baseline">
                <img
                  src={Cart}
                  alt="cart icon"
                  width="10"
                  className="m-0 mb-1 mr-1 p-0"
                />
                Cart({cartItems === null ? 0 : cartItems.length})
              </span>
            </Link>
          </div>
          <ShopHeader userData={userData} />
          {content}
          <ShopFooter shopName={userData.data.shopName} />
        </div>
      );
    } else {
      loader = <Error404/>;
    }
  }
  return <div className="home">{loader}</div>;
}
export default Shop;
