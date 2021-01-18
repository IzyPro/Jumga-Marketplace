import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AddtoCart from "../Global/AddToCart";
import { getShopCurrency } from "../UserResources/ShopCountry";
import AlertSuccess from "./AlertSuccess";

function ProductItem(props) {
  //RESULT MODAL
  const modalResult = <AlertSuccess />;
  const [showResult, setShowResult] = useState(false);
  const handleResultClose = () => {
    setShowResult(false);
    window.location.reload();
  };
  const handleResultShow = () => setShowResult(true);

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
      <button
        className="btn-lg btn-block pb-3 mt-1 shadow-lg"
        onClick={() => {
          AddtoCart(props.data);
          handleResultShow();
        }}
        id={props.data.id}
      >
        Add to cart
      </button>

      <Modal size="sm" centered show={showResult} onHide={handleResultClose}>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#4949e0",
          }}
        >
          {modalResult}
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default ProductItem;
