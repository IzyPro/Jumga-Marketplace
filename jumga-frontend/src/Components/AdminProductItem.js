import React from "react";
import { getShopCurrency } from "../UserResources/ShopCountry";

function AdminProductItem(props) {

  let currency = getShopCurrency();
  return (
    <div key={props.data.id} className="three p-3 m-2 align-center card m-0">
      <img
        src={props.data.productImage}
        width="100%"
        alt="product"
        className="pt-3"
      />
      <div className="row m-0 mt-3">
        <h5 className="m-0 short">{props.data.productName}</h5>
        <p className="col m-0 mr-0 pr-0 text-right">
          QTY : {props.data.productUnit}
        </p>
      </div>
      <h2 className="mb-4">
        {currency} {props.data.productPrice}
      </h2>
    </div>
  );
}
export default AdminProductItem;
