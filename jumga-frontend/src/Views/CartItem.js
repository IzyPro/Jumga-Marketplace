import React, { useState } from "react";
import plus from "../Icons/plus.svg";
import minus from "../Icons/minus.svg";
import Delete from "../Icons/deleteIcon.svg";
import { getShopCurrency } from "../UserResources/ShopCountry";

function CartItem(props) {
  const DeleteItem = () => {
    var cartItems = JSON.parse(localStorage.getItem("Cart"));
    console.log(cartItems[1]);
    cartItems.forEach((item, i) => {
      if (item.id === props.data.id) {
        console.log(i);
        cartItems.splice(i, 1);
        console.log(`the  value ${cartItems.length}`);
        window.location.reload();
      }
    });
    //console.log(cartItems);
    localStorage.setItem("Cart", JSON.stringify(cartItems));
    //window.location.reload();
  };
  const IncreaseOrder = () => {
    var cartItems = JSON.parse(localStorage.getItem("Cart"));
    console.log(cartItems);
    cartItems.forEach((item) => {
      if (item.id === props.data.id) {
        if (item.productUnit === item.orderUnit) {
        } else {
          item.orderUnit += 1;
        }
      }
    });
    console.log(cartItems);
    localStorage.setItem("Cart", JSON.stringify(cartItems));
    window.location.reload();
  };
  const DecreaseOrder = () => {
    var cartItems = JSON.parse(localStorage.getItem("Cart"));
    console.log(cartItems);
    cartItems.forEach((item) => {
      if (item.id === props.data.id) {
        if (item.orderUnit === 1) {
        } else {
          item.orderUnit -= 1;
        }
      }
    });
    console.log(cartItems);
    localStorage.setItem("Cart", JSON.stringify(cartItems));
    window.location.reload();
  };
  let currency = getShopCurrency();
  if (!props.data) {
    return null;
  } else {
    return (
      <div key={props.data.id} className="p-3 m-2 card three home">
        <img
          src={props.data.productImage}
          width="100%"
          alt="product"
          className="pt-3"
        />
        <div className="row m-0 mt-3">
          <h5 className="m-0 short">{props.data.productName}</h5>
          <p className="col m-0 mr-0 pr-0 text-right">
            QTY : {props.data.orderUnit}
          </p>
        </div>
        <div className="row m-0">
          <h2 className="mb-4">
            {currency} {props.data.productPrice}
          </h2>
          <p className="col pr-0 text-right mt-3 align-baseline">
            Delivery Fee: {props.data.deliveryFee}
          </p>
        </div>
        <hr className="m-0"/>
        <span className="row mt-1 align-baseline">
            <img
              src={Delete}
              alt="cart icon"
              width="20"
              onClick={DeleteItem}
              className="m-2 ml-3 p-0"
            />
            <div className="text-right col">
            <img
              src={minus}
              alt="cart icon"
              width="20"
              onClick={DecreaseOrder}
              className="m-2 p-0"
            />
            <img
              src={plus}
              alt="cart icon"
              width="20"
              onClick={IncreaseOrder}
              className="m-2  p-0"
            />
            </div>
          </span>
      </div>
    );
  }
}
export default CartItem;
