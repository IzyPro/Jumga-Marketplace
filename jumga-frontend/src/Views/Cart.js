import React, { useState } from "react";
import CartItem from "./CartItem";
import clear from "../Icons/clear.svg";
import "./Cart.css";
import { Modal } from "react-bootstrap";
import AlertFailure from "../Components/AlertFailure";
import CustomLoader from "../Components/CustomLoader";
import axiosInstance from "../UserResources/httpclient";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import AlertSuccess from "../Components/AlertSuccess";
import {
  getShopCountry,
  getShopCurrency,
  getShopDetails,
} from "../UserResources/ShopCountry";

const flutterwavePK = process.env.REACT_APP_PUBLIC;

export default function Cart() {
  var cartItems = JSON.parse(localStorage.getItem("Cart"));
  const clearCart = () => {
    localStorage.clear();
    window.location.reload();
  };
  const orderPlaced = () => {
    setTimeout(function () {
      clearCart();
    }, 5000);
  };
  let orderItems = [];
  let totalItemsAmount = 0;
  let totalDeliveryFee = 0;
  if (cartItems !== null) {
    totalItemsAmount =
      cartItems.length > 0
        ? cartItems
            .map((datum) => datum.productPrice * datum.orderUnit)
            .reduce((a, b) => a + b)
        : 0;
    totalDeliveryFee =
      cartItems.length > 0
        ? cartItems.map((datum) => datum.deliveryFee).reduce((a, b) => a + b)
        : 0;
  }
  if (cartItems !== null) {
    cartItems.map((datum) => {
      let orders = {
        productId: datum.id,
        productUnit: 1,
      };
      orderItems.push(orders);
    });
  }

  //console.log(cartItems);

  let Content = null;
  var currency = getShopCurrency();
  var country = getShopCountry();
  var shopDetails = getShopDetails();
  const percentage = (num, per) => {
    return (num / 100) * per;
  };
  var merchShare = percentage(totalItemsAmount, 97.5);
  var riderShare = percentage(totalDeliveryFee, 80);
  let totalAmount = totalItemsAmount + totalDeliveryFee;
  const [user, setUser] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const config = {
    public_key: `${flutterwavePK}`,
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: `${currency}`,
    country: `${country}`,
    payment_options: "card,mobilemoneyghana,mpesa,ussd,qr,barter",
    customer: {
      email: `${user.email}`,
      phonenumber: `${user.phoneNumber}`,
      name: `${user.fullname}`,
    },
    subaccounts: [
      {
        id: `${shopDetails.subAccountId}`,
        transaction_charge_type: "flat_subaccount",
        transaction_charge: `${merchShare}`,
      },
      {
        id: `${shopDetails.dispatchRider.subAccountId}`,
        transaction_charge_type: "flat_subaccount",
        transaction_charge: `${riderShare}`,
      },
    ],
    customizations: {
      title: "Jumga - Product Sale",
      description: "Payment for product sold",
      logo: "https://i.ibb.co/0KJC1tb/logo512.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  //RESULT MODAL
  const [modalResult, setModalResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const handleResultClose = () => {
    setShowResult(false);
    clearCart();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);
  let modalloader = null;
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  if (loading === true) {
    modalloader = <CustomLoader></CustomLoader>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    setLoading(true);

    handleFlutterPayment({
      callback: (response) => {
        setLoading(false);
        if (response.status === "successful") {
          let feedback = {
            transactionId: response.transaction_id.toString(),
            currency: `${currency}`,
            amount: response.amount,
            shopId: parseInt(shopDetails.id),
            customerName: user.fullname,
            customerEmailAddress: user.email,
            customerPhoneNumber: user.phoneNumber,
            customerDeliveryAddress: user.address,
            orderItems: orderItems,
            subTotalItemCost: totalItemsAmount,
            subTotalDeliveryCost: totalDeliveryFee,
            total: totalItemsAmount + totalDeliveryFee,
          };
          axiosInstance
            .post(`/api/shops/make-order`, feedback)
            .then((response) => {
              setLoading(false);
              setModalResult(
                <div>
                  <AlertSuccess />
                  <p className="text-center">
                    Your order has been logged and will be delivered to your
                    specified address.
                  </p>
                  <p className="text-center">
                    Orders generally takes 3-5 working days depending on your
                    location. Please contact us if any further delay occurs.
                  </p>
                </div>
              );
              setShowResult(true);
              orderPlaced();
            })
            .catch((error) => {
              setLoading(false);
              if (error.status === 401) {
                setModalResult(<AlertFailure error={error.message} />);
                setShowResult(true);
              } else if (error.response != null) {
                setModalResult(<AlertFailure error={error.response.data} />);
                setShowResult(true);
              } else {
                setModalResult(<AlertFailure error={error.message} />);
                setShowResult(true);
              }
            });
        } else {
          setModalResult(<AlertFailure error="Transaction Failed" />);
        }
        closePaymentModal();
      },
      onClose: () => {},
    });
  };

  if (cartItems === null || cartItems.length < 1) {
    Content = <p className="text-center mt-5 home">Your Cart is empty</p>;
  } else {
    let products = cartItems.map((data, key) => (
      <CartItem key={data.id} data={data} />
    ));
    Content = (
      <div className="">
        <div className="row m-3">{products}</div>
        <div className="text-center">
          <span onClick={clearCart} className="center shopName">
            <img
              src={clear}
              alt="clear icon"
              width="10"
              className="m-0 mb-1 mr-1 p-0"
            />
            Clear Cart
          </span>
        </div>
        <div className="text-right p-3 mt-5">
          <h4>Total Item Cost : {totalItemsAmount}</h4>
          <h5>Total Delivery Fee : {totalDeliveryFee}</h5>
          <hr />
          <h2>Total : {totalItemsAmount + totalDeliveryFee}</h2>
          <button
            className="btn-lg btn-block pb-3 mt-5 shadow-lg"
            onClick={handleShow}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="home">
      <h3 className="shopName text-center m-3">Cart</h3>
      {Content}

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form className="" onSubmit={handleSubmit}>
            <h1 className="h3 mb-4 text-center font-weight-normal">
              Enter your Details
            </h1>
            <div className="form-label-group">
              <input
                type="text"
                name="fullname"
                value={user.fullname}
                onChange={handleChange}
                className="form-control mt-3"
                placeholder="Full Name"
                required
              ></input>
              <input
                type="number"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                className="form-control mt-3"
                placeholder="Phone Number (e.g +2347038326532)"
                required
              ></input>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control mt-3"
                placeholder="Email"
                required
              ></input>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="form-control mt-3"
                placeholder="Delivery Address"
                required
              ></input>
            </div>
            {modalloader}
            <button
              className="btn-lg btn-block pb-3 mt-5 shadow-lg"
              type="submit"
            >
              Pay Now
            </button>
          </form>
        </Modal.Body>
      </Modal>

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
